import express from 'express';
import prisma from '../utils/prisma';

const router = express.Router();

// Initiate Transaction
router.post('/initiate', async (req, res) => {
  try {
    const data = req.body;
    
    // Quick validation
    if (!data.userId || !data.kostId) {
       return res.status(400).json({ error: 'Missing userId or kostId' });
    }

    const transaction = await prisma.transaction.create({
      data: {
        ...data,
      }
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error initiating transaction' });
  }
});

// Update Transaction Status
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, qrData } = req.body;
    
    const updateData: any = { status };
    if (qrData) {
       updateData.qrData = qrData;
       updateData.qrScanned = true;
       updateData.qrValidatedAt = new Date();
    }
    
    if (status === 'COMPLETED') {
       updateData.completedAt = new Date();
    } else if (status === 'CONFIRMED') {
       updateData.confirmedAt = new Date();
    }

    const transaction = await prisma.transaction.update({
      where: { transactionId: id },
      data: updateData
    });

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Server error parsing transaction status' });
  }
});

// Complete transaction (Create booking)
router.post('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;
    
    const txn = await prisma.transaction.findUnique({
      where: { transactionId: id }
    });

    if (!txn) return res.status(404).json({ error: 'Transaction not found' });

    let amountPaid = txn.amountPaid || 0;
    let newStatus = 'COMPLETED';
    
    if (txn.paymentOption === 'OPTION_A') {
      amountPaid = txn.totalAmount;
    } else if (txn.paymentOption === 'OPTION_B') {
      amountPaid = txn.dpAmount || 0;
      newStatus = 'DP_PAID';
    } else if (txn.paymentOption === 'OPTION_C') {
      amountPaid = txn.depositAmount || 0;
      newStatus = 'WAITING_VERIFICATION';
    }
    
    // Update Transaction
    await prisma.transaction.update({
       where: { transactionId: id },
       data: {
         status: newStatus,
         completedAt: new Date(),
         amountPaid,
         remainingAmount: txn.totalAmount - amountPaid,
         contractAccepted: true,
         contractAcceptedAt: new Date()
       }
    });

    // Create Booking
    const bookingStatus = 
        txn.paymentOption === 'OPTION_A' ? 'approved' :
        txn.paymentOption === 'OPTION_B' ? 'dp_paid' :
        'waiting_payment';

    const booking = await prisma.booking.create({
      data: {
        status: bookingStatus,
        userId: txn.userId,
        userName: txn.userName || '',
        username: txn.username || '',
        contact: txn.contact || '',
        kostId: txn.kostId,
        kostName: txn.kostName || '',
        kostAddress: txn.kostAddress || '',
        loc: txn.loc || '',
        type: txn.type || '',
        months: txn.months,
        startDate: txn.startDate,
        endDate: txn.endDate,
        paymentOption: txn.paymentOption,
        payment: txn.paymentMethod,
        subtotal: txn.subtotal,
        discount: txn.discount,
        adminFee: txn.adminFee,
        serviceFee: txn.serviceFee,
        total: txn.totalAmount,
        amountPaid: amountPaid,
        remainingAmount: txn.totalAmount - amountPaid,
        transactionId: txn.transactionId,
        invoiceNumber: txn.invoiceNumber,
        contractNumber: txn.contractNumber
      }
    });

    res.json({ transaction: txn, booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error completing transaction' });
  }
});

// Get User Transactions
router.get('/user/:userId', async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId: req.params.userId },
      orderBy: { timestamp: 'desc' }
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get User Bookings
router.get('/user/:userId/bookings', async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: { userId: req.params.userId },
      orderBy: { createdAt: 'desc' }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
