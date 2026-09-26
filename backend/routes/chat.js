const express = require('express');
const {
  startConversation,
  getVisitorConversation,
  sendVisitorMessage,
  getConversations,
  getConversationAdmin,
  sendAgentReply,
  updateConversationStatus,
} = require('../controllers/chatController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Visitor side — public, no auth. Security relies on visitorId being an
// unguessable random UUID generated in the browser (see ChatWidget.jsx).
router.post('/visitor/start', startConversation);
router.get('/visitor/:visitorId', getVisitorConversation);
router.post('/visitor/:visitorId/message', sendVisitorMessage);

// Admin side — protected, Super Admin or Support Agent only.
router.get('/admin', protect, authorize('super_admin', 'support_agent'), getConversations);
router.get('/admin/:visitorId', protect, authorize('super_admin', 'support_agent'), getConversationAdmin);
router.post('/admin/:visitorId/reply', protect, authorize('super_admin', 'support_agent'), sendAgentReply);
router.patch('/admin/:visitorId/status', protect, authorize('super_admin', 'support_agent'), updateConversationStatus);

module.exports = router;