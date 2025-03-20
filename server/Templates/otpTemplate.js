const otpTemplate = (otp) => {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification - Resume Builder</title>
    <style>
        body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #f9faff;
            color: #07142b;
        }

        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }

        .header {
            background-color: #ffc85e;
            color: #07142b;
            text-align: center;
            padding: 20px;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
        }

        .content {
            padding: 20px;
            text-align: center;
        }

        .content p {
            font-size: 16px;
            line-height: 1.5;
            margin: 0 0 20px;
            color: #46464e;
        }

        .otp-code {
            display: inline-block;
            padding: 10px 20px;
            font-size: 24px;
            color: #ffffff;
            background-color: #07142b;
            border-radius: 4px;
            letter-spacing: 2px;
            margin: 20px 0;
        }

        .footer {
            background-color: #f9faff;
            color: #46464e;
            text-align: center;
            padding: 10px;
            font-size: 12px;
        }

        .footer a {
            color: #07142b;
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
            <h1>Welcome to Resume Builder</h1>
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
