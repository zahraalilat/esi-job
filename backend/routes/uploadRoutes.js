const express = require('express')
const multer = require('multer')
const path = require('path')

const router = express.Router()

const maxSize = 10000

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const checkExt = (file, cb) => {
    const allowedExt = /jpg|jpeg|png/
    const extname = allowedExt.test(path.extname(file.originalname).toLowerCase())
    const mimeType = allowedExt.test(file.mimetype)

    if (extname && mimeType) {
        return cb(null, true)
    } else {
        cb('Only images are allowed')
    }
}

const upload = multer({
    storage,
    fileFilter: function(req, file, cb) {
        checkExt(file, cb)
    },
    limits: {
        maxSize,
    }
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(req.file.path)
})

module.exports = router