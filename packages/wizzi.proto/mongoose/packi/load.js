var fs = require('fs');
var path = require('path');
const mongoose = require('mongoose');
const pDependency = require('./packiDependency');
const pItem = require('./packiItem');
const prepareLoad = require('./prepareLoad');

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);

const db = mongoose.connection;
let PackiDependency;
let PackiItem;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    PackiDependency = pDependency.getPackiDependency();
    PackiItem = pItem.getPackiItem();
    if (false) {
        const item = {
            owner: 'stfnbssl',
            name: 'dixie 2',
            wizziSchema: 'html',
            mainIttf: 'a',
            packiFiles: { ['a']: { type: 'CODE', contents: 'hello' } }
        };
        userUpsertPackiItem(item, function(err, result) {
            console.log('userUpsertPackiItem.err', err);
            console.log('userUpsertPackiItem.result', result);
            upsertPackiItem(item, function(err, result) {
                console.log('upsertPackiItem.err', err);
                console.log('upsertPackiItem.result', result);
                db.close();
            });
        });
    }
    prepareLoad.exec(function(err){
        if (err) throw err;
        uploadPackiDependencies(path.join(__dirname, 'json', 'packiDependencies.json'), function (err, result) {
            console.log('uploadPackiDependencies.err', err);
            console.log('uploadPackiDependencies.result', Object.keys(result));
            if (err) throw err;
            uploadPackiItems(path.join(__dirname, 'json', 'packiItems.json'), function (err, result) {
                console.log('uploadPackiDependencies.err', err);
                console.log('uploadPackiDependencies.result', Object.keys(result));
                if (err) throw err;
                db.close();
            });
        });
    })
});

function uploadPackiDependencies(dependenciesPath, callback) {
    fs.readFile(dependenciesPath, 'utf8', function (err, data) {
        if (err) throw err;
        itemsObj = JSON.parse(data);
        var j = 0;
        (function next() {
            var itemObj = itemsObj[j++];
            if (!itemObj) {
                console.log('done uploadPackiDependency', dependenciesPath);
                return callback(null, 'done uploadPackiDependency');
            }
            upsertPackiDependency(itemObj, function(err, result) {
                console.log('upsertPackiDependency.err', err);
                console.log('upsertPackiDependency.result', Object.keys(result));
                next();
            });
        })();
    });
}

function uploadPackiItems(itemsPath, callback) {
    fs.readFile(itemsPath, 'utf8', function (err, data) {
        if (err) throw err;
        itemsObj = JSON.parse(data);
        var j = 0;
        (function next() {
            var itemObj = itemsObj[j++];
            if (!itemObj) {
                console.log('done uploadPackiItem', itemsPath);
                return callback(null, 'done uploadPackiItems');
            }
            upsertPackiItem(itemObj, function(err, result) {
                console.log('upsertPackiItem.err', err);
                console.log('upsertPackiItem.result', Object.keys(result));
                next();
            });
        })();
    });
}

function upsertPackiDependency(item, callback) {
    var query = { owner: item.owner, name: item.name};
    PackiDependency.find(query, function(err, result) {
        if (err) return callback(err);
        console.log('upsertPackiDependency.find.result', result.length, result && result.length > 0 && result[0].userUpdated, Object.keys(result))
        if (result.length == 0 || !result[0].userUpdated) {
            item.userUpdated = false;
            item.description = '...';
            item.created_at = new Date();
            item.updated_at = new Date();
            PackiDependency.findOneAndUpdate(query, item, {upsert: true, new: true}, function(err, doc) {
                if (err) return callback(err);
                return callback(null, { upserted: true, doc: doc });
            });
        }
        else
        {
            return callback(null, { upserted: false, message: 'The user already updated this' });
        }
    });
}

function upsertPackiItem(item, callback) {
    var query = { owner: item.owner, name: item.name};
    PackiItem.find(query, function(err, result) {
        if (err) return callback(err);
        console.log('upsertPackiItem.find.result', result.length, result && result.length > 0 && result[0].userUpdated, Object.keys(result))
        if (result.length == 0 || !result[0].userUpdated) {
            item.userUpdated = false;
            item.description = '...';
            item.created_at = new Date();
            item.updated_at = new Date();
            PackiItem.findOneAndUpdate(query, item, {upsert: true, new: true}, function(err, doc) {
                if (err) return callback(err);
                return callback(null, { upserted: true, doc: doc });
            });
        }
        else
        {
            return callback(null, { upserted: false, message: 'The user already updated this' });
        }
    });
}

function userUpsertPackiDependency(item, callback) {
    item.userUpdated = true;
    var query = { owner: item.owner, name: item.name};
    console.log('userUpsertPackiDependency', item);
    PackiDependency.findOneAndUpdate(query, item, {upsert: true, new: true}, function(err, doc) {
        if (err) return callback(err);
        return callback(null, { upserted: true, message: 'user updated', doc: doc });
    });
}
function userUpsertPackiItem(item, callback) {
    item.userUpdated = true;
    var query = { owner: item.owner, name: item.name};
    console.log('userUpsertPackiItem', item);
    PackiItem.findOneAndUpdate(query, item, {upsert: true, new: true}, function(err, doc) {
        if (err) return callback(err);
        return callback(null, { upserted: true, message: 'user updated', doc: doc });
    });
}