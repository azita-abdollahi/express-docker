const express= require("express")
const router= express.Router()
const movieRouter= require('../controllers/movieController')
router.get("/api/movies/", movieRouter.listMovies)
router.post("/api/movies", movieRouter.insertMovie)
router.post("/api/update", movieRouter.updateSingleMovie)
router.post("/api/delete", movieRouter.deleteSingleMovie)
module.exports = router