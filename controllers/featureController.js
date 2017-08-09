((featureController) => {

  featureController.init = (app, util) => {
    var Request = require('tedious').Request;

    app.get("/feature", (req, res) => {
      var id = req.query.id;
      var whereClause = "";

      if (id) whereClause = ` where FeatureId = ${id}`;
      request = new Request(`select * from Feature ${whereClause};`, (err, rowCount) => {
        if (err) {
          console.log(err);
        }
      });

      request.on('doneInProc', (rowCount, more, rows) => {
        res.send(util.simplifyRows(rows));
      });

      util.executeRequest(request);
    });

    app.post("/feature", (req, res) => {
      var name = req.body.name ? req.body.name : '';
      var description = req.body.description ? req.body.description : '';
      var featureTypeId = req.body.featureTypeId ? req.body.featureTypeId : 0;

      if (name === '' || featureTypeId === 0) {
        res.send('A name and a featureTypeId must be specified');
        return;
      }

      request = new Request(`insert into feature values ('${name}','${description}','${featureTypeId}'); select * from Feature where FeatureId = (select @@identity);`, (err, rowCount) => {
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
