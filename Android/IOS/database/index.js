var mysql = require('mysql');



var connection = mysql.createConnection({
  host: "db4free.net",
  user: "qlinedbdb",
  password: "qlinedbdb",
  database: "qlinedbdb"
 });



connection.connect(function (err) {
  if (err) {
    console.log("data base  Error", err)
  } else {
    console.log('database has been connected')
  }
});




// function to git al the data in one table 
const selectAll = function (tableName, callback) {
  connection.query(`SELECT * FROM ${tableName}`, function (err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

// function for serch u give it the name of org and it returns all the queue for the user how owne the org
const search = function (org, callback) {
   const sql = `select queue.*, user.organization from user inner join queue on user.user_id = queue.creator_id and user.organization = "${org}"`
   connection.query(sql, function (err, results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

///////////////////////////////////////////////////

// function to add new user to the user table
//user should look like this 
// var user = {
//   firstName :"zaid",
//   lastName:"raddad",
//   email: "zaid@gmail.com",
//   password:"zaid",
//   organization:"zaiiis",
//   phoneNumber:"0799795083",
//   primum:0
// }
const insertNewUser = function (user, callback) {
  var sqlquery = `insert into user (firstName,lastName,email,password,organization,phoneNumber,primum) values("${user.firstName}","${user.lastName}","${user.email}","${user.password}","${user.organization}","${user.phoneNumber}","0")`
  connection.query(sqlquery, function (err, result) {
    if (err) {
      console.log("db error inserting in user table", err)
      callback(err, null)
    } else {
      console.log("db user added successfuly" , result ) 
      callback(null,result)
    }
  })
}
/////////////////////////////////////////////////////

//this function to insert in queue user table (add user to queue)
const insertinUserQueue = function (userid,queueid,notes, callback) {
  var sqlquery = `insert into user_queue (user_id,queue_id,onwindow,Notes) values("${userid}","${queueid}","0","${notes}")`
  connection.query(sqlquery, function (err, result) {
    if (err) {
      console.log("db error inserting in user_queue table", err)
      callback(err, null)
    } else {
      console.log("db user_queue added successfuly" , result ) 
      callback(null,result)
    }
  })
}

//this function to delet from waiting list
const deletefromWaiting = function (id, callback) {
  var sqlquery =` DELETE FROM waitingList WHERE id = ${id};`
  connection.query(sqlquery, function (err, result) {
    if (err) {
      console.log("db error inserting in user_queue table", err)
      callback(err, null)
    } else {
      console.log("db user_queue added successfuly" , result ) 
      callback(null,result)
    }
  })
}
const deletefromqueueA = function (id, callback) {
 var a =` DELETE FROM user_queue WHERE queue_id = ${id};`
  connection.query(a , function (err, result) {
    if (err) {
      console.log("db error inserting in user_queue table", err)
      callback(err, null)
    } else {
      console.log("db user_queue added successfuly" , result ) 
      callback(null,result)
    }
  })
}
const deletefromqueueB = function (id, callback) {
 var b = ` DELETE FROM waitingList WHERE queue_id = ${id};`
   connection.query(b , function (err, result) {
     if (err) {
       console.log("db error inserting in user_queue table", err)
       callback(err, null)
     } else {
       console.log("db user_queue added successfuly" , result ) 
       callback(null,result)
     }
   })
 }
 //delet from user_queue using id
 const deleteFromuser_queue = function (id, callback) {
  var b = ` DELETE FROM user_queue WHERE id = ${id};`
    connection.query(b , function (err, result) {
      if (err) {
        console.log("db error inserting in user_queue table", err)
        callback(err, null)
      } else {
        console.log("db user_queue added successfuly" , result ) 
        callback(null,result)
      }
    })
  }
//this function to delet from queue
const deletefromqueue = function (id, callback) {
  var sqlquery =` DELETE FROM queue WHERE queue_id = ${id};`

  connection.query(sqlquery, function (err, result) {
    if (err) {
      console.log("db error inserting in user_queue table", err)
      callback(err, null)
    } else {
      console.log("db user_queue added successfuly" , result ) 
      callback(null,result)
    }
  })
}

/////////////////////////////////////////////////////

//this function to insert in queue user table (add user to queue)
const insertinWaitinglist = function (userid,queueid,notes, callback) {
  var sqlquery = `insert into waitingList (user_id,queue_id,onwindow,Notes) values("${userid}","${queueid}","0","${notes}")`
  connection.query(sqlquery, function (err, result) {
    if (err) {
      console.log("db error inserting in waitingList table", err)
      callback(err, null)
    } else {
      console.log("db waitingList added successfuly" , result ) 
      callback(null,result)
    }
  })
}


///////////////////////////////////////////////////
//this for test
var queue = {
   nameOfQueeu :"zaid",
   start_time:  '23:59:59' ,
   end_time:  '23:59:59'  ,
   date : '1999-01-01',
   timeforone: "10 m ",
   windows : "5",
   imgUrl :"html//:" ,
   take_premum : 0,
   accept_join: 1,
   requierment :"fdfdfsdfsdfsd",
   creator_id : 1,
}
////////////////////////
//this function to insert new queue
const insertNewQueue = function (queue, callback) {
  var sqlquery = `insert into queue (nameOfQueeu,start_time,end_time,date,timeforone,windows,imgUrl,take_premum,accept_join,requierment ,creator_id)
  values("${queue.nameOfQueeu}","${queue.start_time}","${queue.end_time}","${queue.date}","${queue.timeforone}","${queue.windows}",
  "${queue.imgUrl}","${queue.take_premum}","${queue.accept_join}","${queue.requierment}","${queue.creator_id}")`
  connection.query(sqlquery, function (err, result) {
    if (err) {
      console.log("db error inserting in queue table", err)
      callback(err, null)
    } else {
      console.log("db queue added successfuly" , result ) 
      callback(null,result)//result is the data for the queue we created now 
    }
  })
}
///////////////////////////////////////////////////
//function to get all the queue that made by one user
const getAllQueueForUser = function (user_id , callback){
  var sqlquery = `select * from queue where creator_id = ${user_id}`
  connection.query(sqlquery, function(err,result){
    if (err){
      console.log(`db error geting the queue form db user_id =${user_id}` , err)
      callback(err,null)
    }else{
      console.log(`db git all the queue for this user sucssfuly user_id=${user_id}` , result)
      callback(null,result)
    }
  })
}

///////////////////////////////////////////////////
//function to get   queue using queue id 
const grtQueueUsingId = function (queue_id , callback){
  var sqlquery = `select * from queue where queue_id = ${queue_id}`
  connection.query(sqlquery, function(err,result){
    if (err){
      console.log(`db error geting the queue form db queue_id =${queue_id}` , err)
      callback(err,null)
    }else{
      console.log(`db git all the queue for this user sucssfuly queue_id=${queue_id}` , result)
      callback(null,result)
    }
  })
}
/////////////////////////////////////////////////
//this function to get all users in one queue
const getUsersInQueue = function (queue_id , callback){
 
  var sqlquery = `select * from user_queue where queue_id = "${queue_id}"`
  connection.query(sqlquery, function(err,result){
    if (err){
      console.log(`db error geting the queue form db queue id  =${queue_id}` , err)
      callback(err,null)
    }else{
      console.log(`db git all the users for this queue sucssfuly queue id=${queue_id}` , result)
      callback(null,result)
    }
  })
}

/////////////////////////////////////////////////
//this function to get all users in one queue from waiting lest
const getUsersInWaiting = function (queue_id , callback){
 
  var sqlquery = `select * from waitingList where queue_id = "${queue_id}"`
  connection.query(sqlquery, function(err,result){
    if (err){
      console.log(`db error geting the queue form db queue id  =${queue_id}` , err)
      callback(err,null)
    }else{
      console.log(`db git all the users for this queue sucssfuly queue id=${queue_id}` , result)
      callback(null,result)
    }
  })
}


///////////////////////////////////////////////////
// function to chick if the user exest useing his email if he exest send back his acount detalse else send back err
const isacountExest = function (email, callback) {
  var sqlquery = `select * from user where email = '${email}'`
  connection.query(sqlquery, function (err, result) {
    if (err) {
      console.log("db error to chick if user exist ", err)
      callback(err, null)
    } else {
      console.log("db i found it (user exist )", result)
      callback(null, result)
    }
  })
}

// this function used to get data for user using id
const getUserData = function (id, callback) {
  var sqlquery = `select * from user where user_id  = '${id}'`

  connection.query(sqlquery, function (err, result) {
    if (err) {
      console.log("db error to get data ", err)
      callback(err, null)
    } else {
      console.log("db i found it (user exist )", id)
      callback(null, result)
    }
  })
}

// this function used to get queue details using queue id
const getQueueInfo = function (id, callback) {
  var sqlquery = `select * from queue where queue_id = '${id}'`

  connection.query(sqlquery, function (err, result) {
    if (err) {
      console.log("db error to get data ", err)
      callback(err, null)
    } else {
      console.log("db i found it (user exist )", id)
      callback(null, result)
    }
  })
}

// this function used to get data from user_queue 
const getUserQueue = function (id, callback) {
  var sqlquery = `select id from user_queue where user_queue.queue_id = '${id}' `

  connection.query(sqlquery, function (err, result) {
    if (err) {
      console.log("db error to get data ", err)
      callback(err, null)
    } else {
      console.log("db i found it (user_queue )", id)
      callback(null, result)
    }
  })
}


// this function used to get all tickets for user using id
const getUserTickets = function (id, callback) {
  // var sqlquery =`select queue.*, user_queue.queue_id from user_queue inner join queue on user_queue.queue_id = queue.queue_id `
  var sqlquery = `select * from user_queue where user_id = '${id}'`
  connection.query(sqlquery, function (err, result) {
    if (err) {
      console.log("db error to get data ", err)
      callback(err, null)
    } else {
      console.log("db i found it (user exist )", id)
      callback(null, result)
    }
  })
}




// this function used to get data for user using id
const getUserDataEmail = function (email, callback) {
  var sqlquery = `select * from user where email = '${email}'`

  connection.query(sqlquery, function (err, result) {
    if (err) {
      console.log("db error to get data ", err)
      callback(err, null)
    } else {
      console.log("db i found it (user exist )", email)
      callback(null, result)
    }
  })
}

// this function is used to update data for user using id

const UPDATE = function (user,id, callback){
  var sqlquery = ` UPDATE  user  SET firstName='${user.firstName}',lastName='${user.lastName}',email='${user.email}',phoneNumber='${user.phoneNumber}'  where user_id ='${id}'`
  connection.query(sqlquery, function(err, result){
    if(err){
      console.log('db error', err)
      callback(err,null)
    }else{
      console.log( result.affectedRows ,"db update")
      callback(null,result)
    }
  })
}

// this function is used to update user ticket

const UPDATEtickt = function (id,counter, callback){
  var sqlquery = ` UPDATE  user_queue  SET onwindow='${counter}' where id ='${id}' `
  connection.query(sqlquery, function(err, result){
    if(err){
      console.log('db error', err)
      callback(err,null)
    }else{
      console.log( result.affectedRows ,"db update")
      callback(null,result)
    }
  })
}
 // this function  is used to delete specific ticket for user using queue_id


const deleteTickt = function (id, callback){
  var sqlquery = `DELETE FROM user_queue WHERE user_queue.id = ${id};  `
  connection.query(sqlquery, function(err, result){
    if(err){
      console.log('db error', err)
      callback(err,null)
    }else{
      console.log( result.affectedRows ,"db update")
      callback(null,result)
    }
  })
}



// this function return all the queues for the given organization
// const search = function (id, callback) {
//   var sqlquery = `select * from queue where creator_id = '${}'`

//   connection.query(sqlquery, function (err, result) {
//     if (err) {
//       console.log("db error to get data ", err)
//       callback(err, null)
//     } else {
//       console.log("db i found it (user exist )", id)
//       callback(null, result)
//     }
//   })
// }


const saveMessageCustomer = (customer, callback) => {
  
  let message = `insert into customer (name,email,phoneNumber,comments) values("${customer.name}","${customer.email}","${customer.phoneNumber}","${customer.comments}")`

  connection.query(message, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result)
    }
  })
}

const getAllMessage = (callback) => {
  let all = `SELECT customer.name, customer.email, customer.phoneNumber, customer.comments from customer`

  connection.query(all, function(err, result){
    if (err) throw err;
     callback(null, result)
  });
}

const saveMessageChat = (customerchat, callback) => {
  
  let message = `insert into customerchat (message) values("${customerchat.message}")`

  connection.query(message, function (err, result) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, result)
    }
  })
}

