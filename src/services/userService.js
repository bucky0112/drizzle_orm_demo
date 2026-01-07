import db from '../config/database.js'
import { usersTable } from '../db/schema.js'
import { eq } from 'drizzle-orm'

export const userService = {
  async findAll() {
    return await db.select().from(usersTable)
  },
  async create(data) {
    const res = await db.insert(usersTable).values(data).returning()
    return res
  },
  // 找單一筆user
  async findById(id) {
    const user = await db.select().from(usersTable).where(eq(usersTable.id, id))
    return user[0] || null
    // eq(要找的table 欄位, 特定的某一筆資料，例如說 id)
    // SELECT * FROM usersTable
    // WHERE usersTable.id = id
  },
  // 更新 user
  async update(id, data) {
    const result = await db
      .update(usersTable) // 更新哪一個table
      .set(data) // 傳入更新資料
      .where(eq(usersTable.id, id)) // 確定哪一筆
      .returning() // 回傳更新後的那一筆

    return result || null
    // UPDATE 哪一個table
    // SET 新資料
    // WHERE table的id = id
  },
  // 刪除 user
  async delete(id) {
    const result = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning()
    
    return result || null
  }
  // DELETE 哪一個table
  // WHERE table的id = id
}

// API 建立三步驟
// 1. 設定 service，透過 ORM 去操作資料庫
// 2. 設定 controller，讓 express 藉由 service 處理請求跟回應
// 3. 設定 router，建立 API URL，決定要用 get、post...

// CRUD
