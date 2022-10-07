const React = require('react');
const { DateTime } = require('luxon');

const Layout = require('./Layout');

module.exports = function Home({ user, products }) {
  return (
    <Layout user={user}>
      <script defer src="/js/addOrder.js" />
      <link rel="stylesheet" href="/css/home.css" />
      <div className="pic mr-10">
        {/* <img src="https://media.baamboozle.com/uploads/images/259248/1616021001_154323.jpeg" style={{ width: '320px', height: '240px' }} alt="Soldatkin" /> */}

        <section className="main-content">

          <div className="d-flex flex-column justify-conten-center align-items-center w-50 mx-auto ">
            <h1 className="mx-auto">All Kebabs</h1>
          </div>

          <div className="container">
            <div className="row productContainer">

              { products.length ? (
                products.map((product) => (
                  <div key={product.id} className="col-sm-6 col-md-6 col-lg-3">
                    <div className="food-card">
                      <div className="food-card_img">
                        <img src={`/uploads/${product.picture_name}`} alt="Product" />
                      </div>
                      <div className="food-card_content">
                        <div className="food-card_title-section">
                          <p className="food-card_title">{product.name}</p>
                          <p>
                            Address -
                            {' '}
                            {product.address}
                          </p>
                          <p>
                            Courier -
                            {' '}
                            {product['User.name']}
                          </p>
                          <p>
                            Created at
                            {' '}
                            {DateTime.fromISO(product.createdAt.toISOString()).toFormat('ff')}
                          </p>
                        </div>
                        <div className="food-card_bottom-section">
                          <hr />
                          <div className="space-between align-items-center">
                            <div className="food-card_price">
                              <span>
                                {`${product.price - (product.price * (product.discount / 100))} RUB`}
                              </span>
                            </div>

                            { (user && user.role) === 'customer'
                              ? (
                                <>

                                 
                                  <a href={`/order/info/${product.id}`} className="infoLink btn btn-warning">More</a>

                                  <button className="buyBtn btn btn-primary" data-productid={product.id} data-userid={user.id} type="submit">Buy</button>
                                </>
                              )
                              : null }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center w-50 mx-auto">
                  <h2>No kebabs yet :(</h2>
                  <iframe title="Sorry" src="https://giphy.com/embed/d2lcHJTG5Tscg" style={{ width: 480, height: 384, frameBorder: 0 }} frameBorder="0" className="giphy-embed" allowFullScreen />
                </div>
              )}
            </div>
            <div className="liveAlertPlaceholder d-flex flex-direction-column w-300" />
          </div>
        </section>
      </div>
    </Layout>
  );
};
