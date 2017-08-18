((artistController) => {

  artistController.init = (app, util) => {
    var Request = require('tedious').Request;

    app.get("/artist", (req, res) => {
      return getArtists(req, res);
    });

    app.get("/artist/:id", (req, res) => {
      var id = req.params.id;
      var whereClause = "";

      if (id) whereClause = ` where ArtistId = ${id}`;
      return getArtists(req, res, whereClause);
    });

    app.post("/artist", (req, res) => {
      var firstName = req.body.firstName ? req.body.firstName : '';
      var lastName = req.body.lastName ? req.body.lastName : '';
      var bio = req.body.bio ? req.body.bio : '';

      if (firstName === '') {
        res.status(400).send('FirstName must be specified');
        return;
      }

      var request = new Request(`insert into artist values ('${firstName}','${lastName}','${bio}'); select * from Artist where ArtistId = (select @@identity);`, (err, rowCount) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
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

    app.get("/artist/:id/feature", (req, res) => {
      var id = req.params.id;

      if (id === '') {
        res.status(400).send('id must be specified');
        return;
      }

      var request = new Request(`select distinct f.* from featurerole fr inner join feature f on f.FeatureId = fr.FeatureId where artistId = ${id};`, (err, rowCount) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
      });

      request.on('doneInProc', (rowCount, more, rows) => {
        if (rowCount === 0) {
          res.status(404).send('Not found');
          return;
        }
        res.send(util.simplifyRows(rows));
      });

      util.executeRequest(request);
    });

    var getArtists = (req, res, whereClause) => {
      var request = new Request(`select * from Artist ${whereClause};`, (err, rowCount) => {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        }
      });

      request.on('doneInProc', (rowCount, more, rows) => {
        if (rowCount === 0) {
          res.status(404).send('Not found');
          return;
        }
        res.send(util.simplifyRows(rows));
      });

      util.executeRequest(request);
    };

  };

})(module.exports);
