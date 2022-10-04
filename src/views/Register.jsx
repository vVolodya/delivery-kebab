const React = require('react');

const Layout = require('./Layout');

module.exports = function Register() {
  return (
    <Layout>
      <form method="POST">
        <div>
          <div>
            <input
              type="radio"
              id="customer"
              name="role"
              value="customer"
              defaultChecked
            />
            <label htmlFor="customer">Customer</label>
          </div>

          <div>
            <input type="radio" id="courier" name="role" value="courier" />
            <label htmlFor="courier">Courier</label>
          </div>
        </div>

        <div>
          <label>Name</label>
          <input name="name" />
        </div>
        <div>
          <label>Email address</label>
          <input name="email" type="email" />
        </div>
        <div>
          <label>Password</label>
          <input name="password" type="password" />
        </div>
        <div>
          <label>Address</label>
          <input name="address" />
        </div>

        <button type="submit">Register</button>
      </form>
    </Layout>
  );
};
