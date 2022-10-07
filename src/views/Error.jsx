const React = require('react');
const Layout = require('./Layout');

module.exports = function Error({ errorDetails, user }) {
  return (
    <Layout user={user}>
      <div className="w-50 mx-auto mt-5 d-flex flex-column align-items-center">
        <h1>{errorDetails.message}</h1>
        <h2>{errorDetails.status}</h2>
        { errorDetails.stackHighlited ? (
          <pre
            className="error"
        // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: errorDetails.stackHighlited }}
          />
        ) : null }
        <iframe title="Sorry" src="https://giphy.com/embed/3o7aD4XavHnL5UsWEE" style={{ width: 480, height: 384, frameBorder: 0 }} frameBorder="0" className="giphy-embed" allowFullScreen />
      </div>
    </Layout>
  );
};
