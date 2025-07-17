import contactService from '../services/contactService.js';

const getContacts = async (req, res) => {
  try {
    const contacts = await contactService.getContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createContact = async (req, res) => {
  try {
    const contact = await contactService.createContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  getContacts,
  createContact
};
