import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the GoogleGenerativeAI client and model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const maxRetries = 3; // Maximum number of retries
const retryDelay = 2000; // Delay between retries in milliseconds

const generateContent = async (prompt, config) => {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      const response = await model.generateContent(prompt, config);
      return response;
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error.message);
      attempt++;
      if (attempt >= maxRetries) {
        console.error('All retry attempts failed.');
        throw error;
      }
      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

// API route handler
export const POST = async (req) => {
  try {
    const { prompt } = await req.json();
    
    if (!prompt) {
      return new Response(
        JSON.stringify({ error: 'Prompt is required.' }),
        { status: 400 }
      );
    }

    // Log API key for debugging (ensure this is removed in production)
    console.log('Gemini API Key:', process.env.GEMINI_API_KEY);
    
    const transcriptionText = `
    Create a blog article from the provided prompt:

    ${prompt}
    Generate updated, professional, and high-quality content based on the provided prompt. Ensure the content is well-structured and accurate.
    `;

    const generationConfig = {
        candidate_count: 1,
        stop_sequences: ["in Conclusion", "\n\n\n\n\n"],
        max_output_tokens: 1000,
        temperature: 0.5,
    };

    // Log incoming request data for debugging
    // console.log('Request received with prompt:', prompt);

    // Generate content using the retry-enabled function
    const result = await generateContent(transcriptionText, generationConfig);
    const content =  result.response.text();

    // Extract generated content from the response
   

    // Log the generated content for debugging
    

    // Returning the result with a 200 status
    return new Response(JSON.stringify({ content: content }), { status: 200 });
  } catch (error) {
    // Logging the error for debugging purposes
    console.error('Error generating content:', error.message);

    // Returning a 500 status if an error occurs
    return new Response(
      JSON.stringify({ error: 'Failed to generate content. Please try again later.' }),
      { status: 500 }
    );
  }
};

