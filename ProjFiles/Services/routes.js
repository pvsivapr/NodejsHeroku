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
}
module.exports = appRouter;
//http://localhost:3000/account?username=nraboy
