const React = require('react');
const { DateTime } = require('luxon');

const Layout = require('./Layout');

module.exports = function Order({ user, product, distanceData }) {
  return (
    <Layout user={user}>

      <div className="container w-50 mx-auto mt-5">
        <h1 className="text-center">{`Additional info about ${product.name}`}</h1>
      </div>

      <div className="d-flex justify-content-center">

        <div id="map" className="mt-5 border border-primary rounded-3" style={{ width: '600px', height: '600px' }}>
          <script defer src="https://api-maps.yandex.ru/2.1/?apikey=16ae44fe-6ff1-4dee-84fe-86c6dbed24d3&lang=ru_RU" type="text/javascript" />
          <script defer src="/js/yandexMap.js" />
          <script defer src="/js/additionalInfo.js" />
        </div>

        <div className="addInfoContainer card mt-5 ml-5">
          <img className="card-img-top" src={`/uploads/${product.picture_name}`} alt="Product" />

          <div className="card-body">
            <h4 className="card-title">{product.name}</h4>
            <p className="card-text">
              Address -
              {' '}
              {product.address}
            </p>
          </div>

          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Courier -
              {' '}
              {product['User.name']}
            </li>
            <li className="list-group-item">
              {' '}
              Created at
              {' '}
              {DateTime.fromISO(product.createdAt.toISOString()).toFormat('ff')}
            </li>
            <li className="list-group-item">
              Price w/o discount -
              {' '}
              <s>{`${product.price} RUB`}</s>
            </li>
            <li className="list-group-item">
              Discount Price -
              {' '}
              {`${product.price - (product.price * (product.discount / 100))} RUB`}
            </li>
          </ul>

          <div className="card-body">
            <button className="buyBtn btn btn-success" data-productid={product.id} data-userid={user.id} type="submit">Buy</button>
          </div>
        </div>
      </div>

      { !distanceData ? (
        <div className="d-flex flex-column align-items-center w-50 mx-auto mt-5">
          <h2 className="text-primary">You can click this button and get SUPER INFO (100$)</h2>
          <button type="button" className="reloadBtn btn btn-warning mt-2">CLICK!</button>
        </div>
      ) : null }

      <div className="w-25 mx-auto mt-5 mb-3">
        { distanceData ? (
          <ul className="list-group">
            <li className="list-group-item h4">
              <i className="fas fa-male text-info mx-2" />
              {`Distance - ${distanceData.distance.text}`}
            </li>
            <li className="list-group-item h4">
              <i className="fas fa-venus text-warning mx-2" />
              {`Time - ${distanceData.time.text}`}
            </li>
          </ul>
        ) : null}
      </div>

    </Layout>
  );
};
