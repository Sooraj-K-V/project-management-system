# project-management-system

## TECH STACK
-Node.js
-Express.js
-MongoDB
-Mongoose
-JWT
-Dotenv
-Nodemon

## INSTALLATION
git clone https://github.com/Sooraj-K-V/project-management-system.git
cd project-management-system
npm install

## .ENV FILE
-PORT=5000
-JWT_SECRET=Your-Secret
-DB_URL=mongodb+srv://<username>:<password>@pms-cluster.rlat2pa.mongodb.net/?retryWrites=true&w=majority&appName=pms-cluster
-SALT_ROUND=10

## RUN SERVER
nodemon index.js

## API-Routes--
### [ USER CONTROL ]
-User register/login
POST http://localhost:5000/api/user/register
POST http://localhost:5000/api/user/login

### [ PROJECT CONTROL ]
-Add Project
POST http://localhost:5000/api/project/add (Bearer token needed)

-Get Projects
GET http://localhost:5000/api/project/get (Bearer token needed)

-Delete Projects
DELETE http://localhost:5000/api/project/delete/:projectId (Bearer token needed)

### [ TASK CONTROL ]
-Add Task
POST http://localhost:5000/api/task/add (Bearer token needed)

-Update Task Status
PATCH http://localhost:5000/api/task/update/:taskId (Bearer token needed)

-Get Tasks Of Specific Project
GET http://localhost:5000/api/task/:projectId (Bearer token needed)

-Filter The tasks Of Specific Project By Task Status
GET http://localhost:5000/api/task/filter/:projectId (Bearer token needed)