import mongoose from 'mongoose';

const scheduledTaskSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['delete-expired-events', 'send-reminders', 'cleanup-uploads']
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    lastRun: {
        type: Date,
        default: null
    },
    nextRun: {
        type: Date,
        required: true
    },
    config: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    }
}, {
    timestamps: true
});

const ScheduledTask = mongoose.model('ScheduledTask', scheduledTaskSchema);

export default ScheduledTask;
