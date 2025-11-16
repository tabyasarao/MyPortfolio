import express from 'express';
import contactCtrl from '../controllers/contact.controller';
import authCtrl from '../controllers/auth.controller'; 

const router = express.Router();

router.route('/api/contact')
    .post(contactCtrl.create) // Public access: Anyone can create a message
    .get(authCtrl.requireSignin, authCtrl.hasAuthorization(['admin']), contactCtrl.list); // Admin access: Only admin can list messages

router.route('/api/contact/:contactId')
    .delete(authCtrl.requireSignin, authCtrl.hasAuthorization(['admin']), contactCtrl.remove); // Admin access: Only admin can delete

// Middleware to load the contact message on routes using :contactId
router.param('contactId', contactCtrl.findContactByID);

export default router;