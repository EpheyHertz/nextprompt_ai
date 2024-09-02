'use client';

import GeminiForm from '@/components/geminiForm';

const GeneratePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">
            Welcome to the World of AI With Gemini.</h1>
        <h2 className="text-2xl font-semibold text-center mb-8">
        Generate Amazing Content with Gemini AI</h2>
        <GeminiForm />
      </div>
    </div>
  );
};

export default GeneratePage;
