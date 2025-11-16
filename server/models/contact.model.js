import mongoose from 'mongoose';

// Define the Contact Message Schema
const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        required: 'Email is required',
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    message: {
        type: String,
        required: 'Message content is required'
    },
    // The date the message was received
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('Contact', ContactSchema);