import { app } from "../config/firebase.js";
import { getAuth } from "firebase-admin/auth";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  let decodedToken;
  try {
    decodedToken = await getAuth(app).verifyIdToken(token);
  } catch (error) {
    console.error("Firebase token verification failed:", error);
    return res.status(401).json({ error: "Invalid Firebase token" });
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not configured");
    return res.status(500).json({ error: "Authentication is not configured" });
  }

  try {
    const user = await User.findOneAndUpdate(
      { firebaseId: decodedToken.uid },
      {
        $set: {
          name: decodedToken.name || "",
          email: decodedToken.email || "",
          picture: decodedToken.picture || "",
        },
        $setOnInsert: {
          firebaseId: decodedToken.uid,
        },
      },
      { upsert: true, returnDocument: "after" }
    );

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({ message: "Login successful", user, token: jwtToken });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Unable to complete login" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "strict" });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const me = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};