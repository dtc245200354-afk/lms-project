CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role ENUM('student', 'instructor', 'admin') DEFAULT 'student'
);

CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chèn dữ liệu mẫu
INSERT INTO courses (title, description) VALUES 
('Lập trình Web cơ bản', 'Khóa học HTML, CSS, JavaScript dành cho người mới'),
('Triển khai Hệ thống Docker', 'Khóa học đóng gói và quản trị ứng dụng với Docker');
