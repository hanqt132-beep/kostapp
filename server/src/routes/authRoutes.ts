import express from 'express';
import prisma from '../utils/prisma';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, username, contact, password, role } = req.body;
    
    // Check if exists
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { contact }
        ]
      }
    });

    if (existing) {
      return res.status(400).json({ error: 'Username or contact already exists' });
    }

    const user = await prisma.user.create({
      data: {
        name,
        username,
        contact,
        password, // In professional app, use bcrypt here
        role: role || 'user',
        photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`
      }
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { identity, password } = req.body;
    
    // Hardcoded Admin Fallback
    if (identity === 'admin' && (password === 'Admin123' || password === 'Admin123!')) {
      return res.json({
        id: 'admin_001',
        name: 'Admin KostApp',
        username: 'admin',
        contact: 'admin@kostapp.id',
        password,
        photo: 'https://ui-avatars.com/api/?name=Admin+KostApp&background=00875A&color=fff&rounded=true&size=128',
        role: 'admin',
        createdAt: new Date().toISOString()
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: identity },
          { contact: identity }
        ],
        password: password // Direct match for simplicity in migration
      }
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
