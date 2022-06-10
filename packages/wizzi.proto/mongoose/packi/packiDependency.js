const mongoose = require('mongoose');

const modelName = 'TFolder';

const packiDependencySchema = new mongoose.Schema({
    owner: { type: String},
    name: { type: String},
    description: { type: String},
    packiFiles: { 
        type: String,
        get: function(data) {
            return JSON.parse(data);
        },
        set: function(data) {
            return JSON.stringify(data);
        }        
    },
    created_at: { type: Date},
    updated_at: { type: Date},
    userUpdated: Boolean
});

packiDependencySchema.index(
    { owner: 1, name: 1 },
    { unique: true }
)

let PackiDependency = null;

module.exports = {
    getPackiDependency: function() {
        if (!PackiDependency) { PackiDependency = mongoose.model(modelName, packiDependencySchema); }
        return PackiDependency;
    }
}