<?php
include 'db.php';
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $username = $_POST['username'];
  $email = $_POST['email'];
  $pass1 = $_POST['password1'];
  $pass2 = $_POST['password2'];

  if ($pass1 !== $pass2) {
    echo json_encode(["status" => "error", "message" => "Passwords do not match"]);
    exit;
  }

  $password = password_hash($pass1, PASSWORD_BCRYPT);

  $sql = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')";
  if ($conn->query($sql) === TRUE) {
    echo json_encode([
    "status" => "success",
    "message" => "Account created successfully",
    "redirect" => "index.html" 
]);
  } else {
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
  }
}
?>
