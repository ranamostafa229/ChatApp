# Chat App Using MERN Stack

ConnectMe is a MERN chat application that allows users to connect with each other in real time using Socket.IO.

## Features

- User authentication and authorization using bcrypt
- Google or Facebook authentication Option

  ![Screenshot (1343)](https://github.com/ranamostafa229/real_estate_app/assets/57458722/6348b6de-808e-4aad-8d73-0f60f81ef3d9)

- User profile with avatar using this api  <a href='https://api.multiavatar.com/'> https://api.multiavatar.com/</a>

  ![Screenshot (1342)](https://github.com/ranamostafa229/real_estate_app/assets/57458722/74129e99-15db-4baa-b020-2f70fe75f60e)
  
- Real-time chat with text, and emoji support
- Chat rooms with multiple participants

  ![Screenshot (1344)](https://github.com/ranamostafa229/real_estate_app/assets/57458722/e138b47f-7b85-43b2-a8d8-c5f5cba72fbb)
  
- Responsive design

  ![Screenshot (1345)](https://github.com/ranamostafa229/real_estate_app/assets/57458722/d2b7601b-3149-41c0-97d2-1d1235d5d665)

## Technologies

- React for the front-end
- Node.js and Express for the back-end
- MongoDB and Mongoose for the database
- Socket.IO for real-time communication
- Styled-components for styling
- Firebase for authentication

## Installation

To run this project locally, you need to have Node.js and MongoDB installed on your machine.

1. Clone this repository or download the zip file
2. Navigate to the project directory and run `npm install` to install the dependencies
3. Create a `.env` file in the root folder and add the following variables:

```
PORT=5000
MONGO_URI = your_mongodb_connection_string
ORIGIN ='http://localhost:3000'
AVATARAPIKEY = your_api_key //in client folder
```

4. Run `npm run dev` to start the development server
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app

## Demo

You can view a live demo of the app here: [https://connectmeapp.netlify.app/](https://connectmeapp.netlify.app/)

