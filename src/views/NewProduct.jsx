const React = require('react');

const Layout = require('./Layout');

module.exports = function NewOrder() {
  return (
    <Layout>

      <h2>New Order Page</h2>

      <form action="/new-product" method="POST" encType="multipart/form-data" className="w-25 p-3">

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Product Name</span>
          </div>
          <input name="name" type="text" className="form-control" placeholder="Name" aria-label="Name" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Address</span>
          </div>
          <input name="address" type="text" className="form-control" placeholder="Address" aria-label="Address" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Price (RUB)</span>
          </div>
          <input name="price" type="number" className="form-control" placeholder="Price" aria-label="Price" aria-describedby="basic-addon1" />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Discount (%)</span>
          </div>
          <input name="discount" type="number" min="5" max="50" className="form-control" placeholder="Discount" aria-label="Discount" aria-describedby="basic-addon1" />
        </div>

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">Choose pic</label>
          <input name="image" className="form-control" type="file" id="formFile" />
        </div>

        <button className="btn btn-primary" type="submit">Button</button>
      </form>

    </Layout>
  );
};
