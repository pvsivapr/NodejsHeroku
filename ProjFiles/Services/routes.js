var bodyParser = require('body-parser')

var appRouter = function(app, conn, server)
{
  // parse application/x-www-form-urlencoded
  // app.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  // app.use(bodyParser.json())

  app.get("/", function(req, res) {
      res.send("Hello World");
  });
  app.get("/UserData", function(req, res) {
    var sql = "Select * FROM sivaprasad_userdb";
    conn.query(sql, function (err, result)
    {
      if (err)
      {
        throw err;
      }
      else
      {
        console.log("Got all results successfully");
        // for (var i = 0; i < result.length; i++)
        // {
        //   var row = result[i];
        //   console.log(row.userName);
        // }
        var data1 = JSON.stringify(result);
        // console.log("Result :  ", data1);
        // return data1;
        respObject = "Got all results successfullyyyyyyy";
        console.log(respObject);
        res.send(data1);
      }
      // conn.end();
    });
  });

  app.post("/UsersData", function(req, res) {
    if(!req.body.user_id || !req.body.user_name || !req.body.user_Password || !req.body.user_address || !req.body.user_mobile )
    {
      res.send({"status": "error", "message": "missings a parameter", "user_id": req.body.user_id});
    }
    else
    {
      var sql = "INSERT INTO sivaprasad_userdb (userId, userName, password, address, mobile ) VALUES ("+req.body.user_id+", '"+req.body.user_name+"', '"+req.body.user_Password+"', '"+req.body.user_address+"', '"+req.body.user_mobile+"')";
      conn.query(sql, function (err, result)
      {
        if (err)
        {
          res.send({"status": "success", "message": err.message});
          // throw err;
        }
        else
        {
          res.send({"status": "success", "message": "One record inserted"});
          // console.log("1 record inserted");
        }
        // conn.end();
      });
    }
  });
  app.get("/account", function(req, res) {
      var accountMock = {
          "username": "nraboy",
          "password": "1234",
          "twitter": "@nraboy"
      }
      if(!req.query.username) {
          return res.send({"status": "error", "message": "missing username"});
      } else if(req.query.username != accountMock.username) {
          return res.send({"status": "error", "message": "wrong username"});
      } else {
          return res.send(accountMock);
      }
  });
  app.post("/ServerData", function(req, res) {
      if(!req.body.user_name || !req.body.user_password) {
          return res.send({"status": "error", "message": "missing a parameter"});
      } else {
        if(req.body.user_name == "PVSivaprasadR" && req.body.user_password == "$Ivaprasad1991" )
        {
          return res.send({"status": "success", "message": server.address().address+":"+server.address().port});
        }
        else
        {
          return res.send({"status": "error", "message": "wrong username / password"});
        }
      }
  });
  app.post("/account", function(req, res) {
      if(!req.body.username || !req.body.password || !req.body.twitter) {
          return res.send({"status": "error", "message": "missing a parameter"});
      } else {
          return res.send(req.body);
      }
  });



  //For react application practice
  //INSERT INTO `employee_data`
  //INSERT INTO `employee_data` (`id`, `first_name`, `last_name`, `age`, `salary`, `company_name`, `description`, `email_id`) VALUES (NULL, '', '', '', '', NULL, NULL, NULL)

  app.get("/Employees", function(req, res) {
    var sql = "SELECT `id`,`first_name`,`last_name`,`age` from `employee_data`";
    conn.query(sql, function (err, result)
    {
      if (err)
      {
        throw err;
      }
      else
      {
        console.log("Got all results successfully");
        var data1 = JSON.stringify(result);
        // console.log("Result :  ", data1);
        // return data1;
        respObject = "Got all results successfullyyyyyyy";
        console.log(respObject);
        res.send(data1);
      }
      // conn.end();
    });
  });

  // app.get("/Employee?id=/", function(req, res) {
  //   var sql = "SELECT `id`,`first_name`,`last_name`,`age` from `employee_data`";
  //   conn.query(sql, function (err, result)
  //   {
  //     if (err)
  //     {
  //       throw err;
  //     }
  //     else
  //     {
  //       console.log("Got all results successfully");
  //       var data1 = JSON.stringify(result);
  //       // console.log("Result :  ", data1);
  //       // return data1;
  //       respObject = "Got all results successfullyyyyyyy";
  //       console.log(respObject);
  //       res.send(data1);
  //     }
  //     // conn.end();
  //   });
  // });

  app.get('/Employee/:tagId', function(req, res) {
    //res.send("tagId is set to " + req.params.id);
    var sql = "SELECT * from employee_data Where id="+req.params.tagId;
    conn.query(sql, function (err, result)
    {
      if (err)
      {
        throw err;
      }
      else
      {
        console.log("Got all results successfully");
        var data1 = JSON.stringify(result);
        // console.log("Result :  ", data1);
        // return data1;
        respObject = "Got all results successfullyyyyyyy";
        console.log(respObject);
        res.send(data1);
      }
      // conn.end();
    });
  });

  app.patch('/Employee', function(req, res) {
    //res.send("tagId is set to " + req.query.id);
    // UPDATE `employee_data` SET `id`=[value-1],`first_name`=[value-2],`last_name`=[value-3],`age`=[value-4],`salary`=[value-5],`company_name`=[value-6],`description`=[value-7],`email_id`=[value-8] WHERE 1
    var sql = "UPDATE employee_data SET first_name='"+req.body.first_name+"', last_name='"+req.body.last_name+"', age="+req.body.age+", salary="+req.body.salary+", company_name='"+req.body.company_name+"', description='"+req.body.description+"', email_id='"+req.body.email_id+"' WHERE id="+req.query.id;
    // console.log(sql);console.log(req.body);
    // res.send(sql);
    conn.query(sql, function (err, result)
    {
      if (err)
      {
        throw err;
      }
      else
      {
        console.log("Got all results successfully");
        var data1 = JSON.stringify(result);
        // console.log("Result :  ", data1);
        // return data1;
        respObject = "Got all results successfullyyyyyyy";
        console.log(respObject);
        res.send(req.body);
      }
      conn.end();
    });
  });

  app.delete('/Employee', function(req, res) {
    //res.send("tagId is set to " + req.query.id);
    // DELETE FROM `employee_data` WHERE 0
    if(req.query.id != 1)
    {
    var sql = "DELETE FROM employee_data WHERE id="+req.query.id;
    conn.query(sql, function (err, result)
    {
      if (err)
      {
        throw err;
      }
      else
      {
        res.send({"status": "failed", "message": "Record deleted Successfully"});
      }
      conn.end();
    });
  }
  else
  {
    res.send({"status": "failed", "message": "Unable to delete master record"});
  }
  });

  app.post("/Employee", function(req, res) {
    if(!req.body.id || !req.body.first_name || !req.body.last_name || !req.body.age || !req.body.salary)
    {
      res.send({"status": "error", "message": "missings a parameter", "user_id": req.body.user_id});
    }
    else
    {
      //INSERT INTO `employee_data`(`id`, `first_name`, `last_name`, `age`, `salary`, `company_name`, `description`, `email_id`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5],[value-6],[value-7],[value-8])
      var sql = "INSERT INTO employee_data (id, first_name, last_name, age, salary, company_name, description, email_id ) VALUES ("+req.body.id+", '"+req.body.first_name+"', '"+req.body.last_name+"', "+req.body.age+", "+req.body.salary+", '"+req.body.company_name+"', '"+req.body.description+"', '"+req.body.email_id+"')";
      conn.query(sql, function (err, result)
      {
        if (err)
        {
          res.send({"status": "success", "message": err.message});
          // throw err;
        }
        else
        {
          res.send({"status": "success", "message": "One record inserted"});
          // console.log("1 record inserted");
        }
        // conn.end();
      });
    }
  });


}
module.exports = appRouter;
//http://localhost:3000/account?username=nraboy
