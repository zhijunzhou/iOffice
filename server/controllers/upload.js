const multer = require('koa-multer')
const path = require('path')
const crypto = require('crypto')

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

const uploadSetting = multer({ storage: storage })

const upload = async (ctx, next) => {
  ctx.body = ctx.req.file
  return next()
}

export default {
  upload,
  uploadSetting
}