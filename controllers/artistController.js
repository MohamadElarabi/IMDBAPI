((artistController)=> {

  artistController.init = (app, util) => {
    var Request = require('tedious').Request;

    app.get("/artist", (req, res) => {
      var id = req.query.id;
      var whereClause = "";

      if (id) whereClause = ` where ArtistId = ${id}`;
      request = new Request(`select * from Artist ${whereClause};`, (err, rowCount) => {
        if (err) {
          console.log(err);
        }
      });

      request.on('doneInProc', (rowCount, more, rows) => {
        res.send(util.simplifyRows(rows));
      });

      util.executeRequest(request);
    });

    app.post("/artist", (req, res) => {
      var firstName = req.body.firstName ? req.body.firstName : '';
      var lastName = req.body.lastName ? req.body.lastName : '';
      var bio = req.body.bio ? req.body.bio : '';

      if (firstName === '') {
        res.send('FirstName must be specified');
        return;
      }

      request = new Request(`insert into artist values ('${firstName}','${lastName}','${bio}'); select * from Artist where ArtistId = (select @@identity);`, (err, rowCount) => {
        if (err) {
          console.log(err);
        }
      });
      var responsesLeft = 2;
      request.on('doneInProc', (rowCount, more, rows) => {
        responsesLeft--;
        if (responsesLeft === 0)
          res.send(util.simplifyRows(rows));
      });

      util.executeRequest(request);
    });
  };

})(module.exports);
