import db from '../config/database.js'
import { usersTable } from '../db/schema.js'

export const userService = {
  async findAll () {
    return await db.select().from(usersTable)
  },
  async create (data) {
    const res = await db.insert(usersTable).values(data).returning()
    return res
  }
}