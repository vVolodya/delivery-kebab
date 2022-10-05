const React = require('react');
const { DateTime } = require('luxon');

const Layout = require('./Layout');

module.exports = function CourierProfile({ user, products }) {
  return (
    <Layout user={user}>

      <div className="d-flex flex-column justify-conten-center align-items-center w-50 mx-auto mt-5">
        <h2>{`Hello ${user.name}, these are your Kebabs`}</h2>
      </div>

      <section className="main-content">

        <div className="container">
          <div className="row">

            { products.length ? (
              products.map((product) => (
                <div data-id={product.id} key={product.id} id="product-container" className="col-sm-6 col-md-6 col-lg-4">
                  <div className="food-card">
                    <div className="food-card_img">
                      <img src={`/uploads/${product.picture_name}`} alt="Product" />
                    </div>
                    <div className="food-card_content">
                      <div className="d-flex flex-column justify-content-center align-items-center food-card_title-section">
                        <p className="food-card_title">{product.name}</p>
                        <p>{product.address}</p>
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
                          <a href={`/product/${product.id}`} className="edit-link text-reset text-decoration-none btn btn-primary">Edit</a>
                          <button className="deleteProductBtn btn btn-danger" type="submit">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : <div className="d-flex justify-content-center w-50 mx-auto"><h2>No kebabs yet :(</h2></div> }

          </div>
        </div>
      </section>
    </Layout>
  );
};
