require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const path = require("path");
const authentication = require("./routes/authentication");
const renderTemplate = require("./lib/renderTemplate");
const Home = require("./views/Home");
const { User } = require("./db/models");

const FileStore = require("session-file-store")(session);

const PORT = process.env.PORT || 3000;
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

const sessionConfig = {
  name: "kebab",
  store: new FileStore(),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10,
    httpOnly: true,
  },
};

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));

app.use("/", authentication);

app.get("/", async (req, res) => {
  // Достаем из сессии нашего пользователя, если он есть
  // user is either NULL or UNDEFINED or the userName of the currently signed in user
  const user = req.session?.userId
    ? await User.findOne({ where: { id: req.session?.userId } })
    : null;
  renderTemplate(Home, { user }, res);
});

app.listen(PORT, () => console.log(`Сервер поднят на ${PORT} порту!`));
