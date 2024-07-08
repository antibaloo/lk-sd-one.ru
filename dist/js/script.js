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
    var myMap = new ymaps.Map("map", {
            center: [53.711556, 86.828416],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        }),
        myPlacemark = new ymaps.Placemark([53.711556, 86.828416], {
            // Чтобы балун и хинт открывались на метке, необходимо задать ей определенные свойства.
            balloonContentHeader: "Балун метки",
            balloonContentBody: "Содержимое <em>балуна</em> метки",
            balloonContentFooter: "Подвал",
            hintContent: "Хинт метки"
        });

    myMap.geoObjects.add(myPlacemark);
    myMap.controls.remove('searchControl');

    //myMap.behaviors.disable('scrollZoom');
    //myMap.behaviors.disable('drag');
}











/***********/

$(document).ready(function () {
    //documentation https://kenwheeler.github.io/slick/
    $('#slick_drill').slick({
        dots: true,
    });

    var timezone = localStorage.getItem('timezone');
    if (localStorage.getItem('timezone') !== null) {
        var ls = localStorage.getItem('timezone');
        $('.time-zone option[value="' + ls + '"]').prop('selected', true);
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


    function analiticLoad(from, till) {
        //console.log("Вызов функции загрузки аналитики за период с "+from+" по "+till);
        fromTS = new Date(from).getTime() / 1000;
        tillTS = new Date(till).getTime() / 1000;
        modeCount = (tillTS - fromTS + 1) / 4;

        let request = {
            "jsonrpc": "2.0",
            "method": "user.login",
            "params": {
                "username": "dataout",
                "password": "" /*этот метод подлучения статистики в боевых вариантах больше недоступен, пользователь заблокирован*/
            },
            "id": 1
        }
        $.ajax({
            url: 'https://monitoring.sd-one.ru/api_jsonrpc.php',
            type: 'post',
            data: JSON.stringify(request),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            dataType: 'json',
            success: function (data) {
                let auth = data.result
                //console.info(data.result);
                let requestHistoryFuel = {
                    "jsonrpc": "2.0",
                    "method": "history.get",
                    "params": {
                        "history": 0,
                        "output": "extend",
                        "itemids": "47567",  //Уровень топлива  47567
                        "time_from": fromTS,
                        "time_till": tillTS,
                    },
                    "auth": auth,
                    "id": 1
                }
                //расход/долив топлива старое api
                // $.ajax({
                //     url: 'https://monitoring.sd-one.ru/api_jsonrpc.php',
                //     type: 'post',
                //     data: JSON.stringify(requestHistoryFuel),
                //     headers: {
                //         'Accept': 'application/json',
                //         'Content-Type': 'application/json'
                //     },
                //     dataType: 'json',
                //     success: function (data) {
                //         //console.log(data);
                //         let deltas = [];
                //         let rashod = 0
                //         let doliv = 0
                //         if (data.result.length > 0) {
                //             let curr = data.result[0].value;
                //             for (i = 0; i < data.result.length; i++) {
                //                 delta = curr - data.result[i].value
                //                 if (Math.abs(delta) > 1) {
                //                     curr = data.result[i].value
                //                     deltas.push(delta)
                //                 }
                //             }
                //             //console.log(deltas);
                //             for (i = 0; i < deltas.length; i++) {
                //                 if (deltas[i] > 0) {
                //                     rashod += deltas[i]
                //                 } else {
                //                     doliv += Math.abs(deltas[i])
                //                 }
                //             }
                //         }
                //         //console.log("Rashod = "+rashod)
                //         //console.log("Doliv = "+doliv)
                //         // //График расхода/долива топлива
                //
                //         var sumToplivo = rashod + doliv;
                //         var prc_rashod = rashod * 100 / sumToplivo;
                //         var prc_doliv = doliv * 100 / sumToplivo;
                //
                //         if (isNaN(prc_rashod)) {
                //             prc_rashod = 0;
                //         }
                //         if (isNaN(prc_doliv)) {
                //             prc_doliv = 0;
                //         }
                //         $('#pie-event-rashod').attr('style', '--p:' + prc_rashod + ';--c:#303745;--f:#E7EAEF').html(Math.round(prc_rashod) + '%').removeClass('loaded');
                //         $('#pie-event-doliv').attr('style', '--p:' + prc_doliv + ';--c:#FF4545;--f:#E7EAEF').html(Math.round(prc_doliv) + '%').removeClass('loaded');
                //     }
                // });
                let requestModes = {
                    "jsonrpc": "2.0",
                    "method": "history.get",
                    "params": {
                        "history": 3,
                        "output": "extend",
                        "itemids": ["48338", "48339", "48340", "48341", "48342", "48343", "48344", "48345", "48364"],  //Режимы работы установки
                        "time_from": fromTS, //пятница, 09 февраля 2024 г., 0:00:00 GMT+05:00
                        "time_till": tillTS, //суббота, 10 февраля 2024 г., 0:00:00 GMT+05:00
                    },
                    "auth": auth,
                    "id": 1
                }
                $.ajax({
                    url: 'https://monitoring.sd-one.ru/api_jsonrpc.php',
                    type: 'post',
                    data: JSON.stringify(requestModes),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    dataType: 'json',
                    success: function (data) {
                        var engineOff = [];
                        eOffCount = 0;
                        var engineOn = [];
                        eOnCount = 0;
                        var down = [];
                        dCount = 0;
                        var up = [];
                        uCount = 0;
                        var drill = [];
                        var drillSP = [];
                        drCount = 0;
                        twistCount = 0;
                        unwindCount = 0;
                        alarmCount = 0;
                        //console.log(data.result.length);
                        data.result.forEach(function (element) { //dt=new Date(1707505200 * 1000).toLocaleString()
                            switch (element.itemid) {
                                case '48338':
                                    engineOff.push([new Date(element.clock * 1000).toLocaleString(), element.value]);
                                    if (element.value == 1) eOffCount++;
                                    break;
                                case '48339':
                                    engineOn.push([new Date(element.clock * 1000).toLocaleString(), element.value]);
                                    if (element.value == 1) eOnCount++;
                                    break;
                                case '48342':
                                    down.push([new Date(element.clock * 1000).toLocaleString(), element.value]);
                                    if (element.value == 1) dCount++;
                                    break;
                                case '48343':
                                    up.push([new Date(element.clock * 1000).toLocaleString(), element.value]);
                                    if (element.value == 1) uCount++;
                                    break
                                case '48340':
                                    drill.push([new Date(element.clock * 1000).toLocaleString(), element.value]);
                                    if (element.value == 1) drCount++;
                                    break;
                                case '48341':
                                    drillSP.push([new Date(element.clock * 1000).toLocaleString(), element.value]);
                                    if (element.value == 1) drCount++;
                                    break;
                                case "48344"://Скручивание
                                    if (element.value == 1) twistCount++;
                                    break;
                                case "48345"://Раскручивание
                                    if (element.value == 1) unwindCount++;
                                    break;
                                case "48364"://Аварийный подъем
                                    if (element.value == 1) alarmCount++;
                                    break;
                            }
                        });
                        //console.log(engineOff.length,engineOn.length,down.length,up.length,drill.length,drillSP.length)
                        //console.log('engineOff.length: '+ engineOff.length);
                        //console.log('engineOff: '+ engineOff);
                        //console.log('engineOn.length: '+ engineOn.length);
                        //console.log('engineOn: '+ engineOn);
                        stopCount = modeCount - eOffCount - eOnCount - dCount - uCount - drCount;
                        //console.log("Тактов в периоде: "+modeCount);
                        //console.log("Тактов простоя с заглушенным ДВС: "+eOffCount);
                        //console.log("Тактов простоя с заведенным ДВС: "+eOnCount);
                        //console.log("Тактов спуска: "+dCount);
                        //console.log("Тактов подъема: "+uCount);
                        //console.log("Тактов бурения: "+drCount);
                        //console.log("Тактов в отключке: "+stopCount);
                        //console.log("Количество скручиваний: "+twistCount);
                        //console.log("Количество раскручиваний: "+unwindCount);
                        //console.log("Количество аварийных подъемов: "+alarmCount);


                        // // Циклограмма режимов установки
                        // var chart = anychart.area();

                        // sEngineOff = chart.area(engineOff);
                        // sEngineOff.name("Простой с загушенным ДВС");
                        // sEngineOff.seriesType("spline-area");

                        // sEngineOn = chart.area(engineOn);
                        // sEngineOn.name("Простой с заведенным ДВС");
                        // sEngineOn.seriesType("spline-area");

                        // sDown = chart.area(down);
                        // sDown.name("Спуск");
                        // sDown.seriesType("spline-area");

                        // sUp = chart.area(up);
                        // sUp.name("Подъем");
                        // sUp.seriesType("spline-area");

                        // sDrill = chart.area(drill);
                        // sDrill.name("Бурение");
                        // sDrill.seriesType("spline-area");

                        // sDrillSP = chart.area(up)
                        // sDrillSP.name("Бурение СП");
                        // sDrillSP.seriesType("spline-area");

                        // // set the chart title
                        // chart.title("Циклограмма работы установки");
                        // chart.legend(true);
                        // // set the container id
                        // chart.container("container");
                        // // initiate drawing the chart
                        // chart.draw();


                        // Временная диаграмма
                        // var pie = anychart.pie();
                        // // set the data
                        // pie.data([
                        //   ["Отключка",stopCount],
                        //   ["Простой с заг. ДВС", eOffCount],
                        //   ["Простой с зав. ДВС", eOnCount],
                        //   ["Спуск", dCount],
                        //   ["Подъем", uCount],
                        //   ["Бурение", drCount]
                        // ]);
                        // set chart title
                        //pie.title("Временная диаграмма работы установки");
                        // set the container element
                        //pie.container("time");
                        // initiate chart display
                        //pie.draw();


                        /********************************************************************************************************************/
                        /********************************************************************************************************************/
                        /********************************************************************************************************************/
                        /********************************************************************************************************************/
                        /********************************************************************************************************************/
                        /********************************************************************************************************************/
                        /********************************************************************************************************************/
                        let chartConfigCiklogramma = {
                            gui: {
                                contextMenu: false,
                            },
                            type: 'area',
                            plot: {
                                tooltip: {
                                    visible: false,
                                },
                                alphaArea: 0.6,
                                aspect: 'spline',
                                stacked: true,
                            },
                            plotarea: {
                                margin: 'dynamic',
                            },
                            scaleX: {
                                item: {
                                    fontColor: '#616161',
                                    paddingTop: '5px',
                                },
                                label: {
                                    fontColor: '#616161',
                                    //text: '2019',
                                },
                                //labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
                                lineColor: '#AAA5A5',
                                tick: {
                                    lineColor: '#AAA5A5',
                                },
                            },
                            scaleY: {
                                guide: {
                                    lineColor: '#AAA5A5',
                                    lineStyle: 'dotted',
                                },
                                item: {
                                    fontColor: '#616161',
                                    paddingRight: '5px',
                                },
                                lineColor: '#AAA5A5',
                                short: true,
                                shortUnit: 'k',
                                tick: {
                                    lineColor: '#AAA5A5',
                                },
                            },
                            crosshairX: {
                                lineColor: '#AAA5A5',
                                plotLabel: {
                                    backgroundColor: '#EBEBEC',
                                    borderColor: '#AAA5A5',
                                    borderRadius: '2px',
                                    borderWidth: '2px',
                                    fontColor: '#616161',
                                    thousandsSeparator: ',',
                                },
                                scaleLabel: {
                                    backgroundColor: '#EBEBEC',
                                    borderColor: '#AAA5A5',
                                    fontColor: '#424242',
                                },
                            },
                            series: [
                                {
                                    text: 'Простой с загушенным ДВС',
                                    values: engineOff,
                                    backgroundColor: '#93cbf9',
                                    lineColor: '#93cbf9',
                                    marker: {
                                        backgroundColor: '#93cbf9',
                                        borderColor: '#93cbf9',
                                    },
                                },
                                {
                                    text: 'Простой с заведенным ДВС',
                                    values: engineOn,
                                    backgroundColor: '#1976d2',
                                    lineColor: '#1976d2',
                                    marker: {
                                        backgroundColor: '#1976d2',
                                        borderColor: '#1976d2',
                                    },
                                },
                                {
                                    text: 'Спуск',
                                    values: down,
                                    backgroundColor: '#f4984d',
                                    lineColor: '#f4984d',
                                    marker: {
                                        backgroundColor: '#f4984d',
                                        borderColor: '#f4984d',
                                    },
                                },
                                {
                                    text: 'Подъем',
                                    values: up,
                                    backgroundColor: '#ffd54f',
                                    lineColor: '#ffd54f',
                                    marker: {
                                        backgroundColor: '#ffd54f',
                                        borderColor: '#ffd54f',
                                    },
                                },
                                {
                                    text: 'Бурение',
                                    values: drill,
                                    backgroundColor: '#7d8c93',
                                    lineColor: '#7d8c93',
                                    marker: {
                                        backgroundColor: '#7d8c93',
                                        borderColor: '#7d8c93',
                                    },
                                },
                                {
                                    text: 'Бурение СП',
                                    values: up,
                                    backgroundColor: '#b6c1c1',
                                    lineColor: '#b6c1c1',
                                    marker: {
                                        backgroundColor: '#b6c1c1',
                                        borderColor: '#b6c1c1',
                                    },
                                },
                            ],
                        };

                        zingchart.render({
                            id: 'myChart_ciklogramma',
                            data: chartConfigCiklogramma,
                            height: 366,
                            width: '100%',
                        });

                        /********************************************************************************************************************/
                        /********************************************************************************************************************/
                        /********************************************************************************************************************/
                        /********************************************************************************************************************/
                        /********************************************************************************************************************/

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
                                        layout: "2x2", //row x column,
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
                                        toggleAction: 'remove',
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
                                            text: 'Отключка',
                                            values: [stopCount],
                                            backgroundColor: '#FF4545',
                                            lineColor: '#FF4545',
                                            lineWidth: '1px',
                                            marker: {
                                                backgroundColor: '#FF4545',
                                            },
                                        },
                                        {
                                            text: 'Бурение',
                                            values: [drCount],
                                            backgroundColor: '#303745',
                                            lineColor: '#303745',
                                            lineWidth: '1px',
                                            marker: {
                                                backgroundColor: '#303745',
                                            },
                                        },
                                        {
                                            text: 'Простой с зав. ДВС',
                                            values: [eOffCount],
                                            backgroundColor: '#FFD2D2',
                                            lineColor: '#FFD2D2',
                                            lineWidth: '1px',
                                            marker: {
                                                backgroundColor: '#FFD2D2',
                                            },
                                        },
                                        {
                                            text: 'Простой с заг. ДВС',
                                            values: [eOnCount],
                                            backgroundColor: '#6B9CDF',
                                            lineColor: '#6B9CDF',
                                            lineWidth: '1px',
                                            marker: {
                                                backgroundColor: '#6B9CDF',
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

                        zingchart.render({
                            id: 'myChart_vremennaya_diagramma',
                            data: chartConfigVremenayaDiagramma,
                            height: '100%',
                            width: '100%',
                        });

                        /********************************************************************************************************************/
                        /********************************************************************************************************************/
                        /********************************************************************************************************************/
                        /********************************************************************************************************************/
                        /********************************************************************************************************************/
                        /********************************************************************************************************************/
                        /********************************************************************************************************************/

                        //События старые
                        //console.log("Количество скручиваний: "+twistCount);
                        //console.log("Количество раскручиваний: "+unwindCount);
                        //console.log("Количество аварийных подъемов: "+alarmCount);
                        // var sumSubitiya = twistCount + unwindCount + alarmCount;
                        // var prc_twistCount = twistCount * 100 / sumSubitiya;
                        // var prc_unwindCount = unwindCount * 100 / sumSubitiya;
                        // var prc_alarmCount = alarmCount * 100 / sumSubitiya;
                        // if (isNaN(prc_twistCount)) {
                        //     prc_twistCount = 0;
                        // }
                        // if (isNaN(prc_unwindCount)) {
                        //     prc_unwindCount = 0;
                        // }
                        // if (isNaN(prc_alarmCount)) {
                        //     prc_alarmCount = 0;
                        // }
                        // $('#pie-event-skruchivanie').attr('style', '--p:' + prc_twistCount + ';--c:#303745;--f:#E7EAEF').html(Math.round(prc_twistCount) + '%').removeClass('loaded');
                        // $('#pie-event-raskruchivanie').attr('style', '--p:' + prc_unwindCount + ';--c:#FF4545;--f:#E7EAEF').html(Math.round(prc_unwindCount) + '%').removeClass('loaded');
                        // $('#pie-event-event').attr('style', '--p:' + prc_alarmCount + ';--c:#6B9CDF;--f:#E7EAEF').html(Math.round(prc_alarmCount) + '%').removeClass('loaded');

                        //События в режимах
                        //var events = anychart.line();

                        // events.column([
                        //   {x: 'Скручивания', value: twistCount},
                        //   {x: 'Раскручивания', value: unwindCount},
                        //   {x: 'Аварийные подъемы', value: alarmCount}
                        // ]);

                        // events.title("События");
                        //title.enabled(true);
                        //title.text('Click on line series');

                        // events.container('events');
                        // events.draw();

                    }
                });

            }
        });


        var eventsResposeData;
        var chartFuelConfig;

        let eventsRequsetData = {
            termnumber: 10001,
            from: fromTS,
            till: tillTS
        }
        //Получение данных для вкладок Топливо и События
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
                //console.log(data);
                eventsResposeData = data;
                setEventNumberValues(eventsResposeData);
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
                        // hoverState: {
                        //     border: '2px solid #ffff00',
                        // },
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

        $('button[data-tab="tab-toplivo"]').on('click', function () {
            renderFuelChart();
        });

        // Функция рендера диаграммы вкладки Топливо
        function renderFuelChart() {
            if (Object.keys(chartFuelConfig).length !== 0) {
                zingchart.render({
                    id: 'myChart_fuel-wrapper',
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
    /**************************************************
     **************************************************
     */
     //По умолчанию Аналитика
    analiticLoad($("#filter-date-start-iso").val(), $("#filter-date-end-iso").val());

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
                    distance = new Date().getDay() - 1;
                    if (distance == 0) distance = 6;
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

    function monitoringLoad(start, end) {
        //console.log("Вызов фнукции загрузки мониторинга за период с "+start+" по "+end);
        $(".graph").each(function () {
            $(this).find("img").attr('src', '/dist/img/loader.gif');
            $(this).find("a").attr("href", "https://monitoring.sd-one.ru/chart2.php?graphid=" + $(this).attr("id") + "&from=" + start.replace("T", " ") + "&to=" + end.replace("T", " ") + "&profileIdx=web.charts.filter");
            $(this).find("img").attr("src", "https://monitoring.sd-one.ru/chart2.php?graphid=" + $(this).attr("id") + "&from=" + start.replace("T", " ") + "&to=" + end.replace("T", " ") + "&profileIdx=web.charts.filter");
        });
        $(".chart").each(function () {
            $(this).find("img").attr('src', '/dist/img/loader.gif');
            $(this).find("a").attr("href", "https://monitoring.sd-one.ru/chart.php?itemids[0]=" + $(this).attr("id") + "&from=" + start.replace("T", " ") + "&to=" + end.replace("T", " ") + "&profileIdx=web.dashboard.filter");
            $(this).find("img").attr("src", "https://monitoring.sd-one.ru/chart.php?itemids[0]=" + $(this).attr("id") + "&from=" + start.replace("T", " ") + "&to=" + end.replace("T", " ") + "&profileIdx=web.dashboard.filter");
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
                analiticLoad($("#filter-date-start-iso").val(), $("#filter-date-end-iso").val());
                break;
            case "tab-monitoring":
                $("#mon-filter-date-start-iso").val($(this).attr("data-start")).trigger('input');
                $("#mon-filter-date-end-iso").val($(this).attr("data-end")).trigger('input');
                $("#mon-filter-date-start").val(moment($(this).attr("data-start")).format("DD.MM.YYYY HH:mm"));
                $("#mon-filter-date-end").val(moment($(this).attr("data-end")).format("DD.MM.YYYY HH:mm"));
                monitoringLoad($("#mon-filter-date-start-iso").val(), $("#mon-filter-date-end-iso").val());
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
            analiticLoad($("#filter-date-start-iso").val(), $("#filter-date-end-iso").val());
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
            monitoringLoad($("#mon-filter-date-start-iso").val(), $("#mon-filter-date-end-iso").val());
            $('#tab-monitoring .custom-alert').remove();
            $('#tab-monitoring .filter-dates').removeClass('error');
            $('#tab-monitoring .btn-filter').removeClass('active');
        }
    });

    $(document).on("click",".custom-alert .btn-close",function() {
        $(this).parents('.custom-alert').remove();
        return false;
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
        monitoringLoad($("#mon-filter-date-start-iso").val(), $("#mon-filter-date-end-iso").val());
        }
    });
    /****************************************************
     ****************************************************
     ****************************************************/

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
