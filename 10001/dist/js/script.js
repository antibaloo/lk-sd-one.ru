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
        url: 'https://api.sd-one.ru:3000/coord?termnumber=10001',
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
            if (timezone == 0 || timezone == null) {
                $('#filter-date-start-iso').val(moment(date).format("YYYY-MM-DDTHH:mm"));
            } else {
                $('#filter-date-start-iso').val(moment.tz(date, timezone).format("YYYY-MM-DDTHH:mm"));
            }
            //console.log(date.toUTCString()); время по гринвичу
        }
    })
    new AirDatepicker('#filter-date-end', {
        //inline: true,
        timepicker: true,
        minutesStep: 5,
        isMobile: true,
        onSelect({date, formattedDate, datepicker}) {
            if (timezone == 0 || timezone == null) {
                $('#filter-date-end-iso').val(moment(date).format("YYYY-MM-DDTHH:mm"));
            } else {
                $('#filter-date-end-iso').val(moment.tz(date, timezone).format("YYYY-MM-DDTHH:mm"));
            }
        }
    })

    new AirDatepicker('#mon-filter-date-start', {
        //inline: true,
        timepicker: true,
        minutesStep: 5,
        isMobile: true,
        onSelect({date, formattedDate, datepicker}) {
            if (timezone == 0 || timezone == null) {
                $('#mon-filter-date-start-iso').val(moment(date).format("YYYY-MM-DDTHH:mm"));
            } else {
                $('#mon-filter-date-start-iso').val(moment.tz(date, timezone).format("YYYY-MM-DDTHH:mm"));
            }
            //console.log(date.toUTCString()); время по гринвичу
        }
    })

    new AirDatepicker('#mon-filter-date-end', {
        //inline: true,
        timepicker: true,
        minutesStep: 5,
        isMobile: true,
        onSelect({date, formattedDate, datepicker}) {
            if (timezone == 0 || timezone == null) {
                $('#mon-filter-date-end-iso').val(moment(date).format("YYYY-MM-DDTHH:mm"));
            } else {
                $('#mon-filter-date-end-iso').val(moment.tz(date, timezone).format("YYYY-MM-DDTHH:mm"));
            }
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
        //console.log("Вызов функции загрузки аналитики за период с "+from+" по "+till);
        fromTS = new Date(from).getTime() / 1000;
        tillTS = new Date(till).getTime() / 1000;
        modeCount = (tillTS - fromTS + 1) / 4;

        var eventsResposeData;
        var chartFuelConfig;

        let eventsRequsetData = {
            termnumber: 10001,
            from: from.replace("T", " "),
            till: till.replace("T", " "),
            timeZone: timezone
        }

        $(".graphA").each(function () {
            $(this).find("img").attr('src', '/dist/img/loader.gif');
            $(this).find("a").attr("href", "https://monitoring.sd-one.ru/chart2.php?graphid=" + $(this).attr("id") + "&from=" + from.replace("T", " ") + "&to=" + till.replace("T", " ") + "&profileIdx=web.charts.filter&timeZone="+timezone);
            $(this).find("img").attr("src", "https://monitoring.sd-one.ru/chart2.php?graphid=" + $(this).attr("id") + "&from=" + from.replace("T", " ") + "&to=" + till.replace("T", " ") + "&profileIdx=web.charts.filter&timeZone="+timezone);
        });

        // Получение данных по точкам бурения на установке за период
        $.ajax({
            url:'https://api.sd-one.ru:3000/coords',
            type: 'get',
            data: eventsRequsetData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                skvazhini.setCenter([data.Avg.latitude, data.Avg.longitude]);
                var objectManager = new ymaps.ObjectManager({ clusterize: true });
                var objects = [];
                skvazhini.geoObjects.removeAll();
                for (var i = 0, l = data.Coords.length; i < l; i++) {
                    objects.push({
                        type: 'Feature',
                        id: i,
                        geometry: {
                            type: 'Point',
                            coordinates: [data.Coords[i].latitude, data.Coords[i].longitude]
                        }
                    });
                }
                objectManager.add(objects);
                skvazhini.geoObjects.add(objectManager);
            }
        });

        //Получение данных для вкладок Топливо, События и временной диаграммы
        $.ajax({
            url: 'https://api.sd-one.ru:3000/analitic',
            type: 'get',
            data: eventsRequsetData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            dataType: 'json',
            success: function (data) {
                console.log(data);
                eventsResposeData = data;
                setEventNumberValues(eventsResposeData);
                
                let chartConfigVremenayaDiagramma = {
                    gui: {
                        contextMenu: false,
                    },
                    graphset: [
                        {
                            type: 'ring',
              backgroundColor: '#fff',
              legend: {
                adjustLayout: true,
                align: 'center',
                backgroundColor: '#fff',
                borderWidth: '0px',
                width: '100%',
                layout: "3x2", //row x column,
                item: {
                  cursor: 'pointer',
                  fontColor: '#777',
                  fontSize: '12px',
                  offsetX: '-6px',
                },
                marker: {
                  type: 'circle',
                  borderWidth: '0px',
                  cursor: 'pointer',
                  size: 5,
                },
                // mediaRules: [
                //   {
                //     maxWidth: '0',
                //     visible: false,
                //   },
                // ],
                toggleAction: 'disabled',
                verticalAlign: 'bottom',
              },
              plot: {
                tooltip: false,
                valueBox: false,
                animation: {
                  effect: 'ANIMATION_EXPAND_VERTICAL',
                  sequence: 'ANIMATION_BY_PLOT_AND_NODE',
                },
                backgroundColor: '#FBFCFE',
                borderWidth: '0px',
                hoverState: {
                  cursor: 'hand',
                },
                slice: '33%',
              },
              plotarea: {
                margin: '20px 0px 0px 0px',
                backgroundColor: 'transparent',
                borderRadius: '10px',
                borderWidth: '0px',
              },
              scaleR: {
                refAngle: 270,
              },
              series: [
                {
                  text: 'Простой',
                  values: [data.stopcount],
                  backgroundColor: '#918887',
                  lineColor: '#918887',
                  lineWidth: '1px',
                  marker: {
                    backgroundColor: '#918887',
                  },
                },
                {
                    text: 'Простой с з/ДВС',
                    values: [data.stopwencount],
                    backgroundColor: '#fc0356',
                    lineColor: '#fc0356',
                    lineWidth: '1px',
                    marker: {
                      backgroundColor: '#fc0356',
                    },
                  },
                {
                  text: 'Бурение',
                  values: [data.drillcount],
                  backgroundColor: '#303745',
                  lineColor: '#303745',
                  lineWidth: '1px',
                  marker: {
                    backgroundColor: '#303745',
                  },
                },
                {
                  text: 'Промывка',
                  values: [data.washcount],
                  backgroundColor: '#FFD2D2',
                  lineColor: '#FFD2D2',
                  lineWidth: '1px',
                  marker: {
                    backgroundColor: '#FFD2D2',
                  },
                },
                {
                  text: 'СПО',
                  values: [data.updowncount],
                  backgroundColor: '#6B9CDF',
                  lineColor: '#6B9CDF',
                  lineWidth: '1px',
                  marker: {
                    backgroundColor: '#6B9CDF',
                  },
                },
                {
                  text: 'ССК',
                  values: [data.overshotcount],
                  backgroundColor: '#44944A',
                  lineColor: '#44944A',
                  lineWidth: '1px',
                  marker: {
                    backgroundColor: '#44944A',
                  },
                },
              ],
              noData: {
                text: 'No Selection',
                alpha: 1,
                backgroundColor: '#20b2db',
                bold: true,
                fontSize: '18px',
                textAlpha: 1,
              },
            },
          ],
        };
        zingchart.bind('myChart_vremennaya_diagramma', 'contextmenu', function(p) {
            return false;
          });
        zingchart.render({
          id: 'myChart_vremennaya_diagramma',
          data: chartConfigVremenayaDiagramma,
          height: '100%',
          width: '100%',
        });

        chartFuelConfig = {
            type: 'bar',
            theme: 'classic',
            backgroundColor: 'white',
            globals: {
                fontFamily: 'Inter',
            },
            plot: {
                tooltip: {
                    visible: false,
                },
                valueBox: {
                    text: '%v',
                    color: '#000',
                    fontWeight: 500,
                    fontSize: 12,
                },
                barWidth: winwidt > 768 ? 115 : 75,
                animation: {
                    effect: 'ANIMATION_EXPAND_HORIZONTAL',
                },
                cursor: 'hand',
                dataBrowser: [
                    "<span style='font-weight:bold;color:#1976d2;'>Расход</span>",
                    "<span style='font-weight:bold;color:#424242;'>Долив</span>"
                ],
                rules: [
                    {
                        backgroundColor: '#6B9CDF',
                        rule: '%i==0',
                    },
                    {
                        backgroundColor: '#FF4545',
                        rule: '%i==1',
                    },
                ],
            },
            scaleX: {
                values: [
                    'Расход',
                    'Долив',
                ],
                guide: {
                    visible: false,
                },
                item: {
                    color: '#000000',
                    fontSize: 14,
                },
                lineColor: '#DFE1E5',
                lineWidth: '1px',
                tick: {
                    lineColor: '#DFE1E5',
                    lineWidth: '1px',
                },
            },
            scaleY: {
                guide: {
                    lineStyle: 'solid',
                },
                item: {
                    color: '#000000',
                },
                lineColor: '#DFE1E5',
                tick: {
                    lineColor: '#DFE1E5',
                },
            },
            crosshairX: {
                lineColor: 'none',
                lineWidth: '0px',
                marker: {
                    visible: false,
                },
                plotLabel: {
                    text: '%data-browser: %v литров',
                    alpha: 0.9,
                    backgroundColor: 'white',
                    borderRadius: '4px',
                    borderWidth: '3px',
                    callout: true,
                    calloutPosition: 'bottom',
                    color: '#606060',
                    fontSize: '12px',
                    multiple: true,
                    offsetY: '-25px',
                    padding: '8px',
                    placement: 'node-top',
                    rules: [
                        {
                            borderColor: '#6B9CDF',
                            rule: '%i==0',
                        },
                        {
                            borderColor: '#FF4545',
                            rule: '%i==1',
                        },
                    ],
                    shadow: false,
                },
                scaleLabel: {
                    visible: false,
                },
            },
            series: [{
                values: [eventsResposeData.topping, eventsResposeData.consumption]
            }],
        };
        renderFuelChart();
    }
});
/*
        $('button[data-tab="tab-toplivo"]').on('click', function () {

            renderFuelChart();
        });*/

        // Функция рендера диаграммы вкладки Топливо
        function renderFuelChart() {
            if (Object.keys(chartFuelConfig).length !== 0) {
                zingchart.bind('myChart_fuel_wrapper', 'contextmenu', function(p) {
                    return false;
                });
                zingchart.render({
                    id: 'myChart_fuel_wrapper',
                    data: chartFuelConfig,
                    height: 300,
                    width: '100%'
                });
            }
        }

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
