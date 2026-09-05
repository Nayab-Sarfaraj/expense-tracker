import { neon } from '@neondatabase/serverless';
import dotenv from "dotenv"
dotenv.config()
console.log(process.env.DB_URL)
const sql = neon(process.env.DB_URL, { ssl: "require" });

export default sql