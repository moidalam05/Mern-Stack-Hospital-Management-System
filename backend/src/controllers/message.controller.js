import Message from '../models/messageSchema.js';

export const sendMessage = async (req, res, next) => {
    // Get the data from the request body
    const { firstName, lastName, email, phone, message } = req.body;
    if(!firstName || !lastName || !email || !phone || !message){
        return res.status(400).json({message: 'All fields are required'});
    }

    // Create a new message
    const newMessage = await Message.create({
        firstName,
        lastName,
        email,
        phone,
        message,
    });

    // Send a response
    res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        newMessage,
    });
};