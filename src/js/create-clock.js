/**
 * Created by evgennikolenko on 26.11.17.
 */

var CreateClock = function (classNameCountry, timeZone, gmtName, inputText) {

    this.classNameCountry = classNameCountry; // добавление дополнительного класса с названием города
    this.timeZone = +timeZone; // числовое значение часового пояса
    this.gmtName = gmtName; // GMT
    this.inputText = inputText; //описание с textarea
};

/*
* getTimeWithZone возвращает обьект, который содержит такие поля:
* time : время в строковом формате,
* timeZone: GMT
 */
CreateClock.prototype.getTimeWithZone = function () {
    var date = new Date;

    // получение текущей даты
    var hh = date.getUTCHours() + this.timeZone,
    mm = date.getUTCMinutes(),
    ss = date.getUTCSeconds(),
        year = date.getUTCFullYear(),
        month = date.getUTCDate(),
        day = date.getUTCDay();

    date = new Date(year, month, day, hh, mm, ss);

    var strArrayDate =  date.toTimeString(); // строковое время с GMT
    strArrayDate = strArrayDate.split(" ");

    var getTime = strArrayDate[0], //время
        getGMT = "GMT+0"+this.timeZone+"00"; //пояс

    return {
        'time' : getTime,
        'timeZone': getGMT
    }
};

/*
* createDom строет DOM дерево с созданым обьектом-часами
* Строение:
* div .clock +(classNameCountry)
*       div .clock__time  ---> time
*       div .clock__zone-name  ---> zone name ```(Europe/London)
*       div .clock__memo ---> some text
*/
CreateClock.prototype.createDom = function () {
    var clock = '<div class="clock '+  this.classNameCountry+'"><div class="clock__time ">'+this.getTimeWithZone().time+'</div>' +
        '<div class="clock__zone-name">'+this.gmtName+'</div>' +
        '<div class="clock__memo">'+this.inputText+'</div></div>';
    $(".clock__container").append(clock);
};
