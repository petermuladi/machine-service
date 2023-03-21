## ⚙Machine Service App

#### This is a web application designed for managing and tracking the repair status of machines. It allows users to add and edit machines, view their repair history, and update the status of ongoing repairs.

## Technologies

**Project is created with**

- Bootstrap: v5.3.0
- PHP/8.1.10
- PHP JSON
- PHP Mailer 6.7.1
- Javascript
- Rest Api

## Getting Started

- Clone the repository

```bash
git clone https://github.com/petermuladi/machine-service.git
```
- Import the **schema.sql** file into your MySQL database.
- Update the **config.php** file with your database credentials.
- Navigate to http://localhost/machine-service/view/index.html in your web browser to access the home page.

**Router**
☝The application uses a simple native JavaScript router, which allows for navigation and function execution without browser refresh. Note that if the page is refreshed, the main page must be reloaded.
To avoid any errors or issues, do not refresh the browser page after navigating to any other page within the application. If you do need to refresh the page, make sure to return to the **http://localhost/machine-service/view/index.html** page.

**Sending Emails with PHP Mailer**
To send emails from the application, you'll need to create a [Mailtrap](https://mailtrap.io/) account and update your **config.php** file with the **username** **pass** **port** credentials. This will ensure that emails are sent to the Mailtrap inbox rather than real email addresses.

**Error Handling**
The application includes robust error handling to catch and display any errors that may occur during use.

## Features

The application allows users to:

- Add new machines to the system.
- Sending an e-mail to the client about the status of the serviced machine.
- View the status of existing service requests.
- Pop up of client data belonging to the serviced machine.


## Development Environment

-	XAMPP web server package  3.3.0
-	Visual Studio Code 1.75
-	PHP 8.1
-	Apache/2.4.54 
-	Postman 10.12.0
-	OS:Windows 10
-	MySQL 15.1
-	phpMyAdmin 5.2.0
-	MariaDB 10.4.25

## Documentation
- **Find in** -> **pdf-diagrams** -> **📊UML diagrams**
- Deployment 
- Package 
- UseCase
- Class

## Coding standards
- The **MVC-based** structure and the use of **Object Oriented** logic are expected.

## Additional Notes
**The application was created by Muladi Péter.**