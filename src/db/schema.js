import {
  pgTable,
  serial,
  varchar,
  timestamp,
  text,
  integer
} from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm'

export const usersTable = pgTable('users', {
  id: serial().primaryKey(),
  name: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  avatar: varchar({ length: 255 }),
  createdAt: timestamp('created_at').defaultNow()
})

export const notesTable = pgTable('notes', {
  id: serial().primaryKey(),
  title: varchar({ length: 100 }).notNull(),
  content: text(),
  userId: integer('user_id').references(() => usersTable.id, {
    onDelete: 'cascade'
  }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow()
})

// 使用者的關聯，many 去定義一個使用者有多個筆記，一對多關係
export const usersRelations = relations(usersTable, ({ many }) => ({
  notes: many(notesTable)
}))
// 筆記的關聯，每個筆記屬於一個使用者，多對一關係
export const notesRelations = relations(notesTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [notesTable.userId], // 外鍵，FK
    references: [usersTable.id] // 參照的主鍵，PK
  })
}))
