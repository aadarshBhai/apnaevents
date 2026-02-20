import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    deadline: {
        type: Date,
        required: false
    },
    location: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true // Optional for now to allow easier seeding
    },
    image: {
        type: String,
        required: false
    },
    verified: {
        type: Boolean,
        default: true
    },
    eligibility: {
        type: String,
        required: false
    },
    prizes: {
        type: String,
        required: false
    },
    applicationLink: {
        type: String,
        required: false
    },
    ageGroup: {
        type: String,
        required: false
    },
    registrationFee: {
        type: String,
        required: false,
        default: 'Free'
    },
    mode: {
        type: String,
        enum: ['Online', 'Offline', 'Hybrid'],
        default: 'Online'
    },
    contactInfo: {
        type: String,
        required: false
    },
    tags: [{
        type: String
    }],
    featured: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'closed', 'draft'],
        default: 'upcoming'
    }
}, {
    timestamps: true
});

const Event = mongoose.model('Event', eventSchema);

export default Event;
