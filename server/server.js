const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const app = express();

// // Test
// app.get('/', (req, res) => {
//     res.send("hello");
// });

app.use(cors());
app.use(express.json());

app.post("/api/auth/register", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    // console.log(username, password);
    const user = await prisma.users.findUnique({
      where: {
        username,
      },
    });

    if (user) {
      return res.status(409).send({ message: "User already exists." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  } catch (error) {}
});

app.listen(3000);
