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
  }
}
