const React = require('react');

const Layout = require('../Layout');

module.exports = function EditProduct({ user, product }) {
  return (
    <Layout user={user}>

      <div className="page-content">
        <div className="form-v6-content">
          <div className="form-left">
            <img src="/images/edit-form.jpg" style={{ width: 480, height: 635, frameBorder: 0 }} alt="form" />
          </div>
          <form className="form-detail" data-id={product.id} action={`/product/${product.id}`} method="POST" encType="multipart/form-data">
            <h2>Edit Your Kebab</h2>
            <div className="form-row">
              <input name="name" type="text" value={product.name} className="input-text" placeholder="Product Name" required />
            </div>
            <div className="form-row">
              <input type="text" name="address" value={product.address} className="input-text" placeholder="Address" required />
            </div>
            <div className="form-row">
              <input type="number" name="price" value={product.price} className="input-text" placeholder="Price - RUB" required />
            </div>
            <div className="form-row">
              <input type="number" name="discount" min="5" max="50" value={product.discount} className="input-text" placeholder="Discount" required />
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
