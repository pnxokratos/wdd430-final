var mongoose = require('mongoose');

const sequenceSchema = mongoose.Schema({
    maxTaskId: { type: Number},
});

module.exports = mongoose.model('Sequence', sequenceSchema);
