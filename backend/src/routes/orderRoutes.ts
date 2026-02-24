import { Router } from 'express';
import { getOrders, createManualOrder, updateOrderStatus } from '../controllers/OrderController';

const router = Router();

router.get('/orders', getOrders);
router.post('/orders', createManualOrder);
router.patch('/orders/:id/status', updateOrderStatus);

export default router;
