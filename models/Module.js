module.exports = function (db) {
    var schema = db.Schema({        
        name: String,
        indexView: String,
        version: String,
        enabled: Boolean
    });
    var Module = db.model('Module', schema);
    return 'Module';
};