require('../modells/db')
const Movie= require('../modells/movie')

exports.listMovies= async(req, res)=> {
    let count= req.body.count;
    let pageNum= req.body.pageNum;
    let movies= await Movie.find({}).skip(count*pageNum).limit(count)
    res.status(200)
    let response = {}
    response.success = true;
    response.message = `Movies List Success`;
    response.result = movies
    res.send(response)
}

exports.insertMovie= async(req, res)=> {
    let newMovie= new Movie(
        {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category
        }
    );
    await newMovie.save();
    res.status(200)
    let response = {}
    response.success = true;
    response.message = `insert movie Success`;
    response.result = newMovie
    res.send(response)
}
exports.updateSingleMovie= async(req, res)=> {
    let updateMovie= await Movie.updateOne(
        {_id: req.body.id},
        {
            name: req.body.name,
            description: req.body.description,
            category: req.body.category
        },
        {multi: true}
    );
    res.status(200)
    let response = {}
    response.success = true;
    response.message = `update movie Success`;
    response.result = updateMovie
    res.send(response)
}
exports.deleteSingleMovie= async(req, res)=> {
    let deleteMovie= await Movie.findOneAndDelete(
        {_id: req.body.id}
    );
    res.status(200)
    let response = {}
    response.success = true;
    response.message = `delete movie Success`;
    response.result = deleteMovie
    res.send(response)
}