const getAllMessageChat = (callback) => {
  let all = `SELECT customerchat.message from customerchat`

  connection.query(all, function(err, result){
    if (err) throw err;
     callback(null, result)
  });
}

module.exports.getAllMessageChat = getAllMessageChat;
module.exports.saveMessageChat = saveMessageChat;
module.exports.getAllMessage = getAllMessage;
module.exports.saveMessageCustomer = saveMessageCustomer;
module.exports.connection = connection;
module.exports.isacountExest = isacountExest;
module.exports.insertNewUser = insertNewUser;
module.exports.insertNewQueue = insertNewQueue;
module.exports.getAllQueueForUser = getAllQueueForUser;
module.exports.getUserData = getUserData;
module.exports.UPDATE = UPDATE;
module.exports.search = search;
module.exports.insertinUserQueue = insertinUserQueue;
module.exports.insertinWaitinglist = insertinWaitinglist;
module.exports.getUsersInQueue = getUsersInQueue;
module.exports.getUsersInWaiting = getUsersInWaiting;
module.exports.deletefromWaiting = deletefromWaiting;deletefromqueue
module.exports.deletefromqueue = deletefromqueue;deletefromqueueB
module.exports.deletefromqueueA = deletefromqueueA;
module.exports.deletefromqueueB = deletefromqueueB;

module.exports.getUserTickets = getUserTickets;



module.exports.getUserDataEmail = getUserDataEmail;
module.exports.getUserTickets = getUserTickets;
module.exports.grtQueueUsingId = grtQueueUsingId;
module.exports.deleteFromuser_queue = deleteFromuser_queue;
module.exports.UPDATEtickt = UPDATEtickt;
module.exports.deleteTickt = deleteTickt;
module.exports.getQueueInfo = getQueueInfo;
module.exports.getUserQueue = getUserQueue;
/////////////////////////////
const DeleteTicket =function(id,callback){
  var sqlquery = `Delete from user_queue where id = '${id}' `
  connection.query(sqlquery, function(err, result){
    if(err){
      console.log('db error', err)
      callback(err,null)
    }else{
      console.log( result.affectedRows ,"db update")
      callback(null,result)
    }
  })
}
module.exports.DeleteTicket = DeleteTicket;