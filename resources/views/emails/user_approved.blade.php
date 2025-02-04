<?php
$loginUrl = route('login');
?>
<!DOCTYPE html>
<html>

<head>
    <title>Account Approved</title>
</head>

<body>
    <h1>Hello, {{ $user->name }}!</h1>
    <p>Your account has been approved by the super admin. You can now log in and access your dashboard.</p>
    <p>Thank you!</p>
    <p>
        <a href="{{ $loginUrl }}"
            style="display: inline-block; padding: 10px 20px; background-color: #141414; color: #ffffff; text-decoration: none; border-radius: 5px;">
            <button
                style="background: none; border: none; color: white; cursor: pointer; font-size: inherit; padding: 0;">Login
                Now</button>
        </a>
    </p>
</body>

</html>
