import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/user", async (req, res) => {
  try {
    const response = await prisma.user.findMany();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.post("/addUser", async (req, res) => {
  const user = req.body;
  try {
    const product = await prisma.user.create({
      data: user,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.post("/addPost", async (req, res) => {
  const post = req.body;
  try {
    const product = await prisma.post.create({
      data: post,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.post("/updatePost", async (req, res) => {
  const id = req.body.id;
  const post = req.body;
  delete post.id;
  try {
    const product = await prisma.post.update({
      where: {
        id: id,
      },
      data: post,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.delete("/deletePost/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const product = await prisma.post.delete({
      where: {
        id: id,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

app.listen(process.env.APP_PORT, () => {
  console.log("Server running in port");
});
