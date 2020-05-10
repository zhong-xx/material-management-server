const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialSchema = new mongoose.Schema({
    name: {
        type: String
    },
    item_type: {
        type: String
    },
    unit: {
        type: String
    },
    model: {
        type: String
    },
    is_effective: {
        type: String
    },
    reserve_type: {
        type: String
    },
    sort: {
        type: Number
    },
    weight: {
        type: Number
    },
    volume: {
        type: Number
    },
    purpose: {
        type: String
    },
    time: {
        type: String
    },
})

const material = mongoose.model('material', materialSchema);

module.exports = material;