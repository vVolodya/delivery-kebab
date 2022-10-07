const React = require('react');

const Layout = require('./Layout');

module.exports = function Register({ messages }) {
  return (
    <Layout>
      <link rel="stylesheet" href="/css/regstration.css" />

      <h1>Register</h1>
      {messages
        ? (
          <div className="alert alert-danger" role="alert">
            {messages.split(',').map((message) => <span className="error-message">{message}</span>)}
          </div>
        )
        : null}
      <form method="POST" action="/register" encType="multipart/form-data" className="w-25 p-3">

          <div className="form-check">
            <input className="form-check-input" type="radio" name="role" id="customer" value="customer" />
            <label className="form-check-label" htmlFor="customer">
              Customer
            </label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="radio" name="role" id="courier" value="courier" defaultChecked />
            <label className="form-check-label" htmlFor="courier">
              Courier
            </label>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="register-name">Name</span>
            </div>
            <input type="text" name="name" className="form-control" placeholder="Name" aria-label="Name" aria-describedby="register-name" />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="register-email">Email address</span>
            </div>
            <input type="email" name="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="register-email" />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="register-password">Password</span>
            </div>
            <input type="password" name="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="register-password" />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="register-address">Address</span>
            </div>
            <input type="text" name="address" className="form-control" placeholder="Address" aria-label="Address" aria-describedby="register-address" />
          </div>
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    </Layout>
  );
};
