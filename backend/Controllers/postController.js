import sql from "mssql";
import config from "../db/config.js";
// import jwt from "jsonwebtoken";

// Handler for adding a post
export const addPost = async (req, res) => {
  const { title, description, img, category, uid, post_date } = req.body;

  try {
    let pool = await sql.connect(config.sql);
    await pool
      .request()
      .input("title", sql.VarChar, title)
      .input("description", sql.VarChar, description)
      .input("img", sql.VarChar, img)
      .input("category", sql.VarChar, category)
      .input("uid", sql.Int, uid)
      .input("post_date", sql.DateTime, post_date)
      .query(
        "INSERT INTO Posts (title, description, img, category, uid, post_date) VALUES (@title, @description, @img, @category, @uid, GETDATE())" // Use GETDATE() to get the current date and time
      );

    res.status(200).json({ message: "Post added successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
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
    // console.log(error);
    return res
      .status(500)
      .json({ error: "An error occurred while retrieving the post" });
  }
};


// Updating a post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description, img } = req.body;

  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("id", sql.Int, id)
      .input("title", sql.VarChar, title)
      .input("description", sql.VarChar, description)
      .input("img", sql.VarChar, img)
      .query(
        "UPDATE Posts SET title = @title, description = @description, img = @img WHERE id = @id"
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
