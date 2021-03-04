const db = require('../models')
const Like = db.Like
const helper = require('../_helpers')

const likeService = {
  addLike: (req, res, callback) => {
    const user = helper.getUser(req)
    Like.findOrCreate({
      where: { TweetId: req.params.id },
      defaults: {
        UserId: user.id,
        TweetId: req.params.id
      }
    }).then(() => {
      callback({ status: 'success', message: '' })
    })
  },
  removeLike: (req, res, callback) => { }
}

module.exports = likeService