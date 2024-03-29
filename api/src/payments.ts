import { Router } from 'express';
import { initialCharge, verifyTransaction } from './utils/paystack';

const router: Router = Router();

router.post('/initial-charge', async (req, res) => {
	// TODO: Take userId and return email instead of this.
	const { email } = req.body;

	try {
		const data = await initialCharge(email);

		return res.status(200).json({ success: true, data });
	} catch (error) {
		return res.status(400).json({
			success: false,
			data: {
				message: 'An error occured when trying to charge the card.',
				error
			}
		});
	}
});

router.post('/verify-transaction', async (req, res) => {
	const { reference } = req.body;

	try {
		const data = await verifyTransaction((req as any).auth.id, reference);

		return res.status(200).json({ success: true, data });
	} catch (error) {
		return res.status(400).json({ success: false, error });
	}
});

export default router;
