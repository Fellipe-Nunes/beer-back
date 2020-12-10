const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const Cerveja = require('../../models/produto')
const auth = require('../../middleaware/auth')

router.get('/', auth, async (req, res, next) => {
  try {
    const cerveja = await Cerveja.find({})

    if (cerveja) {
      res.json(cerveja)
    } else {
      res.status(404).send({ "error": "Product not found" })
    }

  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server error" })
  }
})

router.post('/', [
  check('serial').not().isEmpty(),
  check('fabricante').not().isEmpty(),
  check('nacionalidade').not().isEmpty(),
  check('tipo').not().isEmpty(),
  check('teor').not().isEmpty(),
  check('ibu').not().isEmpty()

], auth, async (req, res, next) => {
  try {
    let { serial, fabricante, nacionalidade, tipo, teor, ibu } = req.body

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    } else {
      let cerveja = new Cerveja({ serial, fabricante, nacionalidade, tipo, teor, ibu })

      await cerveja.save()

      if (cerveja.id) {
        res.json(cerveja)
      }
    }
  } catch (err) {
    console.log(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})

router.patch('/:serial', [], auth, async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).send({ errors: errors.array() })
      return
    }
    const serial = req.params.serial

    let bodyRequest = req.body

    console.log(bodyRequest)
    const update = { $set: bodyRequest }
    const cerveja = await Cerveja.findOneAndUpdate({ serial: serial }, update, { new: true })
    if (cerveja) {
      res.send(cerveja)
    } else {
      res.status(404).send({ error: "Product doesn't exist" })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})

router.delete('/:serial', [], auth, async (req, res, next) => {
  try {
    let serial = serial.params["serial"]
    const cerveja = await Cerveja.findOneAndDelete({ serial: serial })
    if (cerveja) {
      res.send(cerveja)
    } else {
      res.status(404).send({ "error": "Serial not found" })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send({ "error": "Server Error" })
  }
})

module.exports = router;