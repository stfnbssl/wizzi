const { call } = require('file-loader');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

let Quick;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we're connected!");
    const quickSchema = new mongoose.Schema({
        name: String,
        created_at: Date
    });    
    Quick = mongoose.model('Quick', quickSchema);
    console.log('Quick', Quick);
    Quick.deleteMany(function(err, result){
        console.log('Quick.deleteMany.err', err);
        console.log('Quick.deleteMany.result', result);
    });
    step_1_insert_items(function() {
        step_2_list_items(function() {
            db.close();
        })
    })
});

function step_2_list_items(callback){
    const options = { limit: 10, sort: {created_at: -1}}
    const query = Quick.find(options.query);
    query.limit(options.limit);
    query.sort(options.sort);
    query.exec(function(err, result){
        if (err) console.error(err);
        console.log(Object.keys(result));
        result.map(item => {
            // console.log(item);
            console.log(item.name, 'created_at', new Date(item.created_at).toLocaleTimeString());
        })
        callback();
    }); //.sort({ created_at: -1}).limit(10);
}
function step_1_insert_items(callback){
    const maxItems = 20;
    const items = [];
    for (var i=1; i<maxItems; i++) {
        var item = new Quick({ name: 'item_' + i });
        items.push(item);
    }
    var j = 0;
    (function next() {
        var item = items[j++];
        if (!item) {
            console.log('done insert items');
            return callback();
        }
        item.created_at = new Date();
        item.save(function (err, result) {
            if (err) return console.error(err);
            console.log(result); 
            next();
        });    
    })();
}