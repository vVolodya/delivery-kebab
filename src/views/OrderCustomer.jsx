const React = require('react');

const Layout = require('./Layout');

module.exports = function OrderCustomer({ user, products }) {
  return (
    <Layout user={user}>
      <div className="d-flex justify-content-center">
        {' '}
        <h2>
          Your orders,
          {' '}
          {user.name}
        </h2>

      </div>

      <div className="d-flex">
      <div className="">
        { products.length ? (
          products.map((product) => (
            <div key={product['Product.id']} className="">
              <div className="food-card">
                <div className="food-card_img">
                  <img src={`/uploads/${product['Product.picture_name']}`} alt="Product" />
                </div>
                <div className="food-card_content">
                  <div className="food-card_title-section">
                    <p className="food-card_title">{product['Product.name']}</p>
                  </div>
                  <div className="food-card_bottom-section">
                    <hr />
                    <div className="space-between">
                      <div className="food-card_price">
                        <span><s>{product['Product.price']}</s></span>
                      </div>
                      <div className="food-card_price">
                        <span>
                          {`${product['Product.price'] - (product['Product.price'] * (product['Product.discount'] / 100))} RUB`}
                        </span>
                      </div>
                      <button type="button" className="btn btn-warning">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))) : <div className="d-flex justify-content-center">No orders</div>}
      </div>

        <div className="">
          <div >
          <span>Цена без скидки<s>{products.reduce((acc, product)=> acc + product['Product.price'],0 )} </s>RUB</span>
          </div>
          <div>
            Цена со скидкой{products.reduce((acc, product)=> acc + product['Product.price'] - (product['Product.price'] * (product['Product.discount'] / 100)),0 )}
          </div>
          <div>
            <button type="button" class="btn btn-primary">Купить</button>
          </div>

        </div>
      </div>


    </Layout>
  );
};
