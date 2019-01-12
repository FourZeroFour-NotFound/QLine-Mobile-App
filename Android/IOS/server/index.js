// Mobile App server.

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index.js')
const session = require('express-session');
const passport = require('passport');
var MySQLStore = require('express-mysql-session')(session);
var router = express.Router();
const multer = require("multer");
const app = express();
app.use(express.static(__dirname + '/../client/public'));
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));




//creat table sessions in data bsee 
var sessionStore = new MySQLStore({
  host: "db4free.net",
  user: "qlinedbdb",
  password: "qlinedbdb",
  database: "qlinedbdb"
 })



app.use(session({
  secret: 'secret!',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////
//////////////////////
// mobile server

 app.get('/test', function(req,res){
   console.log('test is working')
 })


// git function to bring all the queuefor one user using his id 
//dose not take any thing just the user id from his req
app.get('/all_queue',function(req,res){
  db.getAllQueueForUser(req.user , function(err,result){
    if (err){
      console.log("server error giting data " , err)
    }else{
      res.send({
        status: 200,
        success: "data found sucssfuly",
        data : result
      });
    }
    
  })
})

// git function to bring all the queuefor one user using his id 
//dose not take any thing just the user id from his req
app.post('/queue-data',function(req,res){
  db.grtQueueUsingId(req.body.queue_id , function(err,result){
    if (err){
      res.send({
        status: 404,
        success: result,
       
      });
      console.log("server error giting data " , err)
    }else{
      res.send({
        status: 200,
        success: result,
       
      });
    }
    
  })
})
// this function used to get data for user using id
app.get('/profile', function(req,res){
  console.log(" lllllllll",req.user)
  db.getUserData(req.user,function(err,result){
    if(err){
      console.log("server error", err)
    }else{
      res.send({
        status:200,
        success:result

      })
    }
  })
})

// this function used to get data for user using id
app.post('/profile1', function(req,res){
  db.getUserData(req.body.id,function(err,result){
    if(err){
      console.log("server error", err)
    }else{
      res.send({
        status:200,
        success:result

      })
    }
  })
})
// this function used to get data for user email
app.post('/profile2', function(req,res){
  db.getUserDataEmail(req.body.email,function(err,result){
    if(err){
      console.log("server error", err)
      res.send({
        status:404,
        success:err
      })
    }else{
      res.send({
        status:200,
        success:result

      })
    }
  })
})

// this function is used to update data for user using id
app.put('/profile_info', function(req,res){
  console.log(" ddddddd",req.user)
  db.UPDATE(req.body,req.user, function(err, result){
    if(err){
      console.log("server error", err)
    }else{
      res.send({
        status:200,
        success:result
      
      })
    }
  })
})

  // this request used to get all tickets for user using id 
app.get('/ticket1', function(req,res){
  console.log(" lllllllll",req.user)
  db.getUserTickets(req.user,function(err,result){
    if(err){
      console.log("server error", err)
    }else{
      res.send({
        status:200,
        success:result

      })
    }
  })
})
// this request to get the number of the queue (your turn)
app.get('/ticket', function(req,res){
  console.log(" queue id",req.queue_id)
  db.getUserQueue(req.queue_id,function(err,result){
    if(err){
      console.log("server error", err)
    }else{
      res.send({
        status:200,
        success:result

      })
    }
  })
})

// this function  is used to delete specific ticket for user using queue_id

app.delete( '/confirm/:queue_id', function(req,res){
  console.log(" zzzzzzz",req.params.queue_id)
  db.DeleteTicket(req.params.queue_id, function(err, result){
    if(err){
      console.log("server error", err)
    }else{
      console.log("rrrrr", result)
      res.send({
        status:200,
         success:result
        //  type:"Delete"
      
      })
    }
  })
})


  // this function to create  new queue

app.post('/add-queue', function (req, res) {
  console.log(req.user)
  console.log(req.body)
  var x = ()=> {if(req.body.take_premum) {return 1}else{return 0}}
  var y = ()=> {if(req.body.accept_join) {return 1}else{return 0}}
  var queue = {
    nameOfQueeu: req.body.nameOfQueeu,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    date: req.body.date,
    timeforone: req.body.timeforone,
    windows: req.body.windows,
    imgUrl: req.body.imgUrl,
    take_premum: x() ,
    accept_join:y() ,
    requierment: req.body.requierment,
    creator_id: req.user,
  }
console.log("queue",queue)
  db.insertNewQueue(queue, function (err, result) {
    if (err) {
      console.log("server ", err)
    } else {
      console.log("server queue add ")
      res.send({
        success: "queue added sucssfuly"
      })
    }
  })
})

app.post('/sign-up', function (req, res) {
  console.log(req.body)
  // orderthe data in the same way it sabous to be 
  var user = {
    "firstName": req.body.firstName,
    "lastName": req.body.lastName,
    "email": req.body.email,
    "password": req.body.password,
    "organization": req.body.organizationName,
    "phoneNumber": req.body.phoneNumber,
  }
  //check if the account is already exist befor add him if its exist alredy redirict him to sign in page 
  db.isacountExest(req.body.email, function (err, result) {
    if (err) {
      console.log("server", err)
    } else {
      if (!(result.length == 0)) {
        res.send({
          status: 404,
          success: "userExist",
        });

      } else { 
        //if its new user add him to the user table 
        db.insertNewUser(user, function (err, result) {
          if (err) {
            console.log(err)
          } else {
            console.log("server new user id ", result.insertId)
            //creat session for him using login 
            req.login(result.insertId, function (err) {
              console.log("server user data after creat and log in ", user)

              user.id = result.insertId // add the id to the object user and send it to the front end //this way is esyer to know the user id 
              res.send({
                status: 200,
                success: "Successed!",
                data: user
              });
            });
          }
        })
      }
    }
  })
})
// add fake user 
app.post('/sign-up-fake', function (req, res) {
  console.log(req.body)
  // orderthe data in the same way it sabous to be 
  var user = {
    "firstName": req.body.firstName,
    "lastName": req.body.lastName,
    "email": req.body.email,
    "password": req.body.password,
    "organization": req.body.organizationName,
    "phoneNumber": req.body.phoneNumber,
  }


  db.insertNewUser(user, function (err, result) {
    if (err) {
      console.log(err)
    } else {
    
        user.id = result.insertId // add the id to the object user and send it to the front end //this way is esyer to know the user id 
        res.send({
          status: 200,
          success: "Successed!",
          data: user
        });
     
    }
  })
})
////////////////////////////////////////////////////////////////

//post function to sign in 
app.post('/sign-in', function (req, res) {
  console.log("here",req.body)
  let email = req.body.email
  db.isacountExest(email, function (err, result) {
    console.log('this is the result',result)
    if (err) {
      console.log("server", err)
    } else {
      if (result.length === 0) {
        res.send({
          status: 404,
          success: "email is wrong",
        });
      } else {
        if (req.body.password == result[0].password) {
          //if the password corect creat session 
          req.login(result[0].user_id, function (err) {
            console.log("server user data after creat and log in ", result[0])
            res.send({
              status: 200,
              success: "Successed!",
              data: result[0]
            });
          });
        } else {
          res.send({
            status: 404,
            success: "password not corect",
            data: result[0].password
          });
        }

      }
    }
  })
})

// log out function // will 
app.get('/log-out', function (req, res) {
  console.log("zaiiiiid",req.logOut)
  //console.log(req.isAuthenticated());
  var x = req.user
  req.logOut()
  res.send({
    success: `user ${x} is log out `
  })
})
// function for serch give it name of org and it return all queue for this org 
app.post('/search',function(req,res){
  console.log('nnnnn',req.body)
  db.search(req.body.org , function(err,result){
    if (err){
      console.log("server error giting data " , err)
    }else{
      res.send({
        status: 200,
        success: result,
        data : result
      });
    }
    
  })
})
///////////////////////////////////////////////////////////
//function to insert user in serten queue
//give it the queue id and notes
//{
// "queueid":"1",
// "notes":"1"
// }

app.post('/add-userto-queue',function(req,res){
  db.insertinUserQueue(req.user,req.body.queueid,req.body.notes, function(err,result){
    if (err){
     
      console.log("server error giting data " , err)
      res.send({
        status: 404,
        success: "err",
        data : err
      });
    }else{
      
      res.send({
        status: 200,
        success: result,
        data : result
      });
    }
    
  })
})

//////////////////////////////////////////////////////////
//function to insert user in serten queue useng the kiosk machen


app.post('/add-userto-queue1',function(req,res){
  db.insertinUserQueue(req.body.user_id,req.body.queue_id,"i joind from kiosk", function(err,result){
    if (err){
     
      console.log("server error giting data " , err)
      res.send({
        status: 404,
        success: "err",
        data : err
      });
    }else{
      
      res.send({
        status: 200,
        success: result,
        data : result
      });
    }
    
  })
})
//////////////////////////////////////////////////////////
//function to insert user in serten queue
//give it the queue id and notes
//{
// "queueid":"1",
// "notes":"1"
// }

app.post('/add-userto-queue1',function(req,res){
  db.insertinUserQueue(req.body.user_id,req.body.queue_id,req.body.notes, function(err,result){
    console.log("zzzzzzzzzzzzzzzzzz" , req.body.user_id,req.body.queue_id,req.body.notes)
    if (err){
     
      console.log("server error giting data " , err)
      res.send({
        status: 404,
        success: "err",
        data : err
      });
    }else{
      
      res.send({
        status: 200,
        success: result,
        data : result
      });
    }
    
  })
})
//////////////////////////////////////////////////////////
//function to delet from waiting lest 



app.post('/deleteWaiting',function(req,res){
  db.deletefromWaiting(req.body.id,function(err,result){

    if (err){
     
      console.log("server error giting data " , err)
      res.send({
        status: 404,
        success: "err",
        data : err
      });
    }else{
      
      res.send({
        status: 200,
        success: result,
        data : result
      });
    }
    
  })
})
//////////////////////////////////////////////////////////
//function to delet from waiting lest 



app.post('/deletequeue',function(req,res){
  db.deletefromqueue(req.body.id,function(err,result){

    if (err){
     
      console.log("server error giting data " , err)
      res.send({
        status: 404,
        success: "err",
        data : err
      });
    }else{
      
      res.send({
        status: 200,
        success: result,
        data : result
      });
    }
    
  })
})
/////////////////////////////////////////////////////////
//function to delet from waiting lest 



app.post('/deletequeueA',function(req,res){
  db.deletefromqueueA(req.body.id,function(err,result){

    if (err){
     
      console.log("server error giting data " , err)
      res.send({
        status: 404,
        success: "err",
        data : err
      });
    }else{
      
      res.send({
        status: 200,
        success: result,
        data : result
      });
    }
    
  })
})
/////////////////////////////////////////////////////////
//function to delet from waiting lest 



app.post('/UPDATEtickt',function(req,res){
  db.UPDATEtickt(req.body.id,req.body.counter ,function(err,result){

    if (err){
     
      console.log("server error giting data " , err)
      res.send({
        status: 404,
        success: "err",
        data : err
      });
    }else{
      
      res.send({
        status: 200,
        success: result,
        data : result
      });
    }
    
  })
})


/////////////////////////////////////////////////////////
//function to delet from waiting lest 



app.post('/deleteTickt',function(req,res){
  db.deleteTickt(req.body.id,function(err,result){

    if (err){
     
      console.log("server error giting data " , err)
      res.send({
        status: 404,
        success: "err",
        data : err
      });
    }else{
      
      res.send({
        status: 200,
        success: result,
        data : result
      });
    }
    
  })
})
/////////////////////////////////////////////////////////
//function to delet from waiting lest 



app.post('/deletequeueB',function(req,res){
  db.deletefromqueueB(req.body.id,function(err,result){

    if (err){
     
      console.log("server error giting data " , err)
      res.send({
        status: 404,
        success: "err",
        data : err
      });
    }else{
      
      res.send({
        status: 200,
        success: result,
        data : result
      });
    }
    
  })
})
////////////////////////////////////////////////////////////
//function to get all users in serten queue
app.post('/get-users-in-queue',function(req,res){
  console.log("ddfdsfdsf",req.body)
  db.getUsersInQueue(req.body.queueid, function(err,result){

    if (err){
     
      console.log("server error giting data " , err)
      res.send({
        status: 404,
        success: "err",
        data : err
      });
    }else{
      
      res.send({
        status: 200,
        success: result,
        data : result
      });
    }
    
  })
})

////////////////////////////////////////////////////////////
//function to get all users in serten queue from the wating lest
app.post('/get-users-in-waitingList',function(req,res){
  console.log("ddfdsfdsf",req.body)
  db.getUsersInWaiting(req.body.queueid, function(err,result){

    if (err){
     
      console.log("server error giting data " , err)
      res.send({
        status: 404,
        success: "err",
        data : err
      });
    }else{
      
      res.send({
        status: 200,
        success: result,
        data : result
      });
    }
    
  })
})

// this function used to get data from user_queue 
app.post('/getQueueInfo',function(req,res){
  console.log("zaiiiiiiiiiiid",req.body.queue_id)
  db.getQueueInfo(req.body.queue_id, function(err,result){

    if (err){
     
      console.log("server error giting data " , err)
      res.send({
        status: 404,
        success: "err",
        data : err
      });
    }else{
      
      res.send({
        status: 200,
        success: result,
        data : result
      });
    }
    
  })
})




///////////////////////////////////////////////////////////
//function to insert user in the waitng lst for queue
//give it the queue id and notes
//{
// "queueid":"1",
// "notes":"1"
// }

app.post('/add-waitingList',function(req,res){
 
  db.insertinWaitinglist(req.user,req.body.queueid,req.body.Notes, function(err,result){
    if (err){
     
      console.log("server error giting data " , err)
      res.send({
        status: 404,
        success: "err",
        data : err
      });
    }else{
      
      res.send({
        status: 200,
        success: result,
        data : result
      });
    }
    
  })
})









//stor data in session data base  using id and it will be saved in cookies 
passport.serializeUser(function (user_id, done) {
  done(null, user_id);
});
// read from the session
passport.deserializeUser(function (user_id, done) {
  done(null, user_id);
});

//use this function to control acsses to some get reqest and post requst 
function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

    if (req.isAuthenticated()) return next();
    res.send({
      status: 404,
      success: "redirectTologin"
    });
  }
}

app.post('/customer-services', function (req, res) {
  console.log("admin", req.body);
  var user = {
    "name": req.body.name,
    "email": req.body.email,
    "phoneNumber": req.body.phoneNumber,
    "comments": req.body.comments
  }
  db.saveMessageCustomer(req.body, function(error, result) {
    if (error) {console.log("error", error)
  } else {
    console.log("Success!", result)
  }
  });
})

app.get('/customer-services', function(req, res){
  db.getAllMessage(function(err, result){
    if(result) {
      console.log("this",result);
      res.send(result)
    } 
  })
})

app.post('/customer-message', function (req, res) {
  console.log("admin", req.body.message);
 
  db.saveMessageChat(req.body, function(error, result) {
    if (error) {console.log("error", error)
  } else {
    console.log("Success!", result)
  }
  });
})

app.get('/customer-message', function(req, res){
  db.getAllMessageChat(function(err, result){
    if(result) {
      console.log("message",result);
      res.send(result)
    } 
  })
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../client/public/profileImages')
  },
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + file.originalname);
  }
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
}).single('myImage')




app.listen(port, () => console.log(`Listening on port ${port}`));
module.exports = app;