// app/api/users/[id]/route.js

import { connectToDB } from '@utils/database';
import User from '@models/user';  // Adjust the import to your actual user model

export async function GET(request, { params }) {
    const { id } = params;
    
    try {
        await connectToDB();
        const user = await User.findById(id);
        
        if (!user) {
            return new Response('User not found', { status: 404 });
        }
        
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error('Error fetching user:', error);
        return new Response('Failed to fetch user', { status: 500 });
    }
}

// You can add other named exports here if you need to handle POST, PUT, DELETE, etc.
