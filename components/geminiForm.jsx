'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
      setResult(data.content);
    } catch (error) {
      console.error('Error generating content:', error);
      alert('Failed to generate content');
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
              isGenerating ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 transition ease-in-out duration-300'
            }`}
            disabled={isGenerating || isButtonDisabled}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-3 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Generating...
              </div>
            ) : (
              'Generate with Gemini'
            )}
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-600">You need to be logged in to use this feature.</p>
      )}
      {result && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Generated Content:</h3>
          <div className="w-full min-h-[300px] max-h-[500px] p-4 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-y-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiForm;

