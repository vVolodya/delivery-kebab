const React = require('react');

const Layout = require('../Layout');

module.exports = function NewOrder({ user }) {
  return (
    <Layout user={user}>

      <div className="page-content">
        <div className="form-v6-content">
          <div className="form-left">
            <img src="/images/food-form.jpg" style={{ width: 480, height: 635, frameBorder: 0 }} alt="form" />
          </div>
          <form className="form-detail" action="/product/new" method="POST" encType="multipart/form-data">
            <h2>Add New Kebab</h2>
            <div className="form-row">
              <input name="name" type="text" className="input-text" placeholder="Product Name" required />
            </div>
            <div className="form-row">
              <input type="text" name="address" className="input-text" placeholder="Address" required />
            </div>
            <div className="form-row">
              <input type="number" name="price" className="input-text" placeholder="Price - RUB" required />
            </div>
            <div className="form-row">
              <input type="number" name="discount" min="5" max="50" className="input-text" placeholder="Discount" required />
            </div>
            <div className="form-row">
              <input name="image" className="input-text" type="file" id="formFile" required />
            </div>
            <div className="form-row-last">
              <input type="submit" className="register" value="Add" />
            </div>
          </form>
        </div>
      </div>

    </Layout>
  );
};
