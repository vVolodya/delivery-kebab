const React = require('react');

const Layout = require('./Layout');

module.exports = function CourierProfile({ user, products }) {
  return (
    <Layout user={user}>
      <h1>{`Hello ${user.name}, this is your profile`}</h1>
      <h2>Here you can see the list of your products</h2>

      <section className="main-content">

        <div className="container">
          <div className="row">

            { products.length ? (
              products.map((product) => (
                <div key={product.id} className="col-sm-6 col-md-6 col-lg-4">
                  <div className="food-card">
                    <div className="food-card_img">
                      <img src={`/uploads/${product.picture_name}`} alt="Product" />
                    </div>
                    <div className="food-card_content">
                      <div className="food-card_title-section">
                        <p href="#!" className="food-card_title">{product.name}</p>
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
                          <button className="btn btn-primary" type="submit">Edit</button>
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
