var fs = require('fs');
var mongoose = require('mongoose');

module.exports = function (globalConfig) {
    var db = { };
    mongoose.connect(globalConfig.dbUri || 'localhost/storybox');    
    
    var modelsDir = (globalConfig.modelsDir || './models');
    var modelsList = fs.readdirSync(modelsDir);
    
    //var models = { };
    
    modelsList.forEach(function (model) {
        var modelName = model.split('.')[0];
        var m = require(modelsDir + '/' + modelName)(mongoose);
        db[m] = mongoose.model(m);
    });
    
    return db; 
};