((controllers)=> {

  var artistController = require("./artistController");
  var featureController = require("./featureController");

  controllers.init = (app, util) => {
    artistController.init(app, util);
    featureController.init(app, util);
  };

})(module.exports);
