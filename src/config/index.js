if(process.env.NODE_ENV != 'production' && process.env.NODE_ENV != 'development') {
  console.log('NODE_ENV is not set to prod or dev. Setting it to dev');
  process.env.NODE_ENV = 'development';
}

require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const DB_UNIX_SOCKET = process.env.INSTANCE_UNIX_SOCKET;
const DB_CONNECTION_NAME = process.env.INSTANCE_CONNECTION_NAME;

module.exports = {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  DB_UNIX_SOCKET,
  DB_CONNECTION_NAME,
};
