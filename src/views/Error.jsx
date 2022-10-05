const React = require('react');
const Layout = require('./Layout');

module.exports = function Error({ errorDetails, user }) {
  return (
    <Layout user={user}>
      <h1>{errorDetails.message}</h1>
      <h2>{errorDetails.status}</h2>
      { errorDetails.stackHighlited ? (
        <pre
          className="error"
        // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: errorDetails.stackHighlited }}
        />
      ) : null }
    </Layout>
  );
};
