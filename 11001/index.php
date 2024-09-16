<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Smart Drill S50</title>
    <link rel="stylesheet" href="dist/bootstrap/css/bootstrap-reboot.min.css">
    <link rel="stylesheet" href="dist/bootstrap/css/bootstrap-grid.min.css">
    <link rel="stylesheet" href="dist/bootstrap/css/bootstrap-utilities.min.css">
    <link rel="stylesheet" href="dist/air-datepicker/air-datepicker.css">
    <link rel="stylesheet" href="dist/fancybox/fancybox.css">
    <link rel="stylesheet" href="dist/font/Inter.css">
    <link rel="stylesheet" href="dist/slick/slick.css">
    <link rel="stylesheet" href="dist/css/style.css?t=<?=time();?>">
</head>
<body>
    <header id="header">
        <div class="wrapper-map">
            <div id="map"></div>
            <div class="wrapper-el-map">
                <div class="container">
                    <div class="d-flex flex-wrap justify-content-center justify-content-md-start">
                        <div id="slick_drill">
                            <div class="el-up item">
                                <div class="field-images_1">
                                    <img src="dist/img/webp/zbo.webp" class="item-1" width="132" height="19" />
                                </div>
                                <div class="field-images_2">
                                    <img src="dist/img/webp/rig.webp" class="item-2" width="174" height="170" />
                                </div>
                                <div
                                    class="field-title d-flex align-items-center justify-content-center justify-content-lg-between">
                                    <span>SN 11001</span>
                                    <select name="" class="time-zone">
                                        <option value="Europe/Kaliningrad">Калининград (UTC+2)</option>
                                        <option value="Europe/Moscow">Москва (UTC+3)</option>
                                        <option value="Europe/Samara">Самара (UTC+4)</option>
                                        <option value="Asia/Yekaterinburg">Екатеринбург (UTC+5)</option>
                                        <option value="Asia/Omsk">Омск (UTC+6)</option>
                                        <option value="Asia/Krasnoyarsk">Красноярск (UTC+7)</option>
                                        <option value="Asia/Irkutsk">Иркутск (UTC+8)</option>
                                        <option value="Asia/Yakutsk">Якутск (UTC+9)</option>
                                        <option value="Asia/Vladivostok">Владивосток (UTC+10)</option>
                                        <option value="Asia/Magadan">Магадан (UTC+11)</option>
                                        <option value="Asia/Kamchatka">Камчатка (UTC+12)</option>
                                    </select>
                                </div>
                            </div>
                            <div class="el-up item">
                                <div class="field-images_1">
                                    <img src="dist/img/webp/zbo.webp" class="item-1" width="132" height="19" />
                                </div>
                                <div class="field-images_2">
                                    <img src="dist/img/webp/rig.webp" class="item-2" width="174" height="170" />
                                </div>
                                <div
                                    class="field-title d-flex align-items-center justify-content-center justify-content-lg-between">
                                    <span>SN 11001</span>
                                    <select name="" class="time-zone">
                                        <option value="0">Часовой пояс</option>
                                        <option value="Europe/Kaliningrad">Калининград (UTC+2)</option>
                                        <option value="Europe/Moscow">Москва (UTC+3)</option>
                                        <option value="Europe/Samara">Самара (UTC+4)</option>
                                        <option value="Asia/Yekaterinburg">Екатеринбург (UTC+5)</option>
                                        <option value="Asia/Omsk">Омск (UTC+6)</option>
                                        <option value="Asia/Krasnoyarsk">Красноярск (UTC+7)</option>
                                        <option value="Asia/Irkutsk">Иркутск (UTC+8)</option>
                                        <option value="Asia/Yakutsk">Якутск (UTC+9)</option>
                                        <option value="Asia/Vladivostok">Владивосток (UTC+10)</option>
                                        <option value="Asia/Magadan">Магадан (UTC+11)</option>
                                        <option value="Asia/Kamchatka">Камчатка (UTC+12)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrapper_header">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-4">
                        <div class="logo">
                            <img src="dist/img/webp/logo.webp" width="335" height="54" />
                        </div>
                    </div>
                    <div class="col-md-8">
                        <div class="tabs row justify-content-center justify-content-md-end fw-bold">
                            <div class="col-auto">
                                <button data-tab="tab-analitika" data-wrapper="tabs-wr-1"
                                    class="btn btn-primary btn-lg fw-bolder py-2 py-md-3 px-4 lh-1 text-center btn-tabs"
                                    id="btn-tab-analitika">Аналитика
                                </button>
                            </div>
                            <div class="col-auto">
                                <button data-tab="tab-monitoring" data-wrapper="tabs-wr-1"
                                    class="btn btn-primary btn-lg fw-bolder py-2 py-md-3 px-4 lh-1 text-center active btn-tabs">
                                    Мониторинг
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <main id="main" class="pb-3 pb-sm-5">
        <div class="container position-relative">
            <div class="tabs-wrapper" id="tabs-wr-1">
                <div class="tab-item" id="tab-analitika">
                    <div class="wrapper-filters sticky-top">
                        <div class="row justify-content-between">
                            <div class="col-filters col-auto d-flex align-items-center">
                                <div class="filter-title"><!--Временные фильтры--></div>
                                <div class="filter-btns flex-wrap">
                                    <div class="col-auto col-filter-item">
                                        <button class="btn-filter btn btn-primary active"
                                            data-name="1day">Сегодня</button>
                                    </div>
                                    <div class="col-auto col-filter-item">
                                        <button class="btn-filter btn btn-primary" data-name="yesterday">Вчера</button>
                                    </div>
                                    <div class="col-auto col-filter-item">
                                        <button class="btn-filter btn btn-primary" data-name="beforeYesterday">Позавчера
                                        </button>
                                    </div>
                                    <div class="col-auto col-filter-item">
                                        <button class="btn-filter btn btn-primary" data-name="1week">Неделя</button>
                                    </div>
                                    <div class="col-auto col-filter-item">
                                        <button class="btn-filter btn btn-primary" data-name="1month">Месяц</button>
                                    </div>
                                    <div class="col-auto col-filter-item">
                                        <button class="btn-filter btn btn-primary" data-name="year">Год</button>
                                    </div>
                                </div>
                            </div>
                            <button class="m-btn-filter btn btn-primary active-2">
                                Развернуть
                            </button>
                            <div class="col-auto d-flex align-items-center col-date-period">
                                <div class="filter-dates d-flex flex-wrap align-items-center py-2 ps-4 pe-5">
                                    <input type="text" class="filter-date filter-date-start" id="filter-date-start"
                                        placeholder="дд-мм-гггг чч:мм" value="">
                                    <input type="text" class="filter-date filter-date-start-iso d-none"
                                        id="filter-date-start-iso" placeholder="дд-мм-гггг чч:мм" value="">
                                    <span class="line"></span>
                                    <input type="text" class="filter-date filter-date-end" id="filter-date-end"
                                        placeholder="дд-мм-гггг чч:мм" value="">
                                    <input type="text" class="filter-date filter-date-end-iso d-none"
                                        id="filter-date-end-iso" placeholder="дд-мм-гггг чч:мм" value="">
                                    <button id="filter-date-submit"
                                        class="filter-date-submit position-absolute border-0 rounded-circle">
                                        Применить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="charts-tpl" style="height: 2000px; margin: 0; border:0; padding: 0;">
                            <iframe id="datalens" frameborder="0" style="border:0; width:100%; height:100%;"></iframe>
                        </div>
                    </div>
                </div>
                <div class="tab-item active" id="tab-monitoring">
                    <div class="wrapper-filters sticky-top">
                        <div class="row justify-content-between">
                            <div class="col-filters col-auto d-flex align-items-center">
                                <div class="filter-title"><!--Временные фильтры--></div>
                                <div class="filter-btns flex-wrap">
                                    <div class="col-auto col-filter-item">
                                        <button class="btn-filter btn btn-primary active" data-name="5min">5 мин</button>
                                    </div>
                                    <div class="col-auto col-filter-item">
                                        <button class="btn-filter btn btn-primary" data-name="30min">30 мин</button>
                                    </div>
                                    <div class="col-auto col-filter-item">
                                        <button class="btn-filter btn btn-primary" data-name="1hour">1 час</button>
                                    </div>
                                    <div class="col-auto col-filter-item">
                                        <button class="btn-filter btn btn-primary" data-name="3hour">3 часа</button>
                                    </div>
                                    <div class="col-auto col-filter-item">
                                        <button class="btn-filter btn btn-primary" data-name="6hour">6 часов</button>
                                    </div>
                                    <div class="col-auto col-filter-item">
                                        <button class="btn-filter btn btn-primary" data-name="12hour">12 часов</button>
                                    </div>
                                    <div class="col-auto col-filter-item">
                                        <button class="btn-filter btn btn-primary" data-name="1day">1
                                            день</button>
                                    </div>
                                </div>
                            </div>
                            <button class="m-btn-filter btn btn-primary active-2">
                                Развернуть
                            </button>
                            <div class="col-auto d-flex align-items-center col-date-period">
                                <div class="filter-dates d-flex flex-wrap align-items-center py-2 ps-4 pe-5">
                                    <input type="text" class="filter-date filter-date-start" id="mon-filter-date-start"
                                        placeholder="дд-мм-гггг чч:мм" value="">
                                    <input type="text" class="filter-date filter-date-start-iso d-none" 
                                        id="mon-filter-date-start-iso" placeholder="дд-мм-гггг чч:мм" value="">
                                    <span class="line"></span>
                                    <input type="text" class="filter-date filter-date-end" id="mon-filter-date-end"
                                        placeholder="дд-мм-гггг чч:мм" value="">
                                    <input type="text" class="filter-date filter-date-end-iso d-none" 
                                        id="mon-filter-date-end-iso" placeholder="дд-мм-гггг чч:мм" value="">
                                    <button id="mon-filter-date-submit" 
                                        class="filter-date-submit position-absolute border-0 rounded-circle">
                                        Применить
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="block-title text-center mb-4 fw-bold">
                        <span class="fw-bolder">Сводные диаграммы</span>
                    </div>
                    <!--tabs-->
                    <div class="tabs row justify-content-center fw-bold mb-3">
                        <div class="col-auto mb-2">
                            <button data-tab="rig" data-wrapper="tabs-wr-3"
                                class="btn btn-primary py-2 px-3 py-md-3 px-m-4 lh-1 text-center btn-tabs active">
                                Установка
                            </button>
                        </div>
                        <div class="col-auto mb-2">
                            <button data-tab="engine" data-wrapper="tabs-wr-3"
                                class="btn btn-primary py-2 px-3 py-md-3 px-m-4 lh-1 text-center btn-tabs">Оператор
                            </button>
                        </div>
                        <div class="col-auto mb-2">
                            <button data-tab="sum" data-wrapper="tabs-wr-3"
                                class="btn btn-primary py-2 px-3 py-md-3 px-m-4 lh-1 text-center btn-tabs">ДВС
                            </button>
                        </div>
                        <div class="col-auto mb-2">
                            <button data-tab="input" data-wrapper="tabs-wr-3"
                                class="btn btn-primary py-2 px-3 py-md-3 px-m-4 lh-1 text-center btn-tabs">Аварии
                            </button>
                        </div>
                    </div>
                    <section class="tabs-wrapper" id="tabs-wr-3">
                        <div id="rig" class="tab-item active">
                            <div class="graphs50">
                              <div class="graph" id="2823">
                                <a href=""><img src="dist/img/loader.gif"></a>
                              </div>
                            </div>
                          </div>
                          <div id="engine" class="tab-item">
                            <div class="graphs50">
                              <div class="graph" id="2827">
                                <a href=""><img src="dist/img/loader.gif"></a>
                              </div>
                            </div>
                          </div>
                          <div id="sum" class="tab-item">
                            <div class="graphs100">
                              <div class="graph" id="2825">
                                <a href=""><img src="dist/img/loader.gif"></a>
                              </div>
                            </div>
                          </div>
                          <div id="input" class="tab-item">
                            <div class="graphs50">
                              <div class="graph" id="2829">
                                <a href=""><img src="dist/img/loader.gif"></a>
                              </div>
                            </div>
                          </div>
                    </section>
                    <!--tabs end-->
                    <div class="block-title text-center mb-3 mb-sm-4 mt-3 mt-sm-5 pt-3 fw-bold">
                        <span class="fw-bolder">Исходные диаграммы с группировкой</span>
                    </div>
                    <!--tabs-->
                    <div class="tabs row justify-content-center fw-bold mb-3">
                        <div class="col-auto mb-2">
                            <button data-tab="ish-rig" data-wrapper="tabs-wr-4"
                                class="btn btn-primary py-2 px-3 py-md-3 px-m-4 lh-1 text-center btn-tabs active">
                                Установка
                            </button>
                        </div>
                        <div class="col-auto mb-2">
                            <button data-tab="ish-input" data-wrapper="tabs-wr-4"
                                class="btn btn-primary py-2 px-3 py-md-3 px-m-4 lh-1 text-center btn-tabs">Оператор
                            </button>
                        </div>
                        <div class="col-auto mb-2">
                            <button data-tab="ish-engine" data-wrapper="tabs-wr-4"
                                class="btn btn-primary py-2 px-3 py-md-3 px-m-4 lh-1 text-center btn-tabs">ДВС
                            </button>
                        </div>
                        <div class="col-auto mb-2">
                            <button data-tab="ish-alarms" data-wrapper="tabs-wr-4"
                                class="btn btn-primary py-2 px-3 py-md-3 px-m-4 lh-1 text-center btn-tabs">Аварии
                            </button>
                        </div>
                    </div>
                    <section class="tabs-wrapper" id="tabs-wr-4">
                        <div id="ish-rig" class="tab-item active">
                            <div class="chart" id="48389">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48441">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48437">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48439">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48433">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48435">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48391">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48445">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48447">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48393">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48431">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                        </div>
                        <div id="ish-input" class="tab-item">
                            <div class="chart" id="48457">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48459">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48461">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48463">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48465">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                        </div>
                        <div id="ish-engine" class="tab-item">
                            <div class="chart" id="48397">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48405">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48403">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48424">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48443">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48415">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48414">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48395">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48399">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48425">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48401">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48428">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48426">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48427">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                        </div>
                        <div id="ish-alarms" class="tab-item">
                            <div class="chart" id="48408">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48409">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48416">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48417">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                            <div class="chart" id="48429">
                              <a href=""><img src="dist/img/loader.gif"></a>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </main>
    <script src="dist/js/jquery-3.7.1.min.js" type="text/javascript"></script>
    <script src="https://api-maps.yandex.ru/2.1/?apikey=f2a56c6c-f460-4ec0-89df-99063b786797&lang=ru_RU" type="text/javascript"></script>
    <!--<script src="dist/blazy/blazy.min.js" type="text/javascript"></script>-->
    <script src="dist/ZingChart/zingchart.min.js" type="text/javascript"></script>
    <script src="dist/air-datepicker/air-datepicker.js" type="text/javascript"></script>
    <script src="dist/fancybox/fancybox.umd.js" type="text/javascript"></script>
    <script src="dist/js/moment.js" type="text/javascript"></script>
    <script src="dist/js/moment-timezone-with-data.js" type="text/javascript"></script>
    <script src="dist/slick/slick.min.js" type="text/javascript"></script>
    <script src="dist/js/script.js?t=<?=time();?>" type="text/javascript"></script>
</body>
</html>