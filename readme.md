# Currency Exchange API

## Overview

The **Currency Exchange API** is a RESTful service that allows users to convert between different currencies using real-time exchange rates. The API also stores conversion history in a MongoDB database.

## Features

* Convert currency using real-time exchange rates.
* Store and retrieve past conversion transactions.
* Secure environment configuration with `.env`.
* CORS-enabled for cross-origin requests.

## Technologies Used

* **Node.js** - Backend runtime environment.
* **Express.js** - Web framework for Node.js.
* **MongoDB** - NoSQL database to store conversion history.
* **Mongoose** - ODM library for MongoDB.
* **Axios** - HTTP client for fetching exchange rates.
* **dotenv** - Environment variable management.
* **nodemon** - Development tool for auto-restarting server.
* **CORS** - Middleware for handling cross-origin requests.

## Installation & Setup

### Prerequisites

Make sure you have the following installed:

* **Node.js** (Latest version) - [Download](https://nodejs.org/)
* **MongoDB Atlas or Local MongoDB** - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* **Postman** (For API testing) - [Download](https://www.postman.com/)

### Clone the Repository

```sh
git clone https://github.com/BLOCK-PROGRAMR/ExchangeApi.git
cd currency-exchange-api
```

### Install Dependencies

```sh
npm install
```

### Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT
MONGODB_URI

```

### Start the Server

For development:

```sh
npm run dev   # Uses nodemon
```

For production:

```sh
npm start
```

## API Endpoints

### 1. Convert Currency

**POST** `/convert`

#### Request Body (JSON)

```json
{
  "from": "USD",
  "to": "EUR",
  "amount": 100
}
```

#### Response (JSON)

```json
{
  "from": "USD",
  "to": "EUR",
  "amount": 100,
  "convertedAmount": 92.5,
  "rate": 0.925
}
```

### 2. Get Conversion History

**GET** `/history`

#### Response (JSON)

```json
[
  {
    "from": "USD",
    "to": "EUR",
    "amount": 100,
    "convertedAmount": 92.5,
    "rate": 0.925,
    "timestamp": "2024-02-19T10:00:00.000Z"
  }
]
```

## Testing the API

Use **Postman** or **cURL** to send requests:

**Convert Currency Request (Using cURL):**

```sh
curl -X POST http://localhost:5000/convert \
-H "Content-Type: application/json" \
-d '{"from":"USD", "to":"EUR", "amount":100}'
```

**Get History Request:**

```sh
curl -X GET http://localhost:5000/history
```

## Deployment

## Future Improvements

* Add user authentication for secured access.
* Implement caching for faster response times.
* Introduce WebSocket support for live exchange rate updates.

## License

This project is licensed under the  **MIT License** .

---

### Developed by **Nithinkumar Pedda** 🚀
