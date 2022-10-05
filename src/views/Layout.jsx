/* eslint-disable no-nested-ternary */
const React = require('react');

module.exports = function Layout({ user, children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Delivery-Kebab</title>
        <link rel="stylesheet" href="/css/normalize.css" />
        <link rel="icon" type="image/png" href="css/favicon.ico" />
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

          <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
              <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                <ul className="navbar-nav d-flex flex-col align-items-center">
                  <a className="navbar-brand" href="/">
                    <img src="/uploads/Logo.png" width="90" height="90" alt="Logo" />
                  </a>
                  { user ? (
                    user.role === 'courier' ? (
                      <>
                        <li className="nav-item h4">
                          <a className="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item h4">
                          <a className="nav-link" aria-current="page" href="/product/new">New Kebab</a>
                        </li>
                        <li className="nav-item h4">
                          <a className="nav-link" aria-current="page" href="/profile">Profile</a>
                        </li>
                        <li className="nav-item h4">
                          <a className="nav-link" aria-current="page" href="/logout">Logout</a>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="nav-item h4">
                          <a className="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item h4">
                          <a className="nav-link" aria-current="page" href="/orders">Your orders</a>
                        </li>
                        <li className="nav-item h4">
                          <a className="nav-link" aria-current="page" href="/logout">Logout</a>
                        </li>
                      </>
                    )
                  ) : (
                    <>
                      <li className="nav-item h4">
                        <a className="nav-link" href="/register">
                          Register
                        </a>
                      </li>
                      <li className="nav-item h4">
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
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-u1OknCvxWvY5kfmNBILK2hRnQC3Pr17a+RTT6rIHI7NnikvbZlHgTPOOmMi466C8"
          crossOrigin="anonymous"
        />
        <script src="/js/application.js" />
      </body>
    </html>
  );
};
