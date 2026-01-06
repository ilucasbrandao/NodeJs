import express from 'express';
import { PrismaClient } from '@prisma/client';

// Initialize Express app and Prisma Client
const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// Define the port
const PORT = 3000;

// -------- Routes CRUD ----------

// read
app.get('/users', async (request, response) => {
  try {
    const users = await prisma.user.findMany();
    response.status(200).json(users);
  } catch (error) {
    response.status(500).json({ message: 'Internal Server Error', error });
  }
});

// create
app.post('/users', async (request, response) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        bornAt: new Date(request.body.bornAt),
      },
    });
    response.status(201).json(newUser);
  } catch (error) {
    response.status(500).json({ message: 'Internal Server Error', error });
  }
});

// update
app.put('/', (request, response) => {});

// patch
app.patch('/', (request, response) => {});

// delete
app.delete('/', (request, response) => {});

app.listen(PORT, () => {
  console.log(`Server is listening on port http://localhost:${PORT}`);
});
