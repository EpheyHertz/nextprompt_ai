'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { config } from 'dotenv';



const GeminiForm = () => {
  const { data: session } = useSession();
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setIsButtonDisabled(input.trim().length === 0);
  }, [input]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      alert('You must be logged in to generate content');
      return;
    }

    if (input.trim() === '') {
      alert('Input cannot be empty');
      return;
    }

    setIsGenerating(true);
    try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: input }),
        });
      
        if (!response.ok) {
          throw new Error('Failed to generate content');
        }
      
        const data = await response.json();
        const generatedContent = data.content;
        console.log(generatedContent)
        setResult(generatedContent);
      } catch (error) {
        console.error('Error generating content:', error);
        alert('Failed to generate content from frontend');
      } finally {
        setIsGenerating(false);
      }
      
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
      {session ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your prompt here"
            className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className={`w-full py-2 px-4 font-semibold text-white rounded-lg ${
              isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'
            }`}
            disabled={isGenerating || isButtonDisabled}
          >
            {isGenerating ? 'Generating...' : 'Generate with Gemini'}
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-600">You need to be logged in to use this feature.</p>
      )}
      {result && (
        <textarea
          readOnly
          value={result}
          className="mt-4 w-full h-48 p-4 border border-gray-300 rounded-lg resize-none bg-gray-50 text-gray-900"
        />
      )}
    </div>
  );
};

export default GeminiForm;
