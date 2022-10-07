const express = require('express');
const app = express();
const morgan = require('morgan');
// const cors = require('cors');  //  npm install cors
const fetch = require('cross-fetch');  // npm install --save cross-fetch

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


let url = 'https://www.rasstoyanie.com/route.json?stops=Vladivostok|Tokyo';

const getDistance = async (url) => {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data.distance);
    return data.distance;
  }

  console.log(getDistance(url));


// module.exports = getDistance;