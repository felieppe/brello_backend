
# Brello API

Brello is a clone of the popular Trello task management application. This project provides the backend API built with Node.js and Express.js. The API serves as the foundation for managing tasks, boards, lists, and more.
## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

## Features

- **Task Management**: Create, read, update, and delete tasks.
- **Board Management**: Organize tasks within boards.
- **List Management**: Group tasks into lists on each board.

## Technologies

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the API.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (Node package manager)

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/yourusername/brello-backend.git
    cd brello-backend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

## Running the Server

To start the server, run:

```bash
npm start
```
The server will be running on `http://localhost:3005`.

## API Endpoints

### Tasks

-   **GET** `/v1/tasks` - Get all tasks.
-   **GET** `/v1/tasks/:id` - Get a task by ID.
-   **POST** `v1/tasks/` - Post a task.
-   **PUT** `v1/tasks/:id` - Edit a whole task.
-   **PATCH** `v1/tasks/:id` - Edit a field or more of a task.
-   **DELETE** `v1/tasks/:id` - Remove a task.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue.
