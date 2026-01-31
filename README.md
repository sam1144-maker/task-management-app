Here is a professional `README.md` file for your project. You can copy and paste this directly into a file named `README.md` in the root of your project folder.

---

# Task Management App

A full-stack task management application designed to help users organize, track, and manage their daily tasks efficiently. Built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS.

## 🚀 Features

* **Create Tasks:** Add new tasks with a title and detailed description.
* **Task List:** View all tasks in a responsive grid layout.
* **Task Status Management:** Track progress by updating task status (Pending, In Progress, Completed).
* **Edit & Update:** Modify task details and change statuses dynamically.
* **Delete Tasks:** Remove unwanted tasks from the list.
* **Input Validation:** Robust form validation using **Zod** to ensure data integrity.
* **Real-time Feedback:** User-friendly toast notifications for success and error messages.
* **Responsive Design:** Fully responsive UI built with Tailwind CSS.

## 🛠️ Tech Stack

**Frontend:**

* React (Vite)
* Tailwind CSS
* React Router DOM
* Zod (Schema Validation)

**Backend:**

* Node.js
* Express.js
* MongoDB & Mongoose
* Cors & Dotenv

---

## ⚙️ Installation & Setup Guide

Follow these steps to set up the project locally.

### 1. Prerequisites

Ensure you have the following installed:

* [Node.js](https://nodejs.org/)
* [MongoDB](https://www.mongodb.com/) (Local or Atlas URL)

### 2. Backend Setup (`api`)

1. Navigate to the api folder:
```bash
cd api

```


2. Install dependencies:
```bash
npm install

```


3. Create a `.env` file in the `api` folder and add your variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string_here

```


4. Start the server:
```bash
npm start

```


*The backend will run at `http://localhost:3000*`

### 3. Frontend Setup (`client`)

1. Navigate to the client folder:
```bash
cd ../client

```


2. Install dependencies:
```bash
npm install

```


3. Create a `.env` file in the `client` folder:
```env
VITE_API_BASE_URL=http://localhost:3000/api

```


4. Start the React app:
```bash
npm run dev

```


*The frontend will run at `http://localhost:5173*`

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/task/get-all-task` | Fetch all tasks |
| `GET` | `/api/task/show-task/:id` | Get a specific task by ID |
| `POST` | `/api/task/create-task` | Create a new task |
| `PUT` | `/api/task/update-task/:id` | Update an existing task |
| `DELETE` | `/api/task/delete-task/:id` | Delete a task |

---

## 📂 Project Structure

```
task-management-app/
├── api/                 # Backend (Node/Express)
│   ├── controllers/     # Route logic
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   └── index.js         # Entry point
│
└── client/              # Frontend (React/Vite)
    ├── src/
    │   ├── components/  # Reusable UI components
    │   ├── pages/       # Application views
    │   ├── helper/      # Utilities (Toast, Validators)
    │   └── assets/      # Static files
    └── index.html

```
