// CREATE TABLE users(
//   uuid serial PRIMARY KEY,
//   full_name varchar (32) NOT NULL,
//   username varchar (32) NOT NULL,
//   email varchar (32) NOT NULL,
//   password varchar (255),
//   UNIQUE(username)
// );

const db = require('../models/EntryModel.js');

const LoginController = {};

LoginController.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    if (!username || !password)
      res.json({ error: 'Missing Username or Password' });

    const queryString = `SELECT * FROM users WHERE username = '${username}'`;
    const response = await db.query(queryString);

    if (response.rows.length === 0)
      res.json({ error: 'No account with matching username found' });
    const user = response.rows[0];
    if (user.password === password) {
      res.locals.user_id = user.uuid;
      return next();
    } else {
      res.json({ error: 'Password does not match' });
    }
    return next();
  } catch (err) {
    return next({
      log: 'LoginController.login: Error querying database',
      status: 500,
      message: { err: 'LoginController.login: Error querying database' },
    });
  }
};

LoginController.createUser = async (req, res, next) => {
  try {
    const { username, password, full_name, email } = req.body;
    if (!(username && password && full_name && email))
      res.json({ error: 'Missing required field' });
    const queryString =
      'INSERT INTO users (username, password, full_name, email) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [username, password, full_name, email];
    const response = await db.query(queryString);
    const user = response.rows[0];
    console.log(user);
    res.locals.user_id = user.uuid;
    return next();
  } catch (error) {
    return next({
      log: `LoginController.createUser error: ${error}`,
      status: 500,
      message: { err: 'Failed to create user' },
    });
  }
};
