// components/ContactForm.js
'use client'
import { useState } from 'react';

const ContactForm = ({ userEmail }) => {
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Send the message to the backend (adjust the URL as needed)
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: userEmail, message }),
            });

            if (response.ok) {
                alert('Message sent successfully!');
                setMessage('');
            } else {
                alert('Failed to send message. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting the contact form:', error);
            alert('Failed to send message. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col max-w-lg mx-auto p-6 border rounded-xl shadow-xl bg-white">
            <div className="mb-4">
                <label className="block text-lg font-semibold text-gray-700 mb-2">Your Email</label>
                <input
                    type="email"
                    value={userEmail}
                    readOnly
                    className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600 cursor-not-allowed focus:outline-none"
                />
            </div>
    
            <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-2">Your Message</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="6"
                    placeholder="Write your message here..."
                    required
                ></textarea>
            </div>
    
            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg text-white font-semibold transition-colors duration-300 ${
                    isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
                {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
        </form>
    );
    
};

export default ContactForm;
