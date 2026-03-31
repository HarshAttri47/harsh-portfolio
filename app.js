const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
 
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
 
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  console.log('New contact message:');
  console.log(`From: ${name} (${email})`);
  console.log(`Message: ${message}`);
  res.json({ success: true, message: 'Message received! I will get back to you soon.' });
});
 
app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});