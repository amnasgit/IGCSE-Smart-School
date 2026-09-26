const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, enum: ['visitor', 'agent'], required: true },
    text: { type: String, required: true, trim: true },
    agentName: { type: String }, // set when sender === 'agent'
  },
  { timestamps: true }
);

const conversationSchema = new mongoose.Schema(
  {
    // Random ID generated in the visitor's browser and stored in localStorage,
    // so their chat thread persists across page reloads/navigation without login.
    visitorId: { type: String, required: true, unique: true, index: true },
    visitorName: { type: String, default: 'Website Visitor', trim: true },
    visitorPage: { type: String }, // which page they opened the chat from, for context
    status: { type: String, enum: ['open', 'closed'], default: 'open' },
    messages: [messageSchema],
    lastMessageAt: { type: Date, default: Date.now },
    hasUnreadForAdmin: { type: Boolean, default: false },
    hasUnreadForVisitor: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Conversation', conversationSchema);