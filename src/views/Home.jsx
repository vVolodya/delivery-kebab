const React = require('react');
const { DateTime } = require('luxon');

const Layout = require('./Layout');

module.exports = function Home({ user, products }) {
  return (
    <Layout user={user}>
      <script defer src='/js/order.js'></script>
      <h1 className="mx-auto mt-4">Kebab</h1>

      <section className="main-content">

        <div className="container">
          <div className="row productContainer">

            { products.length ? (
              products.map((product) => (
                <div key={product.id}  className="col-sm-6 col-md-6 col-lg-4">
                  <div className="food-card">
                    <div className="food-card_img">
                      <img src={`/uploads/${product.picture_name}`} alt="Product" />
                    </div>
                    <div className="food-card_content">
                      <div className="food-card_title-section">
                        <p href="#!" className="food-card_title">{product.name}</p>
                        <p>
                          Courier -
                          {' '}
                          <a href={`/courier/${product['User.id']}`} className="food-card_author">{product['User.name']}</a>
                        </p>
                        <p className="mb-4">
                          Created at
                          {' '}
                          {DateTime.fromISO(product.createdAt.toISOString()).toFormat('ff')}
                        </p>
                      </div>
                      <div className="food-card_bottom-section">
                        <hr />
                        <div className="space-between">
                          <div className="food-card_price">
                            <span><s>{product.price}</s></span>
                          </div>
                          <div className="food-card_price">
                            <span>
                              {`${product.price - (product.price * (product.discount / 100))} RUB`}
                            </span>
                          </div>
                          <button className="btn btn-primary" data-productid={product.id} data-userid={user.id} type="submit">Buy</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : null }

          </div>
        </div>
      </section>

    </Layout>
  );
};
