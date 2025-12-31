import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './drizzle', // 輸出 migration
  schema: './src/db/schema.js', // schema 的檔案路徑
  dialect: 'postgresql', // 決定使用哪個資料庫
  dbCredentials: {
    url: process.env.DATABASE_URL
  }// 資料庫連線設定
})