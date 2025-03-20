const otpTemplate = (otp) => {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #05080f;
            color: #ffffff;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: rgba(20, 25, 40, 0.9);
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(12px);
            overflow: hidden;
            padding: 0px;
        }

        .header {
            background-color: #0d1a35;
            color: #a3bffa;
            text-align: center;
            padding: 20px;
            font-size: 24px;
            font-weight: bold;
        }

        .content {
            text-align: center;
            padding: 20px;
        }

        .content p {
            font-size: 16px;
            line-height: 1.5;
            color: #cbd5e1;
        }

        .otp-code {
            display: inline-block;
            padding: 12px 24px;
            font-size: 24px;
            color: #ffffff;
            background-color: #1e40af;
            border-radius: 6px;
            letter-spacing: 2px;
            margin: 20px 0;
            font-weight: bold;
            box-shadow: 0 0 8px rgba(30, 64, 175, 0.8);
        }

        .footer {
            background-color: rgba(20, 25, 40, 0.9);
            color: #cbd5e1;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }

        .footer a {
            color: #a3bffa;
            text-decoration: none;
        }

        .footer a:hover {
            text-decoration: underline;
        }
    </style>
</head>

<body>
    <div class="email-container">
        <div class="header">
            Welcome to Library Managmnet System
        </div>
        <div class="content">
            <p>Hi there!</p>
            <p>We received a request to verify your email address for Resume Builder. Please use the OTP below to proceed:</p>
            <div class="otp-code">${otp}</div>
            <p>If you didn't request this, please ignore this email or contact our support team.</p>
        </div>
        <div class="footer">
            <p>&copy; 2025 Resume Builder. All rights reserved.</p>
            <p><a href="#">Privacy Policy</a> | <a href="#">Support</a></p>
        </div>
    </div>
</body>
</html>`;
}

module.exports = otpTemplate;

