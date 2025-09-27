<?php
$servername = "localhost";
$username = "root";  // الافتراضي في XAMPP
$password = "";      // فاضي افتراضياً
$dbname = "mydb";

// اتصال بقاعدة البيانات
$conn = new mysqli($servername, $username, $password, $dbname);

// لو فيه مشكلة في الاتصال
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// استقبال البيانات من الفورم
$user = $_POST['username'];
$pass = $_POST['password'];

// تشفير الباسورد
$hashed_pass = password_hash($pass, PASSWORD_DEFAULT);

// حفظ البيانات في الجدول
$sql = "INSERT INTO users (username, password) VALUES ('$user', '$hashed_pass')";

if ($conn->query($sql) === TRUE) {
    echo "Account created successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
