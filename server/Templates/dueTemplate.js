const dueSoonTemplate = (bookTitle, returnDate) => {
    return `
      <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Upcoming Book Due Reminder</title>
</head>
<body style="background: #f9f9f9; padding: 40px;">
  <div style="max-width: 500px; margin: auto; background: #fff; padding: 30px; 
              border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); 
              font-family: Arial, sans-serif; color: #333;">
              
    <h2 style="color: #f0ad4e; margin-bottom: 20px;">Upcoming Due Date</h2>
    
    <p>This is a friendly reminder that your borrowed book titled <strong>${bookTitle}</strong> is due in <strong>1 day</strong>.</p>
    
    <p>Please make sure to return it by <strong>${returnDate.toDateString()}</strong> to avoid any late return fines.</p>
    

    <div style="margin-top: 30px; font-size: 0.9em; color: #888;">
      Thank you for being a responsible reader.<br>
      — Library Management Team
    </div>
  </div>
</body>
</html>

    `;
  };

  module.exports = dueSoonTemplate;
  