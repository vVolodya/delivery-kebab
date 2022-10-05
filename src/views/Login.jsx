const React = require('react');
const Layout = require('./Layout');

module.exports = function Login({ messages }) {
  return (
    <Layout>
      <h1>Login</h1>
      {messages
        ? (
          <div className="alert alert-danger" role="alert">
            {messages.split(',').map((message) => <span className="error-message">{message}</span>)}
          </div>
        )
        : null}
      <form method="POST" action="/login" encType="multipart/form-data" className="w-25 p-3">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="login-email">Email address</span>
          </div>
          <input type="email" name="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="login-email" />
        </div>

        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="login-password">Password</span>
          </div>
          <input type="password" name="password" className="form-control" placeholder="Password" aria-label="Password" aria-describedby="login-password" />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </Layout>
  );
};
