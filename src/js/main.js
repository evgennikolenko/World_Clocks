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
    var textArea = document.querySelector(".create-form__textarea");

    formButton.addEventListener('click', function (e) {

        // get input text
        var inputText = textArea.value;

        // select ---> options
        for ( var i = 0; i < formOptions.length; i++){
            var option = formOptions[i];

            console.log("option: ", formOptions[i]);

            if ( option.selected){
                //data attributes
                // var timeZone = option.getAttribute('data-timeZone'),
                // gmtName = option.getAttribute('data-timeZoneName'),
                // className = option.getAttribute('data-class-name-z');


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
                            className = key["data-class-name"];
                    }
                }


        console.log("re ",DATAjson);



        // создание екземпляра
        var createClock = new CreateClock( className, timeZone, gmtName, inputText);
        createClock.createDom();




        setInterval(function () {
            var dateInWorld = createClock.getTimeWithZone();

            $("."+ className +" .clock__time").text(dateInWorld.time);
            $("."+ className +" .time__seconds").text(dateInWorld.seconds);
        }, 1000);
        e.preventDefault();
    });
});
