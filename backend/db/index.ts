import pg from "pg";
const { Pool } = pg;
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } = process.env;

const pool = new Pool({
  host: DB_HOST,
  user: DB_USER,
  port: Number(DB_PORT),
  password: DB_PASSWORD,
  database: DB_NAME,
  ssl: { rejectUnauthorized: false }, // Enable SSL
});

export default pool;
