
var request = require('request');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var http = require('http');
var bodyParser = require('body-parser');
var environment = require('./environment.json');

//var privateKey  = fs.readFileSync('./ssl/private.pem', 'utf8');
//var certificate = fs.readFileSync('./ssl/public.pem', 'utf8');

//var credentials = {key: privateKey, cert: certificate};

// Faster server renders w/ Prod mode (dev mode never needed)
//enableProdMode();

// Express server
const app = express();

const PORT =  8080;


/* - Example Express Rest API endpoints -
  app.get('/api/**', (req, res) => { });
*/
// Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Cors
app.use(cors());
app.use(cookieParser());
// Add headers

app.get('/api/*', (req,res)=>{
  var auth = "Basic " + new Buffer(environment.userName + ":" + environment.pwd).toString("base64");
  var urlData = environment.apiUrl+req.url;
  const options = {
    url: urlData,
    method: 'GET',
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'Content-Type':'application/hal+json',
      'Authorization' : auth  
    }     
  };  
 // console.log(urlData);
  request(options, function(error, response, body){
    if (error) return res.status(500).send({message: error.message});
    //to write data into redis database
    //redisController.writeToCache(body,req,res,next);
    res.status(response.statusCode).send(body);
    
  });
}); 

app.get('/_search',(req,res)=>{
  //_search?q=elastic&pretty=true&size=20&from=0
  var options ={
    url: environment.elasticSearchUrl+':9200'+req.url,
    method: 'GET',
  };
  request(options, function(error, response, body){
    if (error) return res.status(500).send({message: error.message});
    //to write data into redis database
    //redisController.writeToCache(body,req,res,next);
    res.status(response.statusCode).send(getFormattedResponse(body));
  });  
});

const getFormattedResponse = (dataset) => {
    var response  = new Object();
    var formattedData = new Array();
    //result.total = dataset.hits.hits.length;
    responseData = JSON.parse(dataset);
    response.total = responseData.hits.total;
    for (var i = 0; i< responseData.hits.hits.length; i++) {
	    var res = new Object();
      var data = responseData.hits.hits;
    
      for (let [key, value] of Object.entries(data[i]._source)) {
    	  res[key] = value[0];
      }
      formattedData.push(res);
    }
    response.data = formattedData;
    //console.log(response);
    return response;
};
app.get('/getDrupalSessionToken',(req,res) => {
  const options = {
    url: environment.apiUrl+'/session/token',
    method: 'GET',
    rejectUnauthorized: false,
    requestCert: false    
  }; 
  console.log(options.url); 
  request(options, function(error, response, body){
    console.log(response.header);
    if (error) return res.status(500).send({message: error.message});
    //to write data into redis database
    //redisController.writeToCache(body,req,res,next);
    res.status(response.statusCode).json(body);
    });
});

app.post('/email_rest_resource',(req,res) =>{
  var data = req.body;
  var auth = "Basic " + new Buffer(environment.userName + ":" + environment.pwd).toString("base64");
  var urlData = environment.apiUrl+req.url;
  const options = {
    url: urlData,
    method: 'POST',
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'Content-Type':'application/json',
      'Authorization' : auth,
      'X-CSRF': req.headers['x-csrf']  
    },
    body : JSON.stringify(data)     
  };
  request(options, function(error, response, body){
    if (error) return res.status(500).send({message: error.message});
    //to write data into redis database
    //redisController.writeToCache(body,req,res,next);
    res.status(response.statusCode).send(body);
    
  });
});

app.post('/api/*', (req,res)=>{
  var data = req.body; 
  var auth = "Basic " + new Buffer("newCelcomApp" + ":" + "newce!c0m@99%").toString("base64");
  var urlData = 'http://10.5.133.84:8001'+req.url;
  const options = {
    url: urlData,
    method: 'POST',
    rejectUnauthorized: false,
    requestCert: false,
    headers: {
      'Content-Type':'application/json',
      'Authorization' : auth,
      'Accept': 'application/json' 
    },
    body : JSON.stringify(data)
  };
  
  request(options, function(error, response, body){
  if (error) return res.status(500).send({message: error.message});
  //to write data into redis database
  //redisController.writeToCache(body,req,res,next);
  res.status(response.statusCode).send(body);
  });
});

http.createServer(app).listen(8080, function () {
  console.log('Started!');
});