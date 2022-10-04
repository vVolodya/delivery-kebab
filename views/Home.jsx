const React = require("react");
const Layout = require("./Layout");

module.exports = function Home({ user }) {
  return (
    <Layout user={user}>
      <h1>Kebab</h1>
    </Layout>
  );
};
