const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('ok')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get("/test", function (req, res) {
    res.send({status:200, message:"ok"})
    res.status(200).send('ok');
})
app.get('/time',function(req,res){
   var d= new Date();
    var h = d.getHours();
    var m = d.getMinutes();
    var x = h >= 12 ? 'pm' : 'am';
    h = h % 12;
    h = h ? h : 12;
    m = m < 10 ? '0'+m: m;
    var time= h + ':' + m + ' ' + x;

    res.send('{status:200, message:'+time+'}');
    res.status(200).send(time);
});
 app.get("/hello",function(req,res){
    res.status(200).send("Hello");
});
app.get("/hello/:id",function(req,res){
    res.status(200).send("Hello, "+req.params.id);
});
app.get('/search',function(req,res){
    if(req.query.s==""){
        res.status(500).send("error:true, you have to provide a search");
    }
    else{
        res.status(200).send("ok, data:"+req.query.s);

    }
}); 

app.get('/movies/read',function(req,res){
    res.send({status:200, data:movies})

});

app.get('/', (req, res) => {
  res.send('ok')
});
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    {title: 'Brazil', year: 1985, rating: 8 },
    {title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }

];
// sort
app.get('/movies/read/by-date', function (req, res){
    movies.sort(function(a,b){
        return a.year - b.year;
    });
    res.send(movies);
});
app.get('/movies/read/by-rating', function (req, res){
    movies.sort(function(a,b){
        return a.rating - b.rating;
    });
    res.send(movies);
});
app.get('/movies/read/by-title', function (req, res){
    movies.sort(function(a,b){
        return a.title.localeCompare(b.title);
    });
    res.send(movies);
});
  // readone
  app.get('/movies/read/id/:id',function(req,res){
    if(req.params.id<=0 || req.params.id>movies.length)
    res.status(404).send("error:true, message:the movie "+req.params.id+" does not exist");
    else
    res.send(movies[req.params.id-1]);

  });

// add


app.get('/movies/add', function (req,res){

    var t = req.query.title
    var y = req.query.year
    var r = req.query.rating
    if(t == undefined || y == undefined || y.length > 4 || isNaN(y)) {
        res.send({status:403, error:true, message:'you cannot create a movie without providing a title and a year'})
    }
    if (r == "") {
        r = 4                                                   
    }
    
    movies.push({title: t, year: y, rating: r})
        res.send({status:200, data:movies}) 
    
});
//delete

app.get('/movies/delete/:ID',(req,res) => {
    var d = req.params.ID
    if (d > 0 && d < movies.length ) {
        movies.splice(d-1, 1)
        res.send({status:200, message: movies})
    }
    else {
        res.send({status:404, error:true, message:'the movie <ID> does not exist'})
    }
    });   
    
    //update
    
    app.get('/movies/update/:ID',(req,res) => {
        let c = req.params.ID
        let x = req.query.title
        let y = req.query.year
        let z = req.query.rating
    
        function update(a, b) {
            if(a != undefined || a == "") {
                movies[c-1][b] = a
            }
        }
    
        if(c > 0 && c < movies.length ) {
            update(x, 'title')
            update(y, 'year')
            update(z, 'rating')
            res.send({status:200, message: movies})
        }
        else {
            res.send({status:404, error:true, message:'the movie <ID> does not exist'})
        }
    })
