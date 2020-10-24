const express = require('express');
const app = express();
const bodyParser = require('body-parser');  
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.get("/test", function (req, res) {
    res.send({status:200, message:"ok"})
    res.status(200).send('ok');
})
var users = [
    {username:'mariam',password:'marian33'},
    {username:'malak',password:'22222'}
]
var user = [
    {username:'mariam',password:'marian33'}
]
var admins = [
    {username:'admin',password:'_strongpassword'}
]
var admin = [
    {username:'admin',password:'_strongpassword'}
]

function authenticate(){
    let i = 0;
    for(i=0;i<users.length;i++){
        if(user[0].username === users[i].username && user[0].password === users[i].password)
        break;
    }
    if(i==users.length)return false;return true;
}
function authenticateAdmin(){
    let i = 0;
    for(i=0;i<admins.length;i++){
        if(admin[0].username === admins[i].username && admin[0].password === admins[i].password)
        break;
    }
    if(i==users.length)return false;return true;
}
var connectionString = 'mongodb+srv://fahes:marian33@cluster0.omgli.mongodb.net/movies?retryWrites=true&w=majority';
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('movies');
    var quotesCollection = db.collection('movies');

    app.get('/test1', (req, res) => {
        quotesCollection.insertOne({ title: 'Jaws', year: 1975, rating: 8 })
          .then(result => {
            // console.log(result)
            res.send("ok");
          })
          .catch(error => console.error(error))
      })

 // add

 app.post('/movies/create',function(req,res){
    if(authenticate() || authenticateAdmin()){
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
        //res.send({status:200, data:movies}) 
     quotesCollection.insertOne({title: t, year: y, rating: r})
    .then(result => {
      console.log(result)
      })
     .catch(error => console.error(error))
     res.send(movies);
    }
  });

 //read
 app.get('/movies/read',function(req,res){  
    if(authenticate() || authenticateAdmin()){
 db.collection('movies').find().toArray()
.then(results => {
res.send(results)
})
.catch(/* ... */)}
});
//sort
app.get('/movies/read/by-date',function(req,res){
    db.collection('movies').find().toArray()
.then(results => {
res.send(results.sort(function(a,b){
    return a.year - b.year;
}))
})
.catch(/* ... */)
});
app.get('/movies/read/by-rating',function(req,res){
    db.collection('movies').find().toArray()
.then(results => {
res.send(results.sort(function(a,b){
    return a.rating - b.rating;
}))
})
.catch(/* ... */)
});
app.get('/movies/read/by-title',function(req,res){
    db.collection('movies').find().toArray()
.then(results => {
res.send(results.sort(function(a,b){
    return a.title.localeCompare(b.title);
}))
})
.catch(/* ... */)
});


//delete

app.delete('/movies/delete/:id',function(req,res){
    if(authenticate() || authenticateAdmin()){
    quotesCollection.findOneAndDelete(
        { _id: ObjectId(req.params.id) }
      )
      .then(result => {
        res.send(result);
    })
        .catch(error => console.error(error))
    }
});

//read one
app.get('/movies/read/id/:id',function(req,res){
    if(authenticate() || authenticateAdmin()){
    db.collection('movies').find({ _id: ObjectId(req.params.id) } ).toArray()
.then(results => {
res.send(results)
})
.catch(/* ... */)}


});
app.put("/movies/update/:id",  function (req, res) {
    if(authenticate() || authenticateAdmin()){
    const d = quotesCollection.findOneAndUpdate(
        { _id: req.params.id },
        {$set:{ title: req.query.title,
            year: req.query.year,
           rating: req.query.rating }}

    )
    res.status(200).send(d);}
  });
  });
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


app.get('/', (req, res) => {
  res.send('ok')
});
const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    {title: 'Brazil', year: 1985, rating: 8 },
    {title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }

];


app.get('/users/read',function(req,res){
    if(authenticateAdmin()){
    res.status(200).send(users);
}
else
res.send("Access Denied");
});
app.put('/users/update/:id',function(req,res){
    if(authenticateAdmin()){
    if(req.query.username !="" && typeof(req.query.username)!="undefined" )
    users[req.params.id-1].username = req.query.username;
    if(req.query.password !="" && typeof(req.query.password)!="undefined" )
    users[req.params.id-1].password = req.query.password;
    res.status(200).send(users[req.params.id-1]);
}
else
res.send("Access Denied")
});
app.get('/users/create',function(req,res){
    if(authenticateAdmin()){
    if(req.query.username !="" && typeof(req.query.username)!="undefined" && req.query.password !="" && typeof(req.query.password)!="undefined"){
    users.push({username:req.query.username,password:req.query.password});
    res.status(200).send("created");
    }
    else
    res.status(403).send("Please enter a username and password");
}
else
res.send("Access Denied")
});
app.delete('/users/delete/:id',function(req,res){
    if(authenticateAdmin()){
    if(req.params.id<=0 || req.params.id>users.length)
    res.status(404).send("User id is not available");
    else{
        users.splice(req.params.id-1,1);
        res.status(200).send("User Deleted");
    }
}
else
res.send("Access Denied");
});    










    