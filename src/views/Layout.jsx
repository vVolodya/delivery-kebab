const React = require('react');

module.exports = function Layout({ user, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Kebab</title>
        <link rel="stylesheet" href="/css/normalize.css" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="/css/application.css" />
      </head>
      <body>
        <header>
          <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="/">
                Kebab
              </a>
              <div className="collapse navbar-collapse" id="navbarNav">
                {user ? (
                  <span className="navbar-text">
                    Hello
                    {' '}
                    {user.name}
                  </span>
                ) : null}
                <ul className="navbar-nav">
                  {user ? (
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="/logout"
                      >
                        Logout
                      </a>
                    </li>
                  ) : (
                    <>
                      <li className="nav-item">
                        <a className="nav-link" href="/register">
                          Register
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="/login">
                          Login
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8"
          crossOrigin="anonymous"
        />
        <script src="/js/application.js" />
      </body>
    </html>
  );
};
