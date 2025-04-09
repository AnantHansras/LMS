const fineTemplate = (bookTitle,fine) => {
    return `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Overdue Book Notice</title>
</head>
<body style="background: #f5f5f5; padding: 40px;">
  <div style="max-width: 500px; margin: auto; background: #fff; padding: 30px; 
              border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); 
              font-family: Arial, sans-serif; color: #333;">
    <h2 style="color: #d9534f; margin-bottom: 20px;">Overdue Book Notice</h2>
    
    <p>We hope you're enjoying your reading experience. However, this is a gentle reminder that the book you borrowed titled <strong>${bookTitle}</strong> is now <strong>overdue</strong>.</p>
    
    <p>Your current fine stands at <strong>₹${fine}</strong>.</p>
    
    <p>We kindly request you to return the book at the earliest convenience to avoid additional charges. If you've already returned the book, please disregard this message.</p>
    
    <p>If you have any questions or concerns, feel free to contact our support team.</p>

    <div style="margin-top: 30px; font-size: 0.9em; color: #888;">
      Thank you for your attention.<br>
      — Library Management Team
    </div>
  </div>
</body>
</html>

    `;
  };
  
  module.exports = fineTemplate;