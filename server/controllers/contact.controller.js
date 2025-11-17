import Contact from '../models/contact.model.js';
import extend from 'lodash/extend.js';
import errorHandler from '../helpers/dbErrorHandler.js';

/**
 * findContactByID
 * Middleware to fetch a specific contact message by ID. 
 * This is used for the 'remove' route.
 */
const findContactByID = async (req, res, next, id) => {
    try {
        let contact = await Contact.findById(id);
        if (!contact)
            return res.status(400).json({
                error: "Message not found"
            });
        req.contact = contact;
        next();
    } catch (err) {
        return res.status(400).json({
            error: "Could not retrieve contact message"
        });
    }
};

/**
 * create
 * Handles POST request from the public form. (CREATE)
 */
const create = async (req, res) => {
    const contact = new Contact(req.body);
    try {
        await contact.save();
        return res.status(200).json({
            message: "Message successfully sent!"
        });
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

/**
 * list
 * Handles GET request for the Admin Inbox. (READ ALL)
 */
const list = async (req, res) => {
    try {
        // Fetch all messages, sorted by most recent first
        let contacts = await Contact.find().sort({ 'createdAt': -1 });
        res.json(contacts);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

/**
 * remove
 * Handles DELETE request from the Admin Inbox. (DELETE)
 */
const remove = async (req, res) => {
    try {
        let contact = req.contact;
        let deletedContact = await contact.deleteOne();
        res.json(deletedContact);
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};

export default {
    create,
    findContactByID,
    list,
    remove
};