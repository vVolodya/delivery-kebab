const router = require('express').Router();

const { renderMap } = require('../controllers/mapContollers');

router.get('/', renderMap);

// ymaps.ready(() => {
//   // Создание экземпляра карты и его привязка к контейнеру с
//   // заданным id ("map").
//   const myMap = new ymaps.Map('map', {
//     // При инициализации карты обязательно нужно указать
//     // её центр и коэффициент масштабирования.
//     center: [55.76, 37.64], // Москва
//     zoom: 10,
//     controls: ['routePanelControl'],
//   }, {
//     searchControlProvider: 'yandex#search',
//   });

//   const control = myMap.controls.get('routePanelControl');
//   const moscow = 'Москва';
//   const multiRoutePromise = control.routePanel.getRouteAsync();

//   control.routePanel.state.set({
//     type: 'masstransit',
//     fromEnabled: false,
//     from: `${moscow}, шоссе Энтузиастов, 1`,
//     toEnabled: true,
//     to: `${moscow}, шоссе Энтузиастов, 52`,
//   });

//   multiRoutePromise.then((multiRoute) => {
//     // Подписка на событие обновления мультимаршрута.
//     multiRoute.model.events.add('requestsuccess', () => {
//       // Получение ссылки на активный маршрут.
//       const activeRoute = multiRoute.getActiveRoute();
//       // Когда панель добавляется на карту, она
//       // создает маршрут с изначально пустой геометрией.
//       // Только когда пользователь выберет начальную и конечную точки,
//       // маршрут будет перестроен с непустой геометрией.
//       // Поэтому для избежания ошибки нужно добавить проверку,
//       // что маршрут не пустой.
//       if (activeRoute) {
//         // Вывод информации об активном маршруте.
//         console.log(`Длина: ${activeRoute.properties.get('distance').text}`);
//         console.log(`Время прохождения: ${activeRoute.properties.get('duration').text}`);
//       }
//     });
//   }, (err) => {
//     console.log(err);
//   });
// });

module.exports = router;
