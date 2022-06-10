const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we're connected!");
    const packiSchema = new mongoose.Schema({
        owner: String,
        name: String,
        mainIttf: String,
        wizziSchema: String,
        packiFiles: String,
    });    
    packiSchema.methods.todo = function () {
    }    
    const PackiItem = mongoose.model('PackiItem', packiSchema);
    PackiItem.find({ name: /^Stefano/ }, function (err, result) {
        console.log('found', result);
    });
    const stefi = new PackiItem({ _id: 'stfnbssl', name: 'Stefano' });
    console.log(stefi.name); 
    stefi.speak(); 
    stefi.save(function (err, result) {
        if (err) return console.error(err);
        console.log(result); 
        result.speak();
        db.close();
    });    
});