const db = require('../../models')
const User = db.User
const bcrypt = require('bcryptjs')


const userController = {
  signUp: (req, res) => {
    if (req.body.checkPassword !== req.body.password) {
      return res.json({ status: 'error', message: 'Password is different' })
    } else {
      User.findOne({ where: { email: req.body.email } }).then(user => {
        if (user) {
          return res.json({ status: 'error', message: 'Email is already exists' })
        } else {
          User.create({
            account: req.body.account,
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
          }).then(user => {
            return res.json({ status: 'success', message: 'User was successfully registered' })
          })
        }
      })
    }
  },
  signIn: (req, res) => { },
  getUsers: (req, res) => { },
  getUser: (req, res) => { },
  getUserTweets: (req, res) => { },
  getUserReplies: (req, res) => { },
  getUserLikes: (req, res) => { },
  getFollowings: (req, res) => { },
  getFollowers: (req, res) => { },
  putUser: (req, res) => { },
  editUser: (req, res) => { }
}

module.exports = userController