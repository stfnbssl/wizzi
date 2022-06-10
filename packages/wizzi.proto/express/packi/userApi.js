let User;
let md;
module.exports = md = {
    
    start: function(pUser) {
        User = pUser.getUser();
    },

    getUserByGithubLogin: function(profile) {
        var query = { email: profile.email };
        return new Promise((resolve, reject) => {        
            User.find(query, function(err, result) {
                if (err) return reject(err);
                if (result.length == 1) return resolve(result[0]._doc);
                return reject({message: 'user not found'});
            });
        });
    },
    
    validateUsername: function(chosenUsername) {
        return new Promise((resolve, reject) => {
            let query = { username: chosenUsername };
            User.find(query, function(err, result) {
                if (err) return reject(err);
                if (result.length == 1) return resolve({isValid:false, message: 'username already in use'});
                resolve({isValid: true});
            })
        })
    },

    validateUserNotUsed: function(chosenUsername, email) {
        return new Promise((resolve, reject) => {
            let query = { username: chosenUsername };
            User.find(query, function(err, result) {
                if (err) return reject(err);
                if (result.length == 1) return reject({message: 'username already in use'});
                let query = { email: email };
                User.find(query, function(err, result) {
                    if (err) return reject(err);
                    if (result.length == 1) return reject({message: 'email already in use'});
                    resolve({ok: true});
                })
            })
        })
    },
    
    createUserFromLogin: function(chosenUsername, userData) {
        return new Promise((resolve, reject) => {        
            md.validateNotUsed(chosenUsername, userData.email).then(result=> {
                const newUser = new User({
                    username: chosenUsername,
                    email: userData.email,
                    provider: 'github',
                    name: userData.name,
                    avatar_url: userData.avatar_url,
                    created_at: new Date(),
                    updated_at: new Date()
                });
                newUser.save(function(err, doc) {
                    if (err) {
                        console.log('save user error', err);
                        return reject(err);
                    }
                    return resolve({ created: true, message: 'user created', doc: doc._doc });
                });
            }).catch(err=>reject(err));
        });
    }
}