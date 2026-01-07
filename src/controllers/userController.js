import { userService } from '../services/userService.js'

export const userController = {
  async getAll(req, res, next) {
    try {
      const users = await userService.findAll()
      res.json({ success: true, data: users })
    } catch (err) {
      console.error(err)
      next()
    }
  },
  async create(req, res, next) {
    try {
      const { name, email } = req.body

      if (!name || !email) {
        return res.status(400).json({ success: false, error: '有東西沒填' })
      }

      const newUser = await userService.create({ name, email })
      res.status(201).json({ success: true, data: newUser })
    } catch (err) {
      next(err)
    }
  },
  // /api/users/:id
  async getById(req, res, next) {
    try {
      const id = parseInt(req.params.id) // 傳進來的 ID
      const user = await userService.findById(id)

      if (!user) {
        return res.status(404).json({
          success: false,
          error: '找不到使用者'
        })
      }

      res.json({ success: true, data: user })
    } catch (err) {
      next(err)
    }
  },
  // PUT /api/users/:id
  async update(req, res, next) {
    try {
      const id = parseInt(req.params.id)
      const user = await userService.update(id, req.body)

      if (!user) {
        return res.status(404).json({
          success: false,
          error: '找不到使用者'
        })
      }

      res.json({ success: true, data: user })
    } catch (err) {
      next(err)
    }
  },
  // Delete /api/users/:id
  async delete(req, res, next) {
    try {
      const id = parseInt(req.params.id)
      const deletedUser = await userService.delete(id)

      console.log(deletedUser)

      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          error: '找不到使用者'
        })
      }

      res.json({ success: true, message: '已刪除成功' })
    } catch (err) {
      next(err)
    }
  }
}
