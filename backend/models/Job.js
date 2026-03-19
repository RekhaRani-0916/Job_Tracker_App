const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    
    company: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
        default: 'Applied',
    },

    dateApplied: {
        type: Date,
        default: Date.now,
    },

    notes: {
        type: String,
    }
});

module.exports = mongoose.model('Job', jobSchema);