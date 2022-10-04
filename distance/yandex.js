// Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init () {
    // Создание экземпляра карты и его привязка к контейнеру с
    // заданным id ("map").
   let myMap = new ymaps.Map('map', {
        // При инициализации карты обязательно нужно указать
        // её центр и коэффициент масштабирования.
        center: [55.76, 37.64], // Москва
        zoom: 10,
        controls: ['routePanelControl']
    }, {
        searchControlProvider: 'yandex#search'
    });
    
    let control = myMap.controls.get('routePanelControl');
    let moscow = 'Москва';
    let multiRoutePromise = control.routePanel.getRouteAsync();
    
    control.routePanel.state.set({
        type: 'masstransit', 
        fromEnabled: false,
        from: `${moscow}, шоссе Энтузиастов, 1`,
        toEnabled: true,
        to: `${moscow}, шоссе Энтузиастов, 52`,
    })

    multiRoutePromise.then(function(multiRoute) {
        // Подписка на событие обновления мультимаршрута.
        multiRoute.model.events.add('requestsuccess', function() {
            // Получение ссылки на активный маршрут.
            let activeRoute = multiRoute.getActiveRoute();
            // Когда панель добавляется на карту, она
            // создает маршрут с изначально пустой геометрией. 
            // Только когда пользователь выберет начальную и конечную точки,
            // маршрут будет перестроен с непустой геометрией.
            // Поэтому для избежания ошибки нужно добавить проверку,
            // что маршрут не пустой.
            if (activeRoute) {
                // Вывод информации об активном маршруте.
                console.log("Длина: " + activeRoute.properties.get("distance").text);
                console.log("Время прохождения: " + activeRoute.properties.get("duration").text);
            }
        });
    }, function (err) {
      console.log(err); 
    });
}
 