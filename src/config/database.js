import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'
import config from './index.js'
import * as schema from '../db/schema.js'

const { Pool } = pg
// 建立連線池
const pool = new Pool({
  connectionString: config.databaseUrl
})
// 建立 drizzle 服務端，傳入連線池跟schema
const db = drizzle(pool, { schema })

export default db