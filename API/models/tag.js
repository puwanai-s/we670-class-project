const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tagSchema = new Schema({
    name: String,
    counter: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true,
    versionKey: false
});
const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
