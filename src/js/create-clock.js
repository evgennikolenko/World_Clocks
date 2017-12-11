/**
 * Created by evgennikolenko on 26.11.17.
 */

var CreateClock = function (classNameCountry, timeZone, gmtName, date) {
    this.classNameCountry = classNameCountry; // добавление дополнительного класса с названием города

    this.timeZone = +timeZone; // числовое значение часового пояса
    this.gmtName = gmtName; // GMT
    this.date = date; // GMT
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
        day = date.getUTCDate(),
        month = date.getUTCMonth();

    date = new Date(year, month, day, hh, mm, ss);

    var strArrayDate =  date.toTimeString(); // строковое время с GMT
    strArrayDate = strArrayDate.split(" ");
    var getTime = strArrayDate[0].split(":"), //время hh:mm:ss
     getHoursAndMinute = getTime[0] +':'+ getTime[1]; // hh:mm

    var getSeconds = getTime[2]; // ss
    var getGMT = "GMT+0"+this.timeZone+"00"; //пояс

    return {
        'time' : getHoursAndMinute,
        'seconds' : getSeconds,
        'timeZone': getGMT
    }
};

/*
* createDom строет DOM дерево с созданым обьектом-часами
*/
CreateClock.prototype.createDom = function () {
    var clock = '<div class="clock '+  this.classNameCountry+'">'+
        '<div class="clock__close"></div>'+
        '<div class="clock__header"></div>'+
        '<div class="clock__time ">'+this.getTimeWithZone().time+'' +
        '</div>'+'<span class="time__seconds">'+this.getTimeWithZone().seconds+'</span>'+
        '<div class="clock__get-date">'+ this.date +'</div>'+
        '<div class="clock__weather">'+
        '<div class="weather__temp">6 C</div>'+
        '<div class="weather__image"></div>'+
        '<div class="weather__wind"><span class="wind-speed__val"></span><div class="wind__image"></div></div>'+
        '<div class="weather__sun">'+
        '<div class="sunrise">Sunrise: <span class="sunrise__div">12:35</span></div>'+
        '<div class="sunset">Sunset:  <span class="sunset__div">24:00</span></div>'+
        '</div>'+
        '</div>'+
        '<div class="clock__zone-name">'+this.gmtName+'</div>';

    $(".clock__container").append(clock);
};
