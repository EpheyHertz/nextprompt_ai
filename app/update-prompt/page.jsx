'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Form from '@components/form';

const EditPrompt = () => {
  const Router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const promptId = searchParams.get('id');
  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return;
      try {
        const response = await fetch(`/api/prompts/${promptId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch prompt details');
        }
        const data = await response.json();
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error('Error fetching prompt details:', error);
      }
    };
    getPromptDetails();
  }, [promptId]);
if(!promptId) return alert('Prompt not found!')
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompts/${promptId}`, {
        method: 'PATCH', // Use PUT for updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update prompt');
      }
      Router.push('/');
    } catch (error) {
      console.error('Error updating prompt:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default EditPrompt;
