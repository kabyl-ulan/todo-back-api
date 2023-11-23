// Подключение библиотек Express и body-parser для работы с HTTP-запросами и данными в формате JSON
const express = require("express");
const bodyParser = require("body-parser");
const app = express(); // Создание экземпляра приложения Express
const port = 5000; // Указание порта, на котором будет работать сервер

// Подключение модуля queries.js, содержащего функции для работы с базой данных
const db = require("./queries");

// Использование body-parser для обработки данных в формате JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Обработка GET-запроса по корневому пути
app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, Postgres API" });
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

// Запуск сервера на указанном порту
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
