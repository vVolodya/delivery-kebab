const { renderTemplate } = require('../middlewares/helpers');

const Map = require('../views/Map');

exports.renderMap = (req, res) => {
  renderTemplate(Map, {}, res);
};
