var skvazhini = null;
ymaps.ready(initCluster);

function initCluster () {

    skvazhini = new ymaps.Map('map-skvazhini', {
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
        }),
        objectManager = new ymaps.ObjectManager({
            // Чтобы метки начали кластеризоваться, выставляем опцию.
            clusterize: true,
            // ObjectManager принимает те же опции, что и кластеризатор.
            gridSize: 32,
            clusterDisableClickZoom: true
        });
        
        // Чтобы задать опции одиночным объектам и кластерам,
        // обратимся к дочерним коллекциям ObjectManager.
        objectManager.objects.options.set('preset', 'islands#blueDotIcon');
        objectManager.clusters.options.set('preset', 'islands#blueClusterIcons');

        skvazhini.geoObjects.add(objectManager);
}