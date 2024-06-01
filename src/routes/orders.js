import express from 'express';
import { validateOrder } from '../middleware/ordersValidation.js';
import  { 
    createOrder, 
    getAllOrders, 
    getOrderById,
 } from '../services/orders.js';

const router = express.Router();

router.post('/', validateOrder, async (req, res) => {
    try {
        const newOrder = await createOrder(req.body);
        res.status(201).json(newOrder);
    } catch (error) { 
        res.status(500).json({ error: 'Failed to create order'});        
    }
});

router.get('/', async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const order = await getOrderById(req.params.id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ message: 'Order not found'});
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order'});
    }
});

export default router