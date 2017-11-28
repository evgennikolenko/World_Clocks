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
        day = date.getUTCDate(),
        month = date.getUTCMonth();

    date = new Date(year, month, day, hh, mm, ss);



    var strArrayDate =  date.toTimeString(); // строковое время с GMT


    strArrayDate = strArrayDate.split(" ");

    var getTime = strArrayDate[0].split(":"), //время hh:mm:ss
     getHoursAndMinute = getTime[0] +':'+ getTime[1]; // hh::mm

    var getSeconds = getTime[2]; // ss
    var    getGMT = "GMT+0"+this.timeZone+"00"; //пояс

    return {
        'time' : getHoursAndMinute,
        'seconds' : getSeconds,
        'timeZone': getGMT,

        'day' : day,
        'month' : month,
        'year' : year
    }
};

/*
* createDom строет DOM дерево с созданым обьектом-часами
* Строение:
* div .clock +(classNameCountry)
*       div .clock__time  ---> time
*       div .time__seconds  ---> seconds
*       div .clock__zone-name  ---> zone name ```(Europe/London)
*       div .clock__memo ---> some text
*/
CreateClock.prototype.createDom = function () {
    function getMonthName(month) {
        var arr = ["January", "February", "March", "April", "May",
            "June" , "July", "August", "September", "October", "November", "December"];
        for(var i = 0; i < arr.length; i++){
            if(month === i) {
                return arr[i];
            }
        }
    }

    var day = this.getTimeWithZone().day;
    var month = getMonthName(this.getTimeWithZone().month);
    var year = this.getTimeWithZone().year;
    // Current time in <span class="header__country"> Kiev</span>
    var clock = '<div class="clock '+  this.classNameCountry+'">'+
       ' <div class="clock__header"></div>'+
        '<div class="clock__time ">'+this.getTimeWithZone().time+'' +
        '</div>' + '<span class="time__seconds">'+this.getTimeWithZone().seconds+'</span>'+
      '  <div class="clock__get-date">'+ day + " " + month + " " + year+'</div>'+
        '<div class="clock__zone-name">'+this.gmtName+'</div>' +
        '<div class="clock__memo">'+this.inputText+'</div></div>';
    $(".clock__container").append(clock);
};
