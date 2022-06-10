const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("we're connected!");
    const userSchema = new mongoose.Schema({
        _id: { type: String, unique: true },
        name: String
    });    
    userSchema.methods.speak = function () {
        const greeting = this.name
          ? "Meow name is " + this.name
          : "I don't have a name";
        console.log(greeting);
    }    
    const User = mongoose.model('User', userSchema);
    console.log('User', User);
    User.find({ name: /^Stefano/ }, function (err, result) {
        console.log('found', result);
    });
    const stefi = new User({ _id: 'stfnbssl', name: 'Stefano' });
    console.log(stefi.name); 
    stefi.speak(); 
    stefi.save(function (err, result) {
        if (err) return console.error(err);
        console.log(result); 
        result.speak();
        db.close();
    });    
});