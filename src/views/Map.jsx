const React = require('react');

const Layout = require('./Layout');

module.exports = function Map({ user }) {
  return (
    <Layout user={user}>
      <div id="map" style={{ width: '800px', height: '600px' }} />
    </Layout>
  );
};
