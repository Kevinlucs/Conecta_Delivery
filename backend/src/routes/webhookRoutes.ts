import { Router } from 'express';
import { ifoodWebhook, evolutionWebhook } from '../controllers/WebhookController';

const router = Router();

router.post('/webhooks/ifood', ifoodWebhook);
router.post('/webhooks/evolution', evolutionWebhook);

export default router;
