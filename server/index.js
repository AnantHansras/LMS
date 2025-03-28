const express = require('express')
const connect = require('./utils/dbConnect');
const app = express()
const userRoutes = require('./Routes/User')
const passwordRoutes = require('./Routes/Password')
const booksRoutes = require('./Routes/Books')
const cors = require('cors')
const dotenv = require('dotenv')

const cron = require('node-cron');
const { sendDueDateReminders,checkAndNotifyOverdueUsers } = require('./Controllers/Notification');

dotenv.config();
connect();
app.use(express.json());
app.use(
	cors({
		origin:"*",
		credentials:true,
	})
)

app.use('/user',userRoutes)
app.use('/password',passwordRoutes)
app.use('/book',booksRoutes)

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled task: Sending due date reminders...');
    await sendDueDateReminders();
    await checkAndNotifyOverdueUsers();
});