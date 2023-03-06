
const Data = require('../models/data')
const MovieData = require('../models/movieData')
const User = require('../models/User')

var fs = require('fs');


var gern;
fs.readFile('datajs/genreList.json', 'utf8', function (err, data) {
    if (err) throw err;
    gern = JSON.parse(data);
});


const movieResult = (moviedatas,page, gern) => {
    const result = { results: [], page: page, totalPage: 0 }
    result.results = moviedatas.slice((result.page-1)*20, 20)
    result.totalPage = Math.floor((moviedatas.length) / 20 - 1)
    result.genre_name = gern
    return result
}


//Search movie 
const searchMovie = (data, key) => {
    return data.filter(x => x.original_title?.toLowerCase().search(key) > -1)

}

//Check video valid
const validVideo = (data) => {
    const result = data[0].videos.filter(x => x.official = true && x.site === 'YouTube' && (x.Trailer !== null || x.Teaser !== null))
    result.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.published_at) - new Date(a.published_at);
    });
    return result
}

class MovieController {
    //[GET] movie/
    movie(req, res, next) {
        User.find({}).then(data => {
            // if (!data) res.status(500).send("Not found keyword parram");
            // var results = validVideo(data)
            res.send(data);
        }).catch(next)
    }

    //[GET] movies/trending
    trending(req, res, next) {
        MovieData.find({}).then(data => {

            //Sort popularity
            const moviePopularity = data.sort((a, b) => b.popularity - a.popularity);
            res.send(movieResult(moviePopularity, req.query.page))
        }).catch(next)
    }

    //[GET] movies/top-rate
    topRate(req, res, next) {
        MovieData.find({}).then(data => {

            //Sort vote_average
            const movieTopRate = data.sort((a, b) => b.vote_average - a.vote_average);
            res.send(movieResult(movieTopRate,req.query.page))
        }).catch(next)
    }

    //[GET] movies/discovery
    discovery(req, res, next) {
        // res.send(req.query.with_genres);
        if (!req.query.with_genres) {
            return res.status(400).send("Not found gerne parram");
        }

        const gernReq = gern.find(x => req.query.with_genres == x.id)
        if (!gernReq) {
            return res.status(400).send("Not found that gerne id");
        }

        var genre = { genre_ids: 0 }
        genre.genre_ids = gernReq.id

        //Find Moviegenre
        MovieData.find(genre).then(data => {
            res.send(movieResult(data,req.query.page ,gernReq.name))
        }).catch(next)


    }

    //[POST] movies/search
    search(req, res, next) {
        // res.status(500).send("Oh uh, something went wrong");


        var keyword = req.query.keyword
        // res.send(req.query)

        MovieData.find({}).then(data => {
            var result = searchMovie(data, keyword)
            res.send(movieResult(result));
        }).catch(next)
    }


    //[POST] movies/video
    video(req, res, next) {

        
        var film_id = req.query.keyword

        if (!film_id) {
            return res.status(400).send("Not found film_id parram");
        }

        Data.find(film_id).then(data => {
            if (!data) {
                return res.status(500).send("Not found video")
            };
            var results = validVideo(data)
            res.send(results);
        }).catch(next)
    }

}

module.exports = new MovieController