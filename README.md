# ChatApp

ChatApp is a MERN chat application that allows users to connect with each other in real time using Socket.IO.

## Features

- User authentication and authorization using bcrypt
- Google or Facebook authentication Option
- User profile with avatar
- Real-time chat with text, and emoji support
- Chat rooms with multiple participants
- Responsive design

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
MONGO_URI=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

4. Run `npm run dev` to start the development server
5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app

## Demo

You can view a live demo of the app here: [https://connectmeapp.netlify.app/](https://connectmeapp.netlify.app/)

You can use the following credentials to log in or create your own account:

```
Email: test@test.com
Password: test123
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
