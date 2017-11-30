/**
 * Created by evgen on 27.11.17.
 */
window.addEventListener('load', function () {
    var DATAjson;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "data.json", true);
    xhr.addEventListener('load', function () {
        if (xhr.status < 400) {
            var dataJSON = JSON.parse(xhr.responseText);
            console.log("dara ", dataJSON);
            DATAjson = dataJSON["data"];
            // MORZA = alphabetJSON["morza"];
        }
    });
    xhr.send(null);


    // forms elements
    var formButton = document.querySelector('.create-form__button');
    var formOptions = document.querySelectorAll('.select__options');
    console.log(formOptions);


    formButton.addEventListener('click', function (e) {


        // select ---> options
        for ( var i = 0; i < formOptions.length; i++){
            var option = formOptions[i];

            console.log("option: ", formOptions[i]);

            if ( option.selected){
                var getDataAttr = option.getAttribute('data-city-name');
                console.log(getDataAttr);
                break;
            }
        }

                for ( i in DATAjson){
                    if(i === getDataAttr){
                        var key = DATAjson[i];

                        var timeZone = key["data-timeZone"],
                            gmtName = key["data-timeZoneName"],
                            className = key["data-class-name"],
                            backgroundImg = key["background"];
                    }
                }


        console.log("re ",DATAjson);


        var searchtext = "select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where text='" + getDataAttr + "') and u='c'";
        var src = "https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json";

        getYahooAjax(src, function (data) {
            console.log('DATA', data);
            var jahoo = data.query.results.channel;
            console.log("jahoo",jahoo);

            var weather = jahoo.item.condition;
            console.log("weather", weather);

            var temperature = weather.temp,
                text = weather.text;
            var wind = jahoo.wind.speed;
            var sunrise = jahoo.astronomy.sunrise,
                sunset = jahoo.astronomy.sunset;

            $("."+ className +" .weather__temp").text(temperature);
            $("."+ className +" .weather__wind").text(wind);
            $("."+ className +" .sunrise__div").text(sunrise);
            $("."+ className +" .sunset__div").text(sunset);
        });




        // создание екземпляра
        var createClock = new CreateClock( className, timeZone, gmtName);
        createClock.createDom();
        $("."+ className +" .clock__header").text('Current time in '+ getDataAttr  );
        //
        $("."+className). css("background", backgroundImg );
        $("."+className). css("background-size", "cover" );
        // $(".sun_up").text(weatherYahoo().sunrise);




        // '"' + backgroundImg + '"'


        setInterval(function () {
            var dateInWorld = createClock.getTimeWithZone();

            $("."+ className +" .clock__time").text(dateInWorld.time);

            $("."+ className +" .time__seconds").text(dateInWorld.seconds);
        }, 1000);
        e.preventDefault();
    });
});



function getYahooAjax(url, callback) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                var data = JSON.parse(xhr.responseText);
            } catch(err) {
                console.log(err.message + " in " + xhr.responseText);
                return;
            }
            callback(data);
        }
    };
    xhr.open("GET", url, true);
    xhr.send(null);
}




