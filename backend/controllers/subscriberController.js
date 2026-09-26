const Subscriber = require('../models/Subscriber');

const subscribe = async (req, res, next) => {
  try {
    const { name, contact, channel, source } = req.body;
    if (!contact || !channel) {
      return res.status(400).json({ success: false, message: 'Contact detail and channel are required' });
    }
    const subscriber = await Subscriber.create({ name, contact, channel, source });
    res.status(201).json({ success: true, message: 'Subscribed successfully', data: subscriber });
  } catch (err) {
    next(err);
  }
};

const getSubscribers = async (req, res, next) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json({ success: true, data: subscribers, total: subscribers.length });
  } catch (err) {
    next(err);
  }
};

module.exports = { subscribe, getSubscribers };
