const express = require('express')
const artistsController = require('../controllers/artistsController')

const router = express.Router()

router.get('/api/v1/artists', artistsController.getAllArtists)
router.post('/api/v1/artists', artistsController.saveArtist)
router.put('/api/v1/artists/:id', artistsController.updateArtist)
router.delete('/api/v1/artists/:id', artistsController.removeArtist)

module.exports = router
