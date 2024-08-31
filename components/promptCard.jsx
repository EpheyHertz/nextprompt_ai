
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState('');
  const { data: session } = useSession();
  const router = useRouter();

  const handleCopy = async () => {
    try {
      setCopied(post.prompt);
      await navigator.clipboard.writeText(post.prompt);
      setTimeout(() => setCopied(''), 3000);
    } catch (err) {
      console.error('Failed to copy text to clipboard:', err);
    }
  };

  const handleRedirect = (userId) => {
    router.push(`/profile/${userId}`); // Adjust the route as needed
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'>
          <Image 
            src={post.creator?.image || "/assets/images/profile.jpg"}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
            onError={(e) => e.target.src = '/assets/images/profile.jpg'}
            onClick={() => handleRedirect(post.creator?._id)} // Redirect on image click
          />
          <div className='flex flex-col'>
            <h3 
              className='font-satoshi font-semibold text-gray-900 cursor-pointer'
              onClick={() => handleRedirect(post.creator?._id)} // Redirect on username click
            >
              @{post.creator?.username || "Unknown User"}
            </h3>
            <p 
              className='font-inter text-sm text-gray-500 cursor-pointer'
              onClick={() => handleRedirect(post.creator?._id)} // Redirect on email click
            >
              {post.creator?.email || "Unknown Email"}
            </p>
          </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
          <Image 
            src={copied === post.prompt 
              ? '/assets/icons/tick.svg'
              : '/assets/icons/copy.svg'}
            width={12} 
            height={12} 
            alt="copy" 
          />
        </div>
      </div>
      <p className='my-4 font-satoshi text-sm text-gray-700'>
        {post.prompt}
      </p>
      <p 
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
      {session?.user.id === post.creator._id && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p 
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p 
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
