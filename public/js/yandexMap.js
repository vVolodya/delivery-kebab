/* eslint-disable array-callback-return */

async function getAllDistance() {
  const fetchRes = await fetch('/finddadress');
  const result = await fetchRes.json();

  const { customerAddress, productAddress } = result;

  function getDistance(addressCustomer, locationCiruer) {
    ymaps.ready(() => {
      // Дождёмся загрузки API и готовности DOM.

      // Создание экземпляра карты и его привязка к контейнеру с
      // заданным id ("map").
      const myMap = new ymaps.Map('map', {
      // При инициализации карты обязательно нужно указать
      // её центр и коэффициент масштабирования.
        center: [55.76, 37.64], // Москва
        zoom: 10,
        controls: ['routePanelControl'],
      }, {
        searchControlProvider: 'yandex#search',
      });

      const control = myMap.controls.get('routePanelControl');
      const moscow = 'Москва';
      const multiRoutePromise = control.routePanel.getRouteAsync();

      control.routePanel.state.set({
        type: 'masstransit',
        fromEnabled: false,
        from: `${moscow}, ${addressCustomer}`,
        toEnabled: false,
        to: `${moscow}, ${locationCiruer}`,
      });

      control.routePanel.options.set({
        types: {
          masstransit: true,
        },
      });

      multiRoutePromise.then((multiRoute) => {
      // Подписка на событие обновления мультимаршрута.
        multiRoute.model.events.add('requestsuccess', async () => {
        // Получение ссылки на активный маршрут.
          const activeRoute = multiRoute.getActiveRoute();
          // Когда панель добавляется на карту, она
          // создает маршрут с изначально пустой геометрией.
          // Только когда пользователь выберет начальную и конечную точки,
          // маршрут будет перестроен с непустой геометрией.
          // Поэтому для избежания ошибки нужно добавить проверку,
          // что маршрут не пустой.
          if (activeRoute) {
          // Вывод информации об активном маршруте.
            // console.log(`Длина маршурта от ${addressCustomer} до ${locationCiruer}: ${activeRoute.properties.get('distance').text}`);
            // console.log(`Время прохождения: ${activeRoute.properties.get('duration').text}`);

            const distance = activeRoute.properties.get('distance');
            const time = activeRoute.properties.get('duration');
            const resultDistance = { distance, time };

            await fetch('/map', {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
              },
              body: JSON.stringify({ resultDistance }),
            });
          }
        });
      }, (err) => {
        console.log(err);
      });
    });
  }

  getDistance(customerAddress, productAddress);
}

getAllDistance();
