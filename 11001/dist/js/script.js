//Ленивая загрузка
// var bLazy = new Blazy({
//     success: function(){
//         //11
//     }
// });
//Текущая дата

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '.' + dd + '.' + yyyy;
//document.getElementById('filter-date-start-iso').value = today;
//document.getElementById('filter-date-end-iso').value = today;

//яндекс карта в самом верху
ymaps.ready(init);

function init() {
    $.ajax({
        url: 'https://api.sd-one.ru:3000/coord?termnumber=11001',
        type: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        dataType: 'json',
        success: function (data) {
            var myMap = new ymaps.Map("map", {
                center: [data.Latitude, data.Longitude],
                    zoom: 10
                }, {
                    searchControlProvider: 'yandex#search'
                }),
                myPlacemark = new ymaps.Placemark([data.Latitude, data.Longitude], {
                    // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
                    balloonContentHeader: "Балун метки",
                    balloonContentBody: "Содержимое <em>балуна</em> метки",
                    balloonContentFooter: "Подвал",
                    hintContent: "Хинт метки"
                });
        
            myMap.geoObjects.add(myPlacemark);
            myMap.controls.remove('searchControl');
        }
    });
    //myMap.behaviors.disable('scrollZoom');
    //myMap.behaviors.disable('drag');
}

/***********/

