const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  const db = req.db;
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Missing email or password' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';

  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('❌ Login error:', err);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }

    if (results.length > 0) {
      console.log('✅ Login successful:', email);
      res.json({ success: true, message: 'Login successful' });
    } else {
      console.log('❌ Invalid credentials for:', email);
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  });
});

module.exports = router;
