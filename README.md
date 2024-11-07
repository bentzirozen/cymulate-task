# Web Scraping Application

This project is a full-stack web scraping application built with a NestJS server and a React (Next.js) client. The application allows users to submit a URL for scraping, and it retrieves and displays extracted data such as domains and URLs from the specified website.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
- [Docker Setup](#docker-setup)
- [API Endpoints](#api-endpoints)
- [License](#license)

---

## Overview

- **Server**: The backend is built with [NestJS](https://nestjs.com/), handling API requests and performing web scraping operations.
- **Client**: The frontend is built with [React (Next.js)](https://nextjs.org/), providing a user interface to submit URLs for scraping and view results.
- **Database**: MongoDB, managed via Mongoose, stores scraped data.

## Technologies Used

- **Backend**: NestJS, TypeScript, Mongoose, TypeORM (optional for relational DB support)
- **Frontend**: React, Next.js, TypeScript, Axios, Tailwind CSS (for styling)
- **Database**: MongoDB
- **Docker**: For containerization and easy deployment

## Project Structure

```plaintext
project-root/
├── server/            # NestJS server
│   ├── src/
│   └── Dockerfile
├── client/            # React (Next.js) client
│   ├── pages/
│   └── Dockerfile
├── README.md
└── docker-compose.yml # Docker Compose configuration
