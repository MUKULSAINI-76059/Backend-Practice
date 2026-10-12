                                ## 🔴 Post Sharing App (MERN) – Setup Guide

This project allows users to:

* Create a post with image and caption
* Upload image to backend
* Store data in MongoDB
* View all posts in Feed

---

## 1. Project Structure

```
project-root
│
├── backend
│   ├── models
│   ├── routes
│   ├── uploads
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── frontend
    ├── src
    │   ├── pages
    │   │   ├── CreatePost.jsx
    │   │   └── Feed.jsx
    │   ├── App.jsx
    │   └── App.css
    └── package.json
```

---

 
                                ## 🔴 2. Backend Setup
                                
### Step 1: Install dependencies

Go to backend folder:

```
cd backend
npm install express mongoose multer cors dotenv nodemon
```

---

### Step 2: Create `.env`

```
PORT=3003
MONGODB_URI=your_mongodb_connection_string
```

---

### Step 3: Connect MongoDB (server.js)

```js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch(err => console.log(err));
```

---

### Step 4: Create Post Model

`models/Post.js`

```js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  image: String,
  caption: String
}, { timestamps: true });

module.exports = mongoose.model("Post", postSchema);
```

---

### Step 5: Image Upload using Multer

```js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });
```

---

### Step 6: Create Post API

```js
const Post = require("./models/Post");

app.post("/create-post", upload.single("image"), async (req, res) => {
  try {
    const newPost = new Post({
      image: `http://localhost:3003/uploads/${req.file.filename}`,
      caption: req.body.caption
    });

    await newPost.save();
    res.json({ message: "Post created", post: newPost });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

Serve images:

```js
app.use("/uploads", express.static("uploads"));
```

---

### Step 7: Get All Posts API

```js
app.get("/post", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json({ posts });
});
```

---

### Step 8: Start Backend

```
npm run dev
```

Server runs on:

```
http://localhost:3003
```

---

                             ## 🔴 3. Frontend Setup

### Step 1: Install dependencies

```
cd frontend
npm install axios react-router-dom
```

Run project:

```
npm run dev
```

---

## 4. Create Post Component

Features:

* Upload image
* Enter caption
* Submit to backend
* Form clears after submit

```js
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("image", image);
  formData.append("caption", caption);

  await axios.post("http://localhost:3003/create-post", formData);

  setImage(null);
  setCaption("");
  e.target.reset();
};
```

---

## 5. Feed Component

Fetch and display posts:

```js
useEffect(() => {
  axios.get("http://localhost:3003/post")
    .then(res => setPosts(res.data.posts));
}, []);
```

---

## 6. Routing (App.jsx)

```js
<Router>
  <Routes>
    <Route path="/create-post" element={<CreatePost />} />
    <Route path="/feed" element={<Feed />} />
  </Routes>
</Router>
```

---

## 7. How to Use

1. Start MongoDB / Atlas
2. Run backend:

   ```
   npm run dev
   ```
3. Run frontend:

   ```
   npm run dev
   ```
4. Open:

   ```
   http://localhost:5173/create-post
   ```
5. Create post → Go to `/feed` to see all posts

---

## 8. Features Completed

* Image upload
* MongoDB storage
* Feed display
* Form reset after submit
* API integration
* React routing

---

## 9. Next Improvements (Optional)

* Authentication (JWT)
* Like & Comment
* Delete post
* User profile
* Cloud image upload (Cloudinary)

---

## Author

Mukul is a passionate MERN Stack learner focused on building full-stack web applications using MongoDB, Express, React, and Node.js. 🚀