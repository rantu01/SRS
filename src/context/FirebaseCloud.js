// Example Firebase Cloud Function
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.getUserCount = functions.https.onRequest(async (req, res) => {
  try {
    const listUsersResult = await admin.auth().listUsers();
    res.json({ count: listUsersResult.users.length });
  } catch (error) {
    console.error('Error listing users:', error);
    res.status(500).json({ error: 'Failed to get user count' });
  }
});