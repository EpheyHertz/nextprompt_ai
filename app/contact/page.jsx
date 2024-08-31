// pages/contact.js
'use client';
import { useSession } from 'next-auth/react';
import ContactForm from '@components/ContactForm';

const ContactPage = () => {
    const { data: session } = useSession();

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">Get in Touch</h1>
                    <p className="mt-4 text-lg text-gray-600">
                        We'd love to hear from you! Fill out the form below to send us a message.
                    </p>
                </div>
                <div className="bg-white p-8 shadow-lg rounded-lg">
                    {session?.user ? (
                        <ContactForm userEmail={session?.user.email} />
                    ) : (
                        <p className="text-red-500 text-center">
                            You need to be logged in to contact us.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
    
};

export default ContactPage;
