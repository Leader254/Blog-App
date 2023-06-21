import sql from "mssql";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../db/config.js";

// Register User Logic
export const Register = async (req, res) => {
  const { username, email, password, img } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .query(
        "SELECT * FROM Users WHERE username = @username OR email = @email"
      );

    const user = result.recordset[0];
    // console.log(user)
    if (user) {
      return res.status(409).json({ error: "User already exists" });
    } else {
      await pool
        .request()
        .input("username", sql.VarChar, username)
        .input("email", sql.VarChar, email)
        .input("password", sql.VarChar, hash)
        .input("img", sql.VarChar, img)
        .query(
          "INSERT INTO Users (username, email, password, img) VALUES (@username, @email, @password, @img)"
        );
      return res.status(200).json({ message: "User created! Successfully" });
    }
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: "An error occured while creating user" });
  } finally {
    sql.close();
  }
};

// Login User Logic
export const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    let pool = await sql.connect(config.sql);
    let result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM Users WHERE username = @username");

    const user = result.recordset[0];
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: "Incorrect password" });
      } else {
        const token = `JWT ${jwt.sign(
          {
            username: user.username,
            email: user.email,
          },
          config.jwt_secret,
          { expiresIn: "1h" }
        )}`;
        // res.cookie("access_token", token, {
        //     httpOnly: true,
        // }).status(200).json({ message: "User logged in successfully" });
        res.status(200).json({
          message: "User logged in successfully",
          username: user.username,
          email: user.email,
          token: token,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: "An error occured while logging in" });
  } finally {
    sql.close();
  }
};

// User Logout Logic
export const Logout = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      httpOnly: true,
    })
    .status(200)
    .json({ message: "User logged out successfully" });
};

