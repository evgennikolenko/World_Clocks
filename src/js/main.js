/**
 * Created by evgennikolenko on 27.11.17.
 * Update 02.12.17. Add LocalStorage and remove items
 */

window.addEventListener('load', function () {

    // upload json file from server
        var DATAjson;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "data.json", false);
        xhr.send();

            if (xhr.status < 400) {
                var dataJSON = JSON.parse(xhr.responseText);
                DATAjson = dataJSON["data"];
            }

    // forms elements
    var formButton = document.querySelector('.create-form__button');
    var formOptions = document.querySelectorAll('.select__options');

    // upload from localStorage
   var localStorageData = window.localStorage;

    console.log("localStorageData: ", localStorageData);
    for( var i in localStorageData){
        var storageObj = localStorageData[i] ;
         var storageItem = JSON.parse(storageObj);
         console.log('storageItem: ', storageItem);

         for( var key in storageItem) {
             var cityNameFromStorage = storageItem[key];
             // sync request on jahoo
             var searchtext = "select%20*%20from%20weather.forecast%20where%20woeid%20in%20" +
                 "(select%20woeid%20from%20geo.places(1)%20where text='" + cityNameFromStorage + "') and u='c'";
             var src = "https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json";

             var xhr2 = new XMLHttpRequest();
             xhr2.open("GET", src, false);
             xhr2.send();

             if (xhr2.readyState === 4 && xhr2.status === 200) {
                 var yahooJSON = JSON.parse(xhr2.responseText);

                 var yahoo = yahooJSON.query.results.channel;

                 var weather = yahoo.item.condition,
                     temperature = weather.temp,
                     text = weather.text,
                     wind = yahoo.wind.speed,
                     sunrise = yahoo.astronomy.sunrise,
                     sunset = yahoo.astronomy.sunset;

                 var date = yahoo.lastBuildDate;
                 date = date.split(" ").slice(1, 4).join(" ");

                 for (var i in DATAjson) {
                     if (i === cityNameFromStorage) {
                         var key = DATAjson[i];

                         var timeZone = key["data-timeZone"],
                             gmtName = key["data-timeZoneName"],
                             className = key["data-class-name"],
                             backgroundImg = key["background"];
                     }
                 }

                 var createClock = new CreateClock(className, timeZone, gmtName, date);
                 createClock.createDom();

                 $("." + className + " .clock__header").text('Current time in ' + cityNameFromStorage);

                 $("." + className + " .weather__temp").text(temperature + ' °C');
                 $("." + className + " .wind-speed__val").text(wind);
                 $("." + className + " .sunrise__div").text(sunrise);
                 $("." + className + " .sunset__div").text(sunset);
                 //
                 $("." + className).css("background", backgroundImg);
                 $("." + className).css("background-size", "cover");

                 setInterval(function () {
                     var dateInWorld = createClock.getTimeWithZone();
                     $("." + className + " .clock__time").text(dateInWorld.time);
                     $("." + className + " .time__seconds").text(dateInWorld.seconds);
                 }, 1000);
             }
         }
    }

/*
 * Click on the form button (Create)
 */
    formButton.addEventListener('click', function (e) {

        // select ---> options
        for ( var i = 0; i < formOptions.length; i++){
            var option = formOptions[i];
            if ( option.selected){
                var getDataAttr = option.getAttribute('data-city-name');
                break;
            }
        }

        var searchtext = "select%20*%20from%20weather.forecast%20where%20woeid%20in%20" +
            "(select%20woeid%20from%20geo.places(1)%20where text='" + getDataAttr + "') and u='c'";
        var src = "https://query.yahooapis.com/v1/public/yql?q=" + searchtext + "&format=json";

        getYahooAjax(src, function (data) {
            for ( var i in DATAjson){
                if(i === getDataAttr){
                    var key = DATAjson[i];

                    var timeZone = key["data-timeZone"],
                        gmtName = key["data-timeZoneName"],
                        className = key["data-class-name"],
                        backgroundImg = key["background"];
                }
            }

            var yahoo = data.query.results.channel;
            console.log("jahoo",yahoo);

            var weather = yahoo.item.condition;

            var temperature = weather.temp,
                text = weather.text;
            var wind = yahoo.wind.speed;
            var sunrise = yahoo.astronomy.sunrise,
                sunset = yahoo.astronomy.sunset;

            var date = yahoo.lastBuildDate;
            date = date.split(" ").slice(1,4).join(" ");

            // создание екземпляра
            var createClock = new CreateClock( className, timeZone, gmtName, date);
            createClock.createDom();

            //take array with closeButton
            var closeButton = document.querySelectorAll(".clock__close");
            removeClock(closeButton);

            // save in LocalStorage
            var saveData = {
                className : getDataAttr
            };
            var saveLocalStorage = JSON.stringify(saveData);
            localStorage.setItem('clock-'+ className , saveLocalStorage);
            console.log(saveLocalStorage);

            $("."+ className +" .clock__header").text('Current time in '+ getDataAttr  );

            $("."+ className +" .weather__temp").text(temperature + ' °C');
            $("."+ className +" .wind-speed__val").text(wind);
            $("."+ className +" .sunrise__div").text(sunrise);
            $("."+ className +" .sunset__div").text(sunset);
            //
            $("."+className). css("background", backgroundImg );
            $("."+className). css("background-size", "cover" );

            setInterval(function () {
                var dateInWorld = createClock.getTimeWithZone();
                $("."+ className +" .clock__time").text(dateInWorld.time);
                $("."+ className +" .time__seconds").text(dateInWorld.seconds);
            }, 1000);
        });
        e.preventDefault();
    });

    // remove clock in DOM and from LocalStorage
    var closeButton = document.querySelectorAll(".clock__close");
    removeClock(closeButton);
});

/*
 * Function  make request on Yahoo server
 * load data(json) with object
*/
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

/*
 * Remove clock in DOM and from LocalStorage
 * Params: array with closeButtons
 */
function removeClock(closeButton) {
    for ( var i = 0; i < closeButton.length; i++){
        closeButton[i].addEventListener('click', function () {
            console.log("RRRR ", this.parentNode);
            var clockName = this.parentNode.classList[1];
            document.querySelector(".clock__container").removeChild( this.parentNode);
            var searchKeyInStorage = "clock-"+clockName;
            localStorage.removeItem(searchKeyInStorage);
        });
    }
}


