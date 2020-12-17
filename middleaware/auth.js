const jwt = require('jsonwebtoken')
const config = require('config')
const map_routere = require('../services/map_router')

module.exports = function (req, res, next) {
  // Get token from header
  const secret = process.env.jwtSecret || config.get('jwtSecret')
  const token = req.header('x-auth-token')

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' })
  }

  try {
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' })
      }
      req.user = decoded.user
      /*map = map_router(req.baseUrl, decoded.user)
      console.log(map)
      if (map.status == 200) {
        console.log('se fudeu de novo')
        next()
      } else {
        return res.status(map.status).json({ msg: map.msg })
      }
    }) */

  } catch (err) {
    console.error('something wrong with auth middleaware')
    res.status(500).json({ msg: 'Server Error' })
  }
}
