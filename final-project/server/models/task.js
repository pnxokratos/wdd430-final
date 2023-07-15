var mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    id: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: String },
    isChecked: { type: Boolean },
});

module.exports = mongoose.model('Task', taskSchema);
