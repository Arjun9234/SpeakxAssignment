# QuestionSearch

![Project Screenshot](https://github.com/user-attachments/assets/847a87a3-966f-4a13-980f-21cae2dd350f)


QuestionSearch is a search functionality for a question database built using Vite, React, MongoDB, gRPC, Fetch API and Express. The project allows users to search and interact with a collection of questions efficiently. The backend uses gRPC for communication, while the frontend is built with React and Vite for faster development and builds.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v17.0 or higher)
- MongoDB instance running locally or on a cloud service
- gRPC and protobuf installed for backend communication

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
https://github.com/user-attachments/assets/60912ee3-3558-428a-8731-dc1c50162098


### Search For Read Along Type of Questions:
https://github.com/user-attachments/assets/7e2e8be6-8452-4221-805f-06c62ab51457


### Search For MCQ Type of Questions:
https://github.com/user-attachments/assets/36373d3c-da2e-452a-ada3-9ce6881323fc


### Search For Anagram Type of Questions: 
https://github.com/user-attachments/assets/826328c6-f2e7-4407-9956-3414407047aa


### Search For Content Only Type of Questions:
https://github.com/user-attachments/assets/60912ee3-3558-428a-8731-dc1c50162098
