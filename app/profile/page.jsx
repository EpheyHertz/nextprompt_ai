'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Profile from '@components/profile';

function MyProfile() {
    const { data: session } = useSession();
    const [posts, setPosts] = useState([]);
    const [profileName, setProfileName] = useState(''); // State to store profile name
    const [username, setUsername] = useState(''); // State to store profile name
    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`/api/users/${session?.user.id}/posts`);
                if (!response.ok) throw new Error('Failed to fetch posts');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`/api/users/${session?.user.id}`);
                if (response.status === 404) {
                    console.error('User not found');
                    setProfileName('User not found');
                    return;
                }
                if (!response.ok) throw new Error('Failed to fetch user profile');
                const userProfile = await response.json();
                setProfileName(session?.user.id ? 'My' : userProfile.username);
                setUsername(userProfile.username)
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setProfileName('Error fetching profile');
            }
        };

        if (session?.user.id) {
            fetchPosts();
            fetchUserProfile();
        }
    }, [session?.user.id]);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompts/${post._id.toString()}`, {
                    method: 'DELETE'
                });
                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts);
            } catch (error) {
                console.error(error);
            }
        }
    };
    const capitalizeFirstLetter = (string) => {
        if (typeof string !== 'string' || string.length === 0) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <Profile
        name={capitalizeFirstLetter(profileName)}
        desc={`Welcome to ${capitalizeFirstLetter(username)}'s personalized profile page`}
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
    
    );
}

export default MyProfile;