$(document).ready(function () {
    //documentation https://kenwheeler.github.io/slick/
    $('#slick_drill').slick({
        dots: true,
        arrows : false,
    });

    var timezone = localStorage.getItem('timezone');
    if (localStorage.getItem('timezone') !== null) {
        var ls = localStorage.getItem('timezone');
        $('.time-zone option[value="' + ls + '"]').prop('selected', true);
    }else{
        timezone = moment.tz.guess();
        $('.time-zone option[value="' + timezone + '"]').prop('selected', true);
    }
    $('.time-zone').change(function () {
        var val = $(this).val();
        localStorage.setItem('timezone', val);
        timezone = localStorage.getItem('timezone');
        timefilterbtn();
        $('.time-zone option[value="' + val + '"]').attr('selected', 'true');
    });


    /* datepicker */
    //documentation https://air-datepicker.com/ru
    new AirDatepicker('#filter-date-start', {
        //inline: true,
        timepicker: true,
        minutesStep: 5,
        isMobile: true,
        onSelect({date, formattedDate, datepicker}) {
            $('#filter-date-start-iso').val(moment(date).format("YYYY-MM-DDTHH:mm"));
            /*
            if (timezone == 0 || timezone == null) {
                $('#filter-date-start-iso').val(moment(date).format("YYYY-MM-DDTHH:mm"));
            } else {
                $('#filter-date-start-iso').val(moment.tz(date, timezone).format("YYYY-MM-DDTHH:mm"));
            }*/
            //console.log(date.toUTCString()); время по гринвичу
        }
    })
    new AirDatepicker('#filter-date-end', {
        //inline: true,
        timepicker: true,
        minutesStep: 5,
        isMobile: true,
        onSelect({date, formattedDate, datepicker}) {
            $('#filter-date-end-iso').val(moment(date).format("YYYY-MM-DDTHH:mm"));
            /*
            if (timezone == 0 || timezone == null) {
                $('#filter-date-end-iso').val(moment(date).format("YYYY-MM-DDTHH:mm"));
            } else {
                $('#filter-date-end-iso').val(moment.tz(date, timezone).format("YYYY-MM-DDTHH:mm"));
            }*/
        }
    })

    new AirDatepicker('#mon-filter-date-start', {
        //inline: true,
        timepicker: true,
        minutesStep: 5,
        isMobile: true,
        onSelect({date, formattedDate, datepicker}) {
            $('#mon-filter-date-start-iso').val(moment(date).format("YYYY-MM-DDTHH:mm"));
            /*
            if (timezone == 0 || timezone == null) {
                $('#mon-filter-date-start-iso').val(moment(date).format("YYYY-MM-DDTHH:mm"));
            } else {
                $('#mon-filter-date-start-iso').val(moment.tz(date, timezone).format("YYYY-MM-DDTHH:mm"));
            }*/
            //console.log(date.toUTCString()); время по гринвичу
        }
    })

    new AirDatepicker('#mon-filter-date-end', {
        //inline: true,
        timepicker: true,
        minutesStep: 5,
        isMobile: true,
        onSelect({date, formattedDate, datepicker}) {
            $('#mon-filter-date-end-iso').val(moment(date).format("YYYY-MM-DDTHH:mm"));
            /*
            if (timezone == 0 || timezone == null) {
                $('#mon-filter-date-end-iso').val(moment(date).format("YYYY-MM-DDTHH:mm"));
            } else {
                $('#mon-filter-date-end-iso').val(moment.tz(date, timezone).format("YYYY-MM-DDTHH:mm"));
            }*/
        }
    })

    //табы
    $('.btn-tabs').click(function () {
        $(this).parents('.tabs').find('.btn-tabs').removeClass('active');
        $(this).addClass('active');
        var wrapper = $(this).data('wrapper');
        var tabid = $(this).data('tab');
        $('#' + wrapper).children('.tab-item').removeClass('active');
        $('#' + tabid).addClass('active');
        return false;
    });


    function analiticLoad(from, till,timezone) {
        var datalensDashboard = "https://datalens.yandex/hkwzg8qvkjf84?_embedded=1&_no_controls=1";
        from_shifted = moment.tz(from,timezone).tz("Europe/Moscow").format("YYYY-MM-DDTHH:mm")
        till_shifted = moment.tz(till,timezone).tz("Europe/Moscow").format("YYYY-MM-DDTHH:mm")
        // __interval_2024-04-30T00:00_2024-05-05T00:00
        var param = "&tzone="+timezone+"&termtime=__interval_"+from_shifted+"_"+till_shifted;
        console.log(datalensDashboard+param)
        var iframe = document.getElementById('datalens');
        iframe.src = datalensDashboard+param;
    }

    /*11.06.2024*****************************************
     ****************************************************
     ****************************************************/
     t = new Date();
     f = new Date(new Date().setHours(0, 0, 0, 0))
     if (timezone == 0 || timezone == null) {
         t.setMinutes(t.getMinutes());
         $("#filter-date-end-iso").val(moment(t).format("YYYY-MM-DDTHH:mm"));
         $("#filter-date-end").val(moment(t).format("DD.MM.YYYY HH:mm"));
         $("#mon-filter-date-end-iso").val(moment(t).format("YYYY-MM-DDTHH:mm"));
         $("#mon-filter-date-end").val(moment(t).format("DD.MM.YYYY HH:mm"));
 
         f.setMinutes(f.getMinutes());
         $("#filter-date-start-iso").val(moment(f).format("YYYY-MM-DDTHH:mm"));
         $("#filter-date-start").val(moment(f).format("DD.MM.YYYY HH:mm"));
         $("#mon-filter-date-start-iso").val(moment(f).format("YYYY-MM-DDTHH:mm"));
         $("#mon-filter-date-start").val(moment(f).format("DD.MM.YYYY HH:mm"));
     } else {
         t.setMinutes(t.getMinutes());
         $("#filter-date-end-iso").val(moment.tz(t, timezone).format("YYYY-MM-DDTHH:mm"));
         $("#filter-date-end").val(moment.tz(t, timezone).format("DD.MM.YYYY HH:mm"));
         $("#mon-filter-date-end-iso").val(moment.tz(t, timezone).format("YYYY-MM-DDTHH:mm"));
         $("#mon-filter-date-end").val(moment.tz(t, timezone).format("DD.MM.YYYY HH:mm"));
 
         f.setMinutes(f.getMinutes());
         $("#filter-date-start-iso").val(moment(f).format("YYYY-MM-DDTHH:mm"));
         $("#filter-date-start").val(moment(f).format("DD.MM.YYYY HH:mm"));
         $("#mon-filter-date-start-iso").val(moment(f).format("YYYY-MM-DDTHH:mm"));
         $("#mon-filter-date-start").val(moment(f).format("DD.MM.YYYY HH:mm"));
     }

    //По умолчанию Аналитика
    analiticLoad($("#filter-date-start-iso").val(), $("#filter-date-end-iso").val(),timezone);

    function timefilterbtn() {
        $(".btn-filter").each(function () {
            switch ($(this).attr("data-name")) {
                case "5min":
                    t = new Date();
                    f = new Date();
                    if (timezone == 0 || timezone == null) {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment(t).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes() - 5);
                        $(this).attr("data-start", moment(f).format("YYYY-MM-DDTHH:mm"));
                    } else {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment.tz(t, timezone).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes() - 5);
                        $(this).attr("data-start", moment.tz(f, timezone).format("YYYY-MM-DDTHH:mm"));
                    }
                    break;
                case "30min":
                    t = new Date();
                    f = new Date();
                    if (timezone == 0 || timezone == null) {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment(t).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes() - 30);
                        $(this).attr("data-start", moment(f).format("YYYY-MM-DDTHH:mm"));
                    } else {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment.tz(t, timezone).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes() - 30);
                        $(this).attr("data-start", moment.tz(f, timezone).format("YYYY-MM-DDTHH:mm"));
                    }
                    break;
                case "1hour":
                    t = new Date();
                    f = new Date();
                    if (timezone == 0 || timezone == null) {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment(t).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes() - 60);
                        $(this).attr("data-start", moment(f).format("YYYY-MM-DDTHH:mm"));
                    } else {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment.tz(t, timezone).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes() - 60);
                        $(this).attr("data-start", moment.tz(f, timezone).format("YYYY-MM-DDTHH:mm"));
                    }
                    break;
                case "3hour":
                    t = new Date();
                    f = new Date();
                    if (timezone == 0 || timezone == null) {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment(t).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes() - 180);
                        $(this).attr("data-start", moment(f).format("YYYY-MM-DDTHH:mm"));
                    } else {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment.tz(t, timezone).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes() - 180);
                        $(this).attr("data-start", moment.tz(f, timezone).format("YYYY-MM-DDTHH:mm"));
                    }
                    break;
                case "6hour":
                    t = new Date();
                    f = new Date();
                    if (timezone == 0 || timezone == null) {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment(t).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes() - 360);
                        $(this).attr("data-start", moment(f).format("YYYY-MM-DDTHH:mm"));
                    } else {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment.tz(t, timezone).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes() - 360);
                        $(this).attr("data-start", moment.tz(f, timezone).format("YYYY-MM-DDTHH:mm"));
                    }
                    break;
                case "12hour":
                    t = new Date();
                    f = new Date();
                    if (timezone == 0 || timezone == null) {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment(t).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes() - 720);
                        $(this).attr("data-start", moment(f).format("YYYY-MM-DDTHH:mm"));
                    } else {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment.tz(t, timezone).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes() - 720);
                        $(this).attr("data-start", moment.tz(f, timezone).format("YYYY-MM-DDTHH:mm"));
                    }
                    break;
                case "1day":
                    t = new Date();
                    f = new Date(new Date().setHours(0, 0, 0, 0))
                    if (timezone == 0 || timezone == null) {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment(t).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes());
                        $(this).attr("data-start", moment(f).format("YYYY-MM-DDTHH:mm"));
                    } else {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment.tz(t, timezone).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes());
                        $(this).attr("data-start", moment(f).format("YYYY-MM-DDTHH:mm"));
                    }
                    break;
                case "1week":
                    t = new Date();
                    distance = t.getDay() - 1;
                    if (distance == -1) distance = 6;
                    f.setDate(t.getDate() - distance);
                    f = new Date(new Date(f).setHours(0, 0, 0, 0));

                    if (timezone == 0 || timezone == null) {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment(t).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes());
                        $(this).attr("data-start", moment(f).format("YYYY-MM-DDTHH:mm"));
                    } else {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment.tz(t, timezone).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes());
                        $(this).attr("data-start", moment(f).format("YYYY-MM-DDTHH:mm"));
                    }
                    break;
                case "1month":
                    t = new Date();

                    m = new Date().getMonth() + 1;
                    y = new Date().getFullYear();
                    f = new Date(y + "-" + m + "-01 00:00:00");

                    if (timezone == 0 || timezone == null) {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment(t).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes());
                        $(this).attr("data-start", moment(f).format("YYYY-MM-DDTHH:mm"));
                    } else {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment.tz(t, timezone).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes());
                        $(this).attr("data-start", moment(f).format("YYYY-MM-DDTHH:mm"));
                    }
                    break;

                case "yesterday": //вчера
                    dt = new Date();
                    t.setDate(dt.getDate() - 1);
                    t = new Date(new Date(t));
                    //console.log(moment.tz(new Date(t),timezone).format("YYYY-MM-DDT23:59"));
                    f.setDate(dt.getDate() - 1);
                    f = new Date(new Date(f));


                    if (timezone == 0 || timezone == null) {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment(t).format("YYYY-MM-DDT23:59"));

                        f.setMinutes(f.getMinutes());
                        $(this).attr("data-start", moment(f).format("YYYY-MM-DDT00:00"));
                    } else {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment.tz(t, timezone).format("YYYY-MM-DDT23:59"));

                        f.setMinutes(f.getMinutes());
                        $(this).attr("data-start", moment.tz(f, timezone).format("YYYY-MM-DDT00:00"));
                    }

                    break;
                case "beforeYesterday": //Позавчера
                    dt = new Date();
                    t.setDate(dt.getDate() - 2);
                    t = new Date(new Date(t));
                    //console.log(moment.tz(new Date(t),timezone).format("YYYY-MM-DDT23:59"));
                    f.setDate(dt.getDate() - 2);
                    f = new Date(new Date(f));


                    if (timezone == 0 || timezone == null) {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment(t).format("YYYY-MM-DDT23:59"));

                        f.setMinutes(f.getMinutes());
                        $(this).attr("data-start", moment(f).format("YYYY-MM-DDT00:00"));
                    } else {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment.tz(t, timezone).format("YYYY-MM-DDT23:59"));

                        f.setMinutes(f.getMinutes());
                        $(this).attr("data-start", moment.tz(f, timezone).format("YYYY-MM-DDT00:00"));
                    }
                    break;
                case "year": //год
                    t = new Date();

                    y = new Date().getFullYear();
                    f = new Date(y + "-01-01 00:00:00")


                    if (timezone == 0 || timezone == null) {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment(t).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes());
                        $(this).attr("data-start", moment(f).format("YYYY-MM-DDTHH:mm"));
                    } else {
                        t.setMinutes(t.getMinutes());
                        $(this).attr("data-end", moment.tz(t, timezone).format("YYYY-MM-DDTHH:mm"));

                        f.setMinutes(f.getMinutes());
                        $(this).attr("data-start", moment(f).format("YYYY-MM-DDTHH:mm"));
                    }

                    break
            }
        });
    }

    timefilterbtn();

    // Установка значений Событий и цветов
    function setEventNumberValues(events) {
        $('#event-tripcount').html(events.tripcount);
        $('#event-avgtripspeed').html(Math.round(events.avgtripspeed * 100) / 100);
        $('#event-alarms').html(events.alarms);

        if (events.tripcount <= 5) {
            $('#event-tripcount').addClass('green');
        } else if (events.tripcount > 5 && events.tripcount < 10) {
            $('#event-tripcount').addClass('yellow');
        } else {
            $('#event-tripcount').addClass('red');
        }

        if (events.alarms <= 5) {
            $('#event-alarms').addClass('green');
        } else if (events.alarms > 5 && events.alarms < 10) {
            $('#event-alarms').addClass('yellow');
        } else {
            $('#event-alarms').addClass('red');
        }

        if (events.avgtripspeed <= 0.4) {
            $('#event-avgtripspeed').addClass('green');
        } else if (events.avgtripspeed > 0.4 && events.avgtripspeed < 0.6) {
            $('#event-avgtripspeed').addClass('yellow');
        } else {
            $('#event-avgtripspeed').addClass('red');
        }
    }

    function monitoringLoad(start, end, timezone) {
        //console.log("Вызов фнукции загрузки мониторинга за период с "+start+" по "+end);
        $(".graph").each(function () {
            $(this).find("img").attr('src', '/dist/img/loader.gif');
            $(this).find("a").attr("href", "https://monitoring.sd-one.ru/chart2.php?graphid=" + $(this).attr("id") + "&from=" + start.replace("T", " ") + "&to=" + end.replace("T", " ") + "&profileIdx=web.charts.filter&timeZone="+timezone);
            $(this).find("img").attr("src", "https://monitoring.sd-one.ru/chart2.php?graphid=" + $(this).attr("id") + "&from=" + start.replace("T", " ") + "&to=" + end.replace("T", " ") + "&profileIdx=web.charts.filter&timeZone="+timezone);
        });
        $(".chart").each(function () {
            $(this).find("img").attr('src', '/dist/img/loader.gif');
            $(this).find("a").attr("href", "https://monitoring.sd-one.ru/chart.php?itemids[0]=" + $(this).attr("id") + "&from=" + start.replace("T", " ") + "&to=" + end.replace("T", " ") + "&profileIdx=web.dashboard.filter&timeZone="+timezone);
            $(this).find("img").attr("src", "https://monitoring.sd-one.ru/chart.php?itemids[0]=" + $(this).attr("id") + "&from=" + start.replace("T", " ") + "&to=" + end.replace("T", " ") + "&profileIdx=web.dashboard.filter&timeZone="+timezone);
        })
    }

    $('.btn-filter').on('click', function () {
        $(this).parents('.filter-btns').find('.btn-filter').removeClass('active');
        $(this).parents('.filter-btns').find('.col-auto').removeClass('active');
        $(this).addClass('active');
        $(this).parent().addClass('active');
        switch ($(this).parents('.tab-item').attr('id')) {
            case "tab-analitika":
                $("#filter-date-start-iso").val($(this).attr("data-start")).trigger('input');
                $("#filter-date-end-iso").val($(this).attr("data-end")).trigger('input');
                $("#filter-date-start").val(moment($(this).attr("data-start")).format("DD.MM.YYYY HH:mm"));
                $("#filter-date-end").val(moment($(this).attr("data-end")).format("DD.MM.YYYY HH:mm"));
                analiticLoad($("#filter-date-start-iso").val(), $("#filter-date-end-iso").val(), timezone);
                break;
            case "tab-monitoring":
                $("#mon-filter-date-start-iso").val($(this).attr("data-start")).trigger('input');
                $("#mon-filter-date-end-iso").val($(this).attr("data-end")).trigger('input');
                $("#mon-filter-date-start").val(moment($(this).attr("data-start")).format("DD.MM.YYYY HH:mm"));
                $("#mon-filter-date-end").val(moment($(this).attr("data-end")).format("DD.MM.YYYY HH:mm"));
                monitoringLoad($("#mon-filter-date-start-iso").val(), $("#mon-filter-date-end-iso").val(), timezone);
                break;
        }
    });
    /*11.06.2024*****************************************
     ****************************************************
     ****************************************************/
    //Проверка на правильность выбора диапозона дат
    $('#filter-date-submit').click(function () {
        var vstart = $("#filter-date-start-iso").val();
        var vend = $("#filter-date-end-iso").val();
        if(new Date(vstart).getTime() > new Date(vend).getTime()){
            $('#tab-analitika .filter-dates').addClass('error');
            $('#tab-analitika .filter-dates').prepend('<div class="custom-alert" role="alert">Ошибка, неправильно выбран период!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
        }
        else{
            analiticLoad($("#filter-date-start-iso").val(), $("#filter-date-end-iso").val(),timezone);
            $('#tab-analitika .custom-alert').remove();
            $('#tab-analitika .filter-dates').removeClass('error');
            $('#tab-analitika .btn-filter').removeClass('active');
        }
    });
    $('#mon-filter-date-submit').click(function () {
        var vstart = $("#mon-filter-date-start-iso").val();
        var vend = $("#mon-filter-date-end-iso").val();
        if(new Date(vstart).getTime() > new Date(vend).getTime()){
            $('#tab-monitoring .filter-dates').addClass('error');
            $('#tab-monitoring .filter-dates').prepend('<div class="custom-alert" role="alert">Ошибка, неправильно выбран период!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
        }
        else{
            monitoringLoad($("#mon-filter-date-start-iso").val(), $("#mon-filter-date-end-iso").val(),timezone);
            $('#tab-monitoring .custom-alert').remove();
            $('#tab-monitoring .filter-dates').removeClass('error');
            $('#tab-monitoring .btn-filter').removeClass('active');
        }
    });

    $('.filter-dates').each(function(){
        var vstart = $(this).find(".filter-date-start-iso").val();
        var vend = $(this).find(".filter-date-end-iso").val();
        if(new Date(vstart).getTime() > new Date(vend).getTime()){
            $(this).addClass('error');
            $(this).prepend('<div class="custom-alert" role="alert">Ошибка, неправильно выбран период!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
            $(".graph").each(function () {
                $(this).prepend('<div class="custom-alert" role="alert">Ошибка, неправильно выбран период!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
            });
            $(".chart").each(function () {
                $(this).prepend('<div class="custom-alert" role="alert">Ошибка, неправильно выбран период!<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>');
            });
        }
        else{
        //По умолчанию мониторинг
        //$('#tab-monitoring .filter-btns .btn-filter.active').trigger('click');
        monitoringLoad($("#mon-filter-date-start-iso").val(), $("#mon-filter-date-end-iso").val(), timezone);
        }
    });

    $('.m-btn-filter').click(function () {
        $(this).parents('.wrapper-filters ').find('.filter-btns').slideToggle('fast', function () {
            if ($(this).is(':visible'))
                $(this).css('display', 'flex');
        });
    });
    var winwidt = $(window).width();
    // if(winwidt<992){
    //   $('.btn-filter').click(function(){
    //     $('.filter-btns').removeClass('active');
    //     $(this).parents('.wrapper-filters').find('.m-btn-filter').removeClass('active-2');
    //   });
    // }
    Fancybox.bind(".chart a, .graph a", {
        groupAll: false, // Group all items
        on: {
            ready: (fancybox) => {
                //console.log(fancybox #${fancybox.id} is ready!);
            }
        }
    });


    zingchart.load = function (e) {
        switch (e.id) {
            case 'myChart_ciklogramma':
                $('#myChart_ciklogramma').removeClass('loaded');
                break;
            // case 'chartId2':
            //   // Do something else
            //   break;
            // case 'chartId3':
            //   // Reticulate splines
            //   break;
        }
    }
});
