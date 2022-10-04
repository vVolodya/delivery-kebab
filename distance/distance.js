const express = require('express');
const app = express();
const morgan = require('morgan');
// const cors = require('cors');  //  npm install cors
const fetch = require('cross-fetch');  // npm install --save cross-fetch

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


let url = 'https://www.rasstoyanie.com/route.json?stops=Vladivostok|Tokyo'

const getDistance = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data.distance);
    return data.distance;
  }

  console.log(getDistance(url));



app.listen(3005,  async () => {
    try {
        // await sequelize.authenticate();
        // console.log('Соедение с бд установлено');
        console.log(`Сервак запущен на 3005 порту`);
    } catch (error) {
        console.log('Сервак или база легли...', error);
    }
});


module.exports = getDistance