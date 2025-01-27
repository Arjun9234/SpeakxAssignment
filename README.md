# QuestionSearch

![Project Screenshot](https://github.com/user-attachments/assets/847a87a3-966f-4a13-980f-21cae2dd350f)

**QuestionSearch** is a search functionality for a question database built using React, MongoDB, gRPC, Fetch API, and Express. The project allows users to search and interact with a collection of questions efficiently. The backend uses gRPC for communication, while the frontend is built with React for fast development.

## Prerequisites

Before you begin, ensure you have met the following requirements:

### 1. Node.js (v17.0 or higher)
Download and install Node.js from [here](https://nodejs.org/en/).

### 2. MongoDB Instance
- **Local MongoDB**: Install MongoDB locally or use a cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
- **MongoDB Compass**: Install MongoDB Compass to visually manage your MongoDB database. [MongoDB Compass Download](https://www.mongodb.com/products/compass).

### 3. gRPC & Protocol Buffers (protobuf)
- Install **gRPC** for communication between the backend and frontend. Follow the installation guide for gRPC [here](https://grpc.io/docs/languages/node/).
- Install **protobuf**: Follow the installation guide for **protobuf** [here](https://developers.google.com/protocol-buffers).

### 4. React (v17 or higher)
React will be used for building the frontend of the application. You can install React by running:
```bash
npx create-react-app question-search
```

## Installation

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/Arjun9234/SpeakxAssignment
   cd SpeakXAssignment/backend
2. Install backend dependencies:
   ```bash
   npm install
3. Start the backend server:
   ```bash
   npm start

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd SpeakxAssignment/frontend
2. Install frontend dependencies:
   ```bash
   npm install
3. Start the frontend server:
   ```bash
   npm start


### Connect to MongoDB
Ensure there is a .env file in the backend directory with the following variables:
```bash
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
```
```
 <username>: Your MongoDB username
 <password>: Your MongoDB password
 <cluster-url>: MongoDB cluster URL
 <database-name>: Name of the database
```


### Usage
Once both the frontend and backend servers are running, you can access the application via http://localhost:3000 (or whichever port the frontend is running on). You can use the search functionality to query the question database.

### Search For All Type Of Questions: 
![Project Screenshot](https://github.com/user-attachments/assets/60912ee3-3558-428a-8731-dc1c50162098)


### Search For Read Along Type of Questions:
![Project Screenshot](https://github.com/user-attachments/assets/36373d3c-da2e-452a-ada3-9ce6881323fc)


### Search For MCQ Type of Questions:
![Project Screenshot](https://github.com/user-attachments/assets/7e2e8be6-8452-4221-805f-06c62ab51457)


### Search For Anagram Type of Questions: 
![Project Screenshot](https://github.com/user-attachments/assets/826328c6-f2e7-4407-9956-3414407047aa)


### Search For Content Only Type of Questions:
![Project Screenshot](https://github.com/user-attachments/assets/826328c6-f2e7-4407-9956-3414407047aa)
