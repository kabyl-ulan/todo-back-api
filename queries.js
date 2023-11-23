// Подключение библиотеки pg для работы с PostgreSQL
const Pool = require("pg").Pool;

// Создание экземпляра пула подключений к базе данных PostgreSQL
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "api",
  password: "postgres",
  port: 5432,
});

// Функция для выполнения запроса и получения всех пользователей из таблицы users
const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows);
  });
};

// Функция для выполнения запроса и получения пользователя по указанному идентификатору
const getUserById = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) throw error;
    response.status(200).json(results.rows);
  });
};

// Функция для выполнения запроса и создания нового пользователя в таблице users
const createUser = (request, response) => {
  const { name, email } = request.body;
  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email],
    (error, results) => {
      if (error) throw error;
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
};

// Функция для выполнения запроса и обновления данных пользователя в таблице users
const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;
  pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3",
    [name, email, id],
    (error, results) => {
      if (error) throw error;
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

// Функция для выполнения запроса и удаления пользователя из таблицы users
const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query("DELETE FROM users WHERE id = $1", [id], (error, results) => {
    if (error) throw error;
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

// Экспорт всех функций для использования в других модулях
module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
