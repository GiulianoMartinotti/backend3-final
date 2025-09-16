
import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();

router.get('/', (req, res) => {
res.json({
    status: 'ok',
    message: 'Sessions router',
    endpoints: {
    'POST /api/sessions/register': 'register user',
    'POST /api/sessions/login': 'login user',
    'GET  /api/sessions/current': 'get current user (protected)',
    'GET  /api/sessions/unprotectedLogin': 'dev login (no auth)',
    'GET  /api/sessions/unprotectedCurrent': 'dev current (no auth)'
    }
});
});

router.post('/register', sessionsController.register);
router.post('/login', sessionsController.login);
router.get('/current', sessionsController.current);
router.get('/unprotectedLogin', sessionsController.unprotectedLogin);
router.get('/unprotectedCurrent', sessionsController.unprotectedCurrent);

export default router;
