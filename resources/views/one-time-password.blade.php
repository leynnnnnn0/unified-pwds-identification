<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>One-Time Password | UPID</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f4f4f4;
        }

        .container {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .logo {
            display: block;
            max-width: 150px;
            margin: 0 auto 20px;
        }

        .otp {
            background-color: #f0f0f0;
            padding: 15px;
            text-align: center;
            font-size: 24px;
            letter-spacing: 5px;
            border-radius: 5px;
            font-weight: bold;
            color: #0066cc;
            margin: 20px 0;
        }

        .reset-link {
            text-align: center;
            margin: 25px 0;
        }

        .reset-button {
            display: inline-block;
            background-color: #0066cc;
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            transition: background-color 0.3s;
        }

        .reset-button:hover {
            background-color: #0052a3;
        }

        .divider {
            text-align: center;
            margin: 20px 0;
            color: #777;
            font-style: italic;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>

<body>
    <div class="container">
        <img src="{{ Vite::asset('resources/images/mainLogo.jpg')}}" alt="UPID logo" class="logo">

        <h2 style="text-align: center; color: #0066cc;">Password Reset Request</h2>

        <p>Hello,</p>

        <p>You have requested to reset your password for your UPID account. You can reset your password using either of the following methods:</p>

        <div class="reset-link">
            <a href="{{ $resetUrl }}" class="reset-button">Reset Password</a>
        </div>

        <div class="divider">— OR —</div>

        <p style="text-align: center;">Use this one-time password code:</p>

        <div class="otp">
            {{ $otp }}
        </div>

        <p style="text-align: center; color: #666;">This code will expire in 5 minutes.</p>

        <p style="margin-top: 25px;">If you did not request this password reset, please ignore this email or contact our support team immediately.</p>

        <div class="footer">
            <p>© {{ date('F d, Y') }} DAVID. All rights reserved.</p>
            <p>If you're having trouble clicking the "Reset Password" button, copy and paste the URL below into your web browser:</p>
            <p style="word-break: break-all; color: #0066cc;">{{ $resetUrl }}</p>
        </div>
    </div>
</body>

</html>