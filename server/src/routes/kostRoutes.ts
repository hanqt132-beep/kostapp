import express from 'express';
import prisma from '../utils/prisma';

const router = express.Router();

// Get all kosts
router.get('/', async (req, res) => {
  try {
    const kosts = await prisma.kost.findMany();
    // Parse json fields
    const parsedKosts = kosts.map(k => ({
      ...k,
      images: typeof k.images === 'string' ? JSON.parse(k.images) : k.images,
      fac: typeof k.fac === 'string' ? JSON.parse(k.fac) : k.fac
    }));
    res.json(parsedKosts);
  } catch (error) {
    res.status(500).json({ error: 'Server error retrieving kosts' });
  }
});

// Get kost by id
router.get('/:id', async (req, res) => {
  try {
    const kost = await prisma.kost.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!kost) return res.status(404).json({ error: 'Kost not found' });
    
    res.json({
      ...kost,
      images: typeof kost.images === 'string' ? JSON.parse(kost.images) : kost.images,
      fac: typeof kost.fac === 'string' ? JSON.parse(kost.fac) : kost.fac
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
