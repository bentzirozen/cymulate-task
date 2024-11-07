# Web Scraping Application

This project is a full-stack web scraping application built with a NestJS server and a React (Next.js) client. The application allows users to submit a URL for scraping, retrieve and display extracted data, and manage user registration and login.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Running the Application](#running-the-application)
- [Docker Setup](#docker-setup)
- [API Endpoints](#api-endpoints)

---

## Overview

- **Server**: The backend is built with [NestJS](https://nestjs.com/), handling API requests, user authentication, and web scraping operations.
- **Client**: The frontend is built with [React (Next.js)](https://nextjs.org/), providing a user interface to submit URLs for scraping, view results, and manage user authentication.
- **Database**: MongoDB, managed via Mongoose, stores user data and scraped results.

## Technologies Used

- **Backend**: NestJS, TypeScript, Mongoose
- **Frontend**: React, Next.js, TypeScript, Axios, Tailwind CSS (for styling)
- **Database**: MongoDB
- **Docker**: For containerization and easy deployment

## Running the Application

## Docker Setup

To start the application with Docker Compose, follow these steps:

1. **Ensure Docker is running** on your machine.

2. In the project root directory, run the following command:

   ```bash
   docker-compose up --build
This command will:

Start the NestJS server on http://localhost:3000.
Start the Next.js client on http://localhost:3001.
Start a MongoDB instance on mongodb://localhost:27017.
Visit http://localhost:3001 in your browser to access the client application.


