((featureController) => {

  featureController.init = (app, util) => {
    var Request = require('tedious').Request;

    app.get("/feature", (req, res) => {
      return getFeature(req, res);
    });

    app.get("/feature/:id", (req, res) => {
      var id = req.params.id;
      var whereClause = "";

      if (id) whereClause = ` where FeatureId = ${id}`;
      return getFeature(req, res, whereClause);
    });

    app.get("/feature/:id/artist", (req, res) => {
      var id = req.params.id;

      if (!id) {
        res.status(400).send("id must be specified");
        return;
      }

      var request = new Request(`select a.*, fr.RoleTypeId from featurerole fr inner join artist a on fr.artistid = a.artistid where fr.featureId = ${id};`, (err, rowCount) => {
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

    app.post("/feature", (req, res) => {
      var name = req.body.name ? req.body.name : '';
      var description = req.body.description ? req.body.description : '';
      var featureTypeId = req.body.featureTypeId ? req.body.featureTypeId : 0;

      if (name === '' || featureTypeId === 0) {
        res.status(400).send('A name and a featureTypeId must be specified');
        return;
      }

      var request = new Request(`insert into feature values ('${name}','${description}','${featureTypeId}'); select * from Feature where FeatureId = (select @@identity);`, (err, rowCount) => {
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

    var getFeature = (req, res, whereClause) => {
      var request = new Request(`select * from Feature ${whereClause};`, (err, rowCount) => {
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
