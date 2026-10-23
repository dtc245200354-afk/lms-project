const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Kết nối MySQL với charset utf8mb4
const db = mysql.createPool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'rootpassword',
    database: process.env.DB_NAME || 'lms_db',
    charset: 'utf8mb4'
});

// API Đăng nhập
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT id, name, email FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) return res.status(500).json({ message: "Lỗi máy chủ." });
        if (results.length === 0) return res.status(401).json({ message: "Sai email hoặc mật khẩu!" });
        res.json({ message: "Đăng nhập thành công!", user: results[0] });
    });
});

// API Đăng ký
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, password], (err) => {
        if (err) return res.status(400).json({ message: "Email đã tồn tại!" });
        res.json({ message: "Đăng ký thành công! Hãy đăng nhập." });
    });
});

// API Khóa học & Bài học & Học viên
app.get('/api/courses', (req, res) => {
    db.query('SELECT * FROM courses', (err, results) => res.json(err ? [] : results));
});
app.get('/api/courses/:id/lessons', (req, res) => {
    db.query('SELECT * FROM lessons WHERE course_id = ?', [req.params.id], (err, results) => res.json(err ? [] : results));
});
app.get('/api/students', (req, res) => {
    db.query('SELECT id, name, email, created_at FROM users WHERE role = "student"', (err, results) => res.json(err ? [] : results));
});

app.listen(3000, () => console.log('Backend chạy ở cổng 3000'));
