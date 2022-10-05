const React = require('react');

const Layout = require('../Layout');

module.exports = function EditProduct({ user, product }) {
  return (
    <Layout user={user}>
      <div className="d-flex flex-column align-items-center mt-5">
        <h2>Edit Your Kebab</h2>

        <form id="editKebabForm" data-id={product.id} action={`/product/${product.id}`} method="POST" encType="multipart/form-data" className="w-25 p-3">

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Product Name</span>
            </div>
            <input name="name" type="text" value={product.name} className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" required />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Address</span>
            </div>
            <input name="address" type="text" value={product.address} className="form-control" placeholder="Address" aria-label="Address" aria-describedby="basic-addon1" required />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Price (RUB)</span>
            </div>
            <input name="price" type="number" value={product.price} className="form-control" placeholder="Price" aria-label="Price" aria-describedby="basic-addon1" required />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">Discount (%)</span>
            </div>
            <input name="discount" type="number" min="5" max="50" value={product.discount} className="form-control" placeholder="Discount" aria-label="Discount" aria-describedby="basic-addon1" required />
          </div>

          <div className="mb-3">
            <label htmlFor="formFile" className="form-label">Choose pic</label>
            <input name="image" className="form-control" type="file" id="formFile" required />
          </div>

          <button className="btn btn-primary" type="submit">Edit</button>
        </form>
      </div>

    </Layout>
  );
};
