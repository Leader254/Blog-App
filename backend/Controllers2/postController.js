import sql from "mssql";
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
      .input("title", sql.NVarChar, title)
      .input("content", sql.NVarChar, content)
      .input("category", sql.NVarChar, category)
      .input("userId", sql.Int, userId)
      .query(
        "INSERT INTO Posts (title, content, category, userId) VALUES (@title, @content, @category, @userId)"
      );

    res.status(200).json({ message: "Post added successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while adding the post" });
  } finally {
    sql.close();
  }
};

// Getting all posts
export const getAllPosts = async (req, res) => {
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
    .request()
    .query("SELECT * FROM Posts");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving posts" });
  } finally {
    sql.close();
  }
};

// Getting one post
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Posts WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(result.recordset[0]);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the post" });
  } finally {
    sql.close();
  }
};

// Updating a post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;

  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("title", sql.NVarChar, title)
      .input("content", sql.NVarChar, content)
      .input("category", sql.NVarChar, category)
      .query(
        "UPDATE Posts SET title = @title, content = @content, category = @category WHERE id = @id"
      );

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while updating the post" });
  } finally {
    sql.close();
  }
};

// Deleting a post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Posts WHERE id = @id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting the post" });
  } finally {
    sql.close();
  }
};
