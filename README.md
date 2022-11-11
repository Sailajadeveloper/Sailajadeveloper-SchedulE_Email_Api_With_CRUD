# Schedule_Email_Api_With_CRUD
Api for sending mails by scheduling. also CRUD operations for schedule the emails.

In this code we can send mails through either sendgrid or nodemailer.
I have commented the code for sendgrid bcz of its private account. but the functionality I have written along with nodemailer functionality.

-> Because I haven't create any adminpanel or views(frontend) I have created CRUD (Create, read/list, Update, Delete) operations for cronjob schedule through API's only.

-> I have created global cronjob functionality for to send emails which are in user_email table with the latest schedule data from cronjob_schedule table.

-> Also have created separate API to schedule data for sending mails through API triggering.
