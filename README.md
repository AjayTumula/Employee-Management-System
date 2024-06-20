# Overview
This project is the development and implementation of the Employee Management Software (EMS), a full-stack application aimed at managing employee records, departments, employee profiles, and implementing user authentication and authorization functionalities.

# Functionality
The EMS application encompasses the following key functionalities:

1. Employee Management
Add, edit, and delete employee records.
View a list of employees with pagination.
Search and filter employees by various criteria (e.g., department, job title).

2. Department Management:
Manage departments including adding, editing, and deleting department records.
Associate employees with departments.

3. Employee Profile:
Users should be able to view their personal details and employment information.

4. User Authentication and Authorization
Jwt is used to implement user registration and login functionality with authentication and authorization controls.


# Technical Specifications:

## The EMS application was developed using the following technologies: 
## UI Framework: React JS  
## Styling: Bootstrap 
## Routing: React Router DOM 
## Backend: Express JS for building REST APIs 
## Database: MySQL

# Setup Instructions
## Prerequisites:
1.	Node.js and npm: Ensure Node.js which includes npm is installed. You can download it from nodejs.org.
2.	MySQL Database: Install MySQL Server and ensure it is running. You can download MySQL from mysql.com or use a cloud-based MySQL service.
3.	Git: Install Git for cloning the repository (optional if you download the code as a ZIP file).

## Step-by-Step Setup
1. Clone the Repository
        git clone “https://github.com/AjayTumula/Employee-Management-System”
         cd <project_directory>

2. Set Up Backend (Node.js with Express.js)
2.1. Install Backend Dependencies
            	cd backend
            	npm install

2.2. Configure MySQL Database
2.2.1.	Create a MySQL database for your application.
2.2.2.	Modify the database configuration in backend/database.js to match your database credentials:
          module.exports = {
            HOST: "localhost",
            USER: "your_username",
            PASSWORD: "your_password",
            DB: "your_database_name",
          };


2.4. Start the Backend Server
		      npm start
This will start the backend server at http://localhost:3000.
3. Set Up Frontend (React.js)
3.1. Install Frontend Dependencies
          cd frontend
          npm install

3.2. Configure Backend API URL
In your frontend code, ensure the API calls are directed to the correct backend URL. 
		    const API_URL = 'http://localhost:3000/api'

3.3. Start the Frontend Development Server
		        npm start
This will start the frontend development server at http://localhost:5173.
4. Testing the Application
4.1.	Open your web browser and navigate to http://localhost: 5173 to see the application running.
4.2.	Register a user, login, and ensure CRUD operations (if implemented) work correctly.




