const React = require("react");

module.exports = function Layout({ user, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>JS Racer</title>
        <link rel="stylesheet" href="/css/normalize.css"></link>
        <link rel="stylesheet" href="/css/application.css"></link>
      </head>
      <body>
        <header>
          <h2>Kebab</h2>
          <nav>
            {user ? (
              <div>
                <span>Hello {user.name}</span>
                <a href="/logout">Logout</a>
              </div>
            ) : (
              <div>
                <a href="/register">Register</a>
                <a href="/login">Login</a>
              </div>
            )}
          </nav>
        </header>
        <main>{children}</main>
        <script src="/js/application.js"></script>
      </body>
    </html>
  );
};
