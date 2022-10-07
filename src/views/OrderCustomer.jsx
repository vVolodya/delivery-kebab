const React = require('react');

const Layout = require('./Layout');

module.exports = function OrderCustomer({ user, orders }) {
  return (
    <Layout user={user}>
      <script defer src="/js/orders.js" />

      <div className="d-flex justify-content-center mt-5">
        {' '}
        <h2>
          Your orders,
          {' '}
          {user.name}
        </h2>
      </div>

      <section className="main-content">

        <div className="container">
          <div className="row productContainer">

            { orders.length ? (
              orders.map((order) => (
                <div key={order.id} id="product-container" className="col-sm-6 col-md-6 col-lg-4">
                  <div className="food-card">
                    <div className="food-card_img">
                      <img src={`/uploads/${order['Product.picture_name']}`} alt="Product" />
                    </div>
                    <div className="food-card_content">
                      <div className="d-flex flex-column justify-content-center align-items-center food-card_title-section">
                        <p className="food-card_title">{order['Product.name']}</p>
                        <p className="text-primary h5">Courier will contact you soon</p>
                        <p className="text-primary h5">Check your Email</p>
                        <p className="text-primary h5">Wait for delivery</p>
                      </div>
                      <div className="food-card_bottom-section">
                        <hr />
                        <div className="space-between align-items-center">
                          <div className="food-card_price">
                            <span>
                              {`${order['Product.price'] - (order['Product.price'] * (order['Product.discount'] / 100))} RUB`}
                            </span>
                          </div>
                          <button data-orderId={order.id} data-productId={order['Product.id']} className="deliveredBtn btn btn-success" type="submit">Delivered</button>
                          <button data-orderId={order.id} data-productId={order['Product.id']} className="removeOrderBtn btn btn-danger" type="submit">Refuse</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : <div className="d-flex justify-content-center w-50 mx-auto"><h2>No orders yet :(</h2></div> }

          </div>
        </div>
      </section>

      {/* <div className="">
        <div>
          <span>
            Цена без скидки
            <s>
              {products.reduce((acc, product) => acc + product['Product.price'], 0)}
              {' '}
            </s>
            RUB
          </span>
        </div>
        <div>
          Цена со скидкой
          {products.reduce((acc, product) => acc + product['Product.price'] - (product['Product.price'] * (product['Product.discount'] / 100)), 0)}
        </div>
        <div>
          <button type="button" className="btn btn-primary">Купить</button>
        </div>
      </div> */}

    </Layout>
  );
};
