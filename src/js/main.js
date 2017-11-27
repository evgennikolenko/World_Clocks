/**
 * Created by evgen on 27.11.17.
 */
window.addEventListener('load', function () {

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
                var timeZone = option.getAttribute('data-timeZone'),
                gmtName = option.getAttribute('data-timeZoneName'),
                className = option.getAttribute('data-class-name-z');
                break;
            }
        }

        // создание екземпляра
        var createClock = new CreateClock( className, timeZone, gmtName, inputText);
        createClock.createDom();

        setInterval(function () {
            var dateInWorld = createClock.getTimeWithZone();
            $("."+ className +" .clock__time").text( dateInWorld.time);
        }, 1000);
        e.preventDefault();
    });
});
