var fs = require('fs');
var path = require('path');

const MODULE_CONFIG = 'module.json';

module.exports = function (globalConfig, db) {
    var modulesDir = 'modules';
    if (globalConfig.modulesDir != null)
        modulesDir = globalConfig.modulesDir;
        
    var modules = fs.readdirSync(modulesDir);
    
    modules.forEach(function (dir) {
        var listing = fs.readdirSync(modulesDir + '/' + dir);
        
        if (listing.indexOf(MODULE_CONFIG) == -1) {
            throw "NoModuleConfig";
        }
        
        var file = fs.readFileSync(modulesDir + '/' + dir + '/' + MODULE_CONFIG);
        var moduleConfig = JSON.parse(file);
        
        moduleConfig.enabled = true;
        var mod = new db.Module(moduleConfig);
        mod.save();
    });
};