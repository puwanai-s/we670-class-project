const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const creatorSchema = new Schema({
    uid: String,
    name: String,
    slogan: String,
    email: String,
    facebook: String,
    website: String
}, {
    timestamps: true,
    versionKey: false
});
const Creator = mongoose.model('Creator', creatorSchema);

module.exports = Creator;
