// $servername = "mysql4.gear.host";
//       $username = "mmplayerdb";
//       $password = "\$iva02071992mmplayer";
//       $dbName = "mmplayerdb";
//       $host = 3306;
var mysql = require('mysql');
module.exports =
{
  GetConnection1 : function (){
    var con = mysql.createConnection({
      host: "mysql4.gear.host",
      user: "sivaprasaddb",
      password: "Nb17s!fz486!",
      database: "sivaprasaddb"
    });
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
    return con;
  }
}
