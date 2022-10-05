const React = require('react');

const Layout = require('./Layout');

module.exports = function Map({ user }) {
  return (
    <div id="map" style={{ width: '1280px', height: '800px' }}>
      <script defer src="https://api-maps.yandex.ru/2.1/?apikey=16ae44fe-6ff1-4dee-84fe-86c6dbed24d3&lang=ru_RU" type="text/javascript" />
      <script defer src="/js/yandexMap.js" />
    </div>

  );
};
