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

app.get('/movies/create',function(req,res){
    res.send("cr")

});

app.get('/movies/update',function(req,res){
res.send("up")
});
app.get('/movies/delete',function(req,res){
res.send("del")
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



