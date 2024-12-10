const Notification = require("../models/Notification");

const createNotification = async (req, res) => {
  try {
    const { message, userId } = req.body;

    const newNotification = new Notification({ message, userId });
    await newNotification.save();

    if (req.io) {
      req.io.emit("receive_notification", { message, userId });
    }

    res.status(201).json({ success: true, notification: newNotification });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createNotification, getNotifications };
