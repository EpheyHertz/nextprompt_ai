 "use client";

import { useState, useEffect } from "react";
import PromptCard from "@components/promptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post.id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
  
    if (text === '') {
      setFilteredPosts(posts);
      return;
    }
  
    const lowercasedText = text.toLowerCase();
    const filteredData = posts.filter((post) => {
      const promptMatch = post.prompt?.toLowerCase().includes(lowercasedText);
      const usernameMatch = post.creator.username?.toLowerCase().includes(lowercasedText) || false; 
      const emailMatch = post.creator.email?.toLowerCase().includes(lowercasedText) || false; 
      const tagMatch = post.tag?.toLowerCase().includes(lowercasedText);
  
      return promptMatch || usernameMatch || tagMatch ||  emailMatch;
    });
  
    console.log('Filtered data:', filteredData); // Log the filtered data
    setFilteredPosts(filteredData);
  };
  
  
  

  const handleTagClick = (tag) => {
    console.log('Clicked tag:', tag);
    setSearchText(tag);
  
    const lowercasedTag = tag.toLowerCase();
    const filteredData = posts.filter((post) => {
      // Assuming post.tag is a single comma-separated string
      const tagMatch = post.tag?.toLowerCase().includes(lowercasedTag);
      
      return tagMatch;
    });
  
   
    setFilteredPosts(filteredData);
  };
  
  
  
  
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('../api/prompts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const data = await response.json();
        console.log('Fetched posts:', data);
        setPosts(data);
        setFilteredPosts(data); // Initialize filteredPosts with all posts
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for Prompts, Tags, or Username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList
        data={filteredPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
