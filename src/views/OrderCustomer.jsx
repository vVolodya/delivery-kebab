const React = require('react');

const Layout = require('./Layout');

module.exports = function OrderCustomer({ user }) {
  return (
    <Layout user={user}>
      <h2>
        Your orders
        {' '}
        {user.name}
      </h2>
      <div className="productDiv" />
      <div />
    </Layout>
  );
};
