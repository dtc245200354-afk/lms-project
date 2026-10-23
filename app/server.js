const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Kết nối MySQL
const db = mysql.createPool({
  host: process.env.DB_HOST || 'db',
  user: process.env.DB_USER || 'lms_user',
  password: process.env.DB_PASSWORD || 'lms_password',
  database: process.env.DB_NAME || 'lms_db',
  waitForConnections: true,
  connectionLimit: 10
});

// Endpoint kiểm tra trang chủ LMS
app.get('/', (req, res) => {
  res.json({ message: "Chào mừng đến với Hệ thống Học trực tuyến (LMS đơn giản)" });
});

// API lấy danh sách khóa học
app.get('/api/courses', (req, res) => {
  db.query('SELECT * FROM courses', (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi truy vấn Database", details: err.message });
    }
    res.json({ courses: results });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`LMS Web App đang chạy tại port ${PORT}`);
});
