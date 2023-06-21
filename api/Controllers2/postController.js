import sql from "mssql"
import config from "../db/config.js";
import jwt from "jsonwebtoken";


// Handler for adding a post
export const addPost = async (req, res) => {
    const { title, content, category } = req.body;
    
    // Get the user ID from the JWT token
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, config.jwt_secret);
    const userId = decodedToken.userId;
  
    try {
      let pool = await sql.connect(config.sql);
      let result = await pool
        .request()
        .input('title', sql.NVarChar, title)
        .input('content', sql.NVarChar, content)
        .input('category', sql.NVarChar, category)
        .input('userId', sql.Int, userId)
        .query('INSERT INTO Posts (title, content, category, userId) VALUES (@title, @content, @category, @userId)');
  
      res.status(200).json({ message: 'Post added successfully' });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'An error occurred while adding the post' });
    } finally {
      sql.close();
    }
  };



// Getting all posts logic
export const getPosts = async (req, res) =>{
    res.send("Getting all posts")
}

// Getting one post
export const getPost = async (req, res) =>{
    res.send("Getting one post")
}

// Updating a post
export const updatePost = async (req, res) =>{
    res.send("Updating a post")
}

// Deleting a post
export const deletePost = async (req, res) =>{
    res.send("Deleting a post")
}
