const path = require('path')
const mongoose = require('mongoose');
const NodeCache = require( "node-cache" );
const wizziProds = require('../../wizzi/productions');
const pDependency = require('../../mongoose/packi/packiDependency');
const pItem = require('../../mongoose/packi/packiItem');
const pActivity = require('../../mongoose/packi/userActivity');
const pUser = require('../../mongoose/packi/user');
const userApi = require('./userApi');

const apiCache = new NodeCache({ stdTTL: 120, checkperiod: 60 });

let PackiDependency;
let PackiItem;
let UserActivity;
let User;
let DefaultContext;

function merge(a, b) {
    var ret = {};
    for (var k in a) { ret[k] = a[k]; }
    for (var k in b) { ret[k] = b[k]; }
    return ret;
}

let started = false;
let db;
let md;
module.exports = md = {
    start: function(defaultOwner, defaultContext, callback) {
        mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
        if (started) {
            // already started
            return callback(null);
        }
        started = true;
        mongoose.set('useFindAndModify', false);
        db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function() {
            PackiDependency = pDependency.getPackiDependency();
            PackiItem = pItem.getPackiItem();
            UserActivity = pActivity.getUserActivity();
            User = pUser.getUser();
            userApi.start(pUser);
            md._getPackiContextItem(defaultOwner, 'wzCtx;wzctx', {}).then(resultItemContext=>{
                DefaultContext = Object.assign({}, defaultContext, resultItemContext);
                console.log('packi.api.start', 'got PackiContextItem wzCtx;wzctx')
                callback(null);
            }).catch(err=>{
                console.log('packi.api.start', 'error getting PackiContextItem wzCtx;wzctx', err)
                callback(err)
            });
        });
    },
    getDefaultContext: function() {
        return DefaultContext;
    },
    getUserByGithubLogin: userApi.getUserByGithubLogin,
    saveUserFromGithubLogin: userApi.saveUserFromGithubLogin,
    validateUsername: userApi.validateUsername,
    validateUserNotUsed: userApi.validateUserNotUsed,
    getPackiList: function(owner) {
        var query = { owner: owner };
        console.log('getPackiList', query);
        return new Promise((resolve, reject) => {        
            PackiItem.find(query, function(err, result) {
                if (err) return reject(err);
                console.log('getPackiList.result.length', result.length);
                if (result.length == 0) {
                    User.find(query, function(err, result) {
                        if (err) return reject(err);
                        if (result.length == 0) {
                        }
                    });
                    return reject({ found: false, message: 'User not found'});
                } 
                else
                    return resolve(result);
            });
        });
    },
    getPacki: function(owner, name) {
        var query = { owner: owner, name: name};
        var cacheKey = owner + '|' + name;
        console.log('getPacki', query);
        return new Promise((resolve, reject) => {        
            let packiValue = apiCache.get( cacheKey );
            if (packiValue) return resolve(packiValue);
            PackiItem.find(query, function(err, result) {
                if (err) return reject(err);
                console.log('getPacki.result.length', result.length);
                if (result.length == 1) {
                    const item = result[0];
                    // console.log('getPacki.item', item);
                    if (item.wizziSchema && item.wizziSchema.length > 0) {
                        var querydep = { owner: owner, name: item.wizziSchema };
                        console.log('getPackiDependency', querydep);
                        PackiDependency.find(querydep, function(err, result) {
                            if (err) return reject(err);
                            console.log('PackiDependency.result.length', result.length);
                            let dep = {};
                            if (result.length == 1) {
                                dep = result[0];
                                // console.log('PackiDependency.dep', dep);
                                packiValue = {
                                    mainIttf: item.mainIttf,
                                    packiFiles:  merge(dep.get('packiFiles', {}), item.get('packiFiles', {}))
                                };
                                apiCache.set( cacheKey, packiValue );
                                return resolve(packiValue);
                            } else {
                                packiValue = {
                                    mainIttf: item.mainIttf,
                                    packiFiles: item.packiFiles
                                };
                                apiCache.set( cacheKey, packiValue );
                                return resolve(packiValue);
                            }
                        });
                    } else {
                        packiValue = {
                            mainIttf: item.mainIttf,
                            packiFiles: item.packiFiles
                        };
                        apiCache.set( cacheKey, packiValue );
                        return resolve(packiValue);
                    }
                } else {
                    return reject({ found: false, message: 'Packi not found'});
                }
            });
        });
    },
    getPackiContext: function(owner, queryContext, defaultContext) {
        return new Promise((resolve, reject) => { 
            if (queryContext && queryContext.length > 0) {
                const contextItems = queryContext.split('|');
                var j = 0;
                let resultContext = defaultContext;
                (function next() {
                    var contextItem = contextItems[j++];
                    if (!contextItem) {
                        console.log('done getPackiContext', Object.keys(resultContext));
                        return resolve(resultContext);
                    }
                    md._getPackiContextItem(owner, contextItem, defaultContext).then(resultItemContext=>{
                        resultContext = Object.assign({}, resultContext, resultItemContext);
                        next();
                    }).catch(err=> reject(err));
                })();
            } else {
                resolve(defaultContext);
            }
        });
    },
    _getPackiContextItem: function(owner, queryContext, defaultContext) {
        return new Promise((resolve, reject) => { 
            if (queryContext && queryContext.length > 0) {
                const parts = queryContext.split(';');
                const contextName = parts[0];
                const contextPackiName = parts[1];
                const contextTransformation = parts.length > 2 ? parts[2] : null;
                console.log('packi.api._getPackiContextItem: contextName', contextName, 'contextPackiName', contextPackiName, 'contextTransformation', contextTransformation);
                if (contextTransformation) {
                    md.getPackiTransformation(owner, contextPackiName, defaultContext, contextTransformation).then(result => {
                        console.log('packi.api._getPackiContextItem: typeof result', typeof result.transformResult);
                        // const contextObject = JSON.parse(result.transformResult);
                        resolve(Object.assign(
                            {}, 
                            defaultContext, 
                            {
                                [contextName]: result.transformResult
                            })
                        );
                    })
                } else {
                    md.getPackiGeneration(owner, contextPackiName, defaultContext).then(result => {
                        console.log('packi.api._getPackiContextItem', result.content.length);
                        const contextObject = JSON.parse(result.content);
                        resolve(Object.assign(
                            {}, 
                            defaultContext, 
                            {
                                [contextName]: contextObject
                            })
                        );
                    })
                }
            } else {
                resolve(defaultContext);
            }
        });
    },
    getPackiGeneration: function(owner, name, context) {
        return new Promise((resolve, reject) => {        
            md.getPacki(owner, name)
                .then(packiItem => {
                    wizziProds.generateArtifact(packiItem.mainIttf, packiItem.packiFiles, context)
                        .then(result => {
                            console.log('getPackiGeneration', name, result.artifactContent.length);
                            console.log('getPackiGeneration', name, result.artifactContent.substring(0, 500) + '...');
                            const response = {
                                content: result.artifactContent,
                                contentLength: result.artifactContent.length,
                                contentType: contentTypeFor(packiItem.mainIttf)
                            };
                            return resolve(response);
                        }).catch(err => {
                            return reject(err);
                        });
                    })
                }).catch(err => {
                    console.log('err', err);
                    reject(err)
                });
    },
    getPackiTransformation: function(owner, name, context, transformerName) {
        return new Promise((resolve, reject) => {
            md.getPacki(owner, name)
                .then(packiItem => {
                    wizziProds.transformModel(packiItem.mainIttf, packiItem.packiFiles, context, {transformer: transformerName})
                        .then(result => {
                            console.log('getPackiTransformation', Object.keys(result));
                            return resolve(result);
                        }).catch(err => {
                            return reject(err);
                        });
                })
            }).catch(err => {
                console.log('err', err);
                reject(err)
            });
    },
    getUserActivity: function(id) {
        var query = { _id: id};
        return new Promise((resolve, reject) => {        
            UserActivity.find(query, function(err, result) {
                if (err) return reject(err);
                if (result.length == 1) return resolve(result[0]._doc);
                return reject(result);
            });
        });
    },
    saveUserActivity: function(id, items) {
        var query = { _id: id};
        return new Promise((resolve, reject) => {        
            UserActivity.find(query, function(err, result) {
                if (err) return reject(err);
                const saveItem = result.length == 1 ? result[0]._doc : { _id: id, openPackies: [], openFiles: [] };
                if (items.openPacki){
                    saveItem.openPackies.unshift(items.openPacki);
                    if (saveItem.openPackies.length > 10) saveItem.openPackies.splice(10)
                } 
                if (items.openFile){
                    saveItem.openFiles.unshift(items.openFile);
                    if (saveItem.openFiles.length > 20) saveItem.openFiles.splice(20)
                } 
                UserActivity.findOneAndUpdate(query, saveItem, {upsert: true, new: true}, function(err, doc) {
                    if (err) {
                        console.log('saveUserActivity err', err);
                        return reject(err);
                    }
                    return resolve({ upserted: true, message: 'useractivity', doc: doc._doc });
                });
            });
        });
    },
    getLastPackiActivity: function(username) {
        var query = { _id: username};
        return new Promise((resolve, reject) => {        
            UserActivity.find(query, function(err, result) {
                if (err) return reject(err);
                if (result.length == 1) {
                    const activity = result[0]._doc;
                    if (activity.openPackies.length > 0) {
                        md.getPackiItem_Object_By_Owner_Name(username, activity.openPackies[0]).then( packiItem => {
                            resolve({
                                found: true,
                                _id: packiItem._id,
                                owner: packiItem.owner,
                                name: packiItem.name,
                                selectedFile: activity.openFiles[0],
                                packiFiles: packiItem.packiFiles,
                                mainIttf: packiItem.mainIttf,
                                wizziSchema: packiItem.wizziSchema,
                            })
                        })
                    }
                    else resolve({found: false})
                }
                else resolve({found: false})
            });
        });
    },
    getPackiItem_Object_By_Owner_Name: function(owner, name) {
        var query = { owner: owner, name: name};
        console.log('getPackiItem_Object_By_Owner_Name', query);
        return new Promise((resolve, reject) => {        
            PackiItem.find(query, function(err, result) {
                if (err) return reject(err);
                console.log('getPackiItem_Object_By_Owner_Name.result.length', result.length);
                if (result.length == 1) {
                    const obj = {
                        ...result[0]._doc,
                        packiFiles: JSON.parse(result[0]._doc.packiFiles)
                    }
                    return resolve(
                    {
                        ...obj,
                        _id: obj._id.toString()
                    })
                }
                return reject({message: "packi item not found", query});
            });
        });
    },
    getPackiItem_Object_By_Id: function(id) {
        var query = { _id: id};
        console.log('getPackiItem_Object_By_Id', query);
        return new Promise((resolve, reject) => {        
            PackiItem.find(query, function(err, result) {
                if (err) return reject(err);
                console.log('getPackiItem_Object_By_Id.result.length', result.length);
                if (result.length == 1) return resolve(result[0]._doc);
                return reject({message: "packi item not found", query});
            });
        });
    },
    savePacki: function(owner, name, mainIttf, wizziSchema, packiFiles) {
        return new Promise((resolve, reject) => {
            const item = {
                owner, name, mainIttf, wizziSchema, packiFiles
            };
            item.userUpdated = true;
            var cacheKey = owner + '|' + name;
            var query = { owner: item.owner, name: item.name};
            // console.log('savePacki', item);
            PackiItem.findOneAndUpdate(query, item, {upsert: true, new: true}, function(err, doc) {
                if (err) {
                    console.log('savePacki err', err);
                    return reject(err);
                }
                apiCache.del( cacheKey);
                console.log('savePacki success doc', Object.keys(doc), 'doc._doc', doc._doc);
                return resolve({ upserted: true, message: 'packiitem updated', doc: doc._doc });
            });
        });
    }
}

const extContentTypeMap = {
    '.css': 'text/css', 
    '.gif': 'image/gif', 
    '.html': 'text/html', 
    '.ittf': 'text/plain', 
    '.jpeg': 'image/jpeg', 
    '.jpg': 'image/jpg', 
    '.js': 'text/javascript', 
    '.json': 'application/json', 
    '.png': 'image/png', 
    '.scss': 'text/scss', 
    '.svg': 'image/svg+xml', 
    '.ttf': 'application/x-font-ttf', 
    '.txt': 'text/plain', 
    '.vtt': 'text/vtt', 
    '.woff': 'application/x-font-woff', 
    '.yaml': 'text/yanl', 
    '.yml': 'text/yanl', 
    '.xml': 'text/xml'
 };

 function ittfSchemaOf(file) {
    const nameParts = path.basename(file).split('.');
    if (nameParts[nameParts.length - 1] === 'ittf') {
        return nameParts[nameParts.length - 2];
    }
    return undefined;
}

function contentTypeFor(file) {
    const ittfSchema = ittfSchemaOf(file);
    console.log('contentTypeFor', file, ittfSchema);
    if (ittfSchema) {
        return extContentTypeMap['.' + ittfSchema];
    }
    return undefined;
}
