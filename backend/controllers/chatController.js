const Conversation = require('../models/Conversation');

// ---- Visitor-facing (public, no login) ----

// @route POST /api/chat/visitor/start
// Creates the conversation on first open, or just returns the existing one.
const startConversation = async (req, res, next) => {
  try {
    const { visitorId, visitorName, visitorPage } = req.body;
    if (!visitorId) {
      return res.status(400).json({ success: false, message: 'visitorId is required' });
    }

    let conversation = await Conversation.findOne({ visitorId });
    if (!conversation) {
      conversation = await Conversation.create({
        visitorId,
        visitorName: visitorName || 'Website Visitor',
        visitorPage,
      });
    }

    res.json({ success: true, data: conversation });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/chat/visitor/:visitorId
// Used for polling — the visitor can only ever fetch their own thread since
// they're the only one who knows their randomly-generated visitorId.
const getVisitorConversation = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ visitorId: req.params.visitorId });
    if (!conversation) return res.status(404).json({ success: false, message: 'Conversation not found' });

    if (conversation.hasUnreadForVisitor) {
      conversation.hasUnreadForVisitor = false;
      await conversation.save();
    }

    res.json({ success: true, data: conversation });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/chat/visitor/:visitorId/message
const sendVisitorMessage = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Message text is required' });
    }

    let conversation = await Conversation.findOne({ visitorId: req.params.visitorId });
    if (!conversation) {
      conversation = await Conversation.create({ visitorId: req.params.visitorId });
    }

    conversation.messages.push({ sender: 'visitor', text: text.trim() });
    conversation.lastMessageAt = new Date();
    conversation.hasUnreadForAdmin = true;
    conversation.status = 'open';
    await conversation.save();

    res.status(201).json({ success: true, data: conversation });
  } catch (err) {
    next(err);
  }
};

// ---- Admin-facing (protected: super_admin, support_agent) ----

// @route GET /api/chat/admin
const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find()
      .sort({ lastMessageAt: -1 })
      .select('visitorId visitorName status lastMessageAt hasUnreadForAdmin messages');
    // Trim to last message only for the list view, to keep the payload small
    const summarized = conversations.map((c) => ({
      _id: c._id,
      visitorId: c.visitorId,
      visitorName: c.visitorName,
      status: c.status,
      lastMessageAt: c.lastMessageAt,
      hasUnreadForAdmin: c.hasUnreadForAdmin,
      lastMessage: c.messages[c.messages.length - 1]?.text || '',
    }));
    res.json({ success: true, data: summarized });
  } catch (err) {
    next(err);
  }
};

// @route GET /api/chat/admin/:visitorId
const getConversationAdmin = async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({ visitorId: req.params.visitorId });
    if (!conversation) return res.status(404).json({ success: false, message: 'Conversation not found' });

    if (conversation.hasUnreadForAdmin) {
      conversation.hasUnreadForAdmin = false;
      await conversation.save();
    }

    res.json({ success: true, data: conversation });
  } catch (err) {
    next(err);
  }
};

// @route POST /api/chat/admin/:visitorId/reply
const sendAgentReply = async (req, res, next) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: 'Reply text is required' });
    }

    const conversation = await Conversation.findOne({ visitorId: req.params.visitorId });
    if (!conversation) return res.status(404).json({ success: false, message: 'Conversation not found' });

    conversation.messages.push({ sender: 'agent', text: text.trim(), agentName: req.user.name });
    conversation.lastMessageAt = new Date();
    conversation.hasUnreadForVisitor = true;
    await conversation.save();

    res.status(201).json({ success: true, data: conversation });
  } catch (err) {
    next(err);
  }
};

// @route PATCH /api/chat/admin/:visitorId/status
const updateConversationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const conversation = await Conversation.findOneAndUpdate(
      { visitorId: req.params.visitorId },
      { status },
      { new: true, runValidators: true }
    );
    if (!conversation) return res.status(404).json({ success: false, message: 'Conversation not found' });
    res.json({ success: true, data: conversation });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  startConversation,
  getVisitorConversation,
  sendVisitorMessage,
  getConversations,
  getConversationAdmin,
  sendAgentReply,
  updateConversationStatus,
};