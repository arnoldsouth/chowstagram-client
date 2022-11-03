import React, { useEffect, useState } from 'react';

import MasonryLayout from './MasonryLayout';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import LoadingSpinner from './LoadingSpinner';

const Search = ({ searchTerm }) => {
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm !== '') {
      setLoading(true);
      const query = searchQuery(searchTerm.toLowerCase());
      client.fetch(query).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPosts(data);
        setLoading(false);
      });
    }
  }, [searchTerm]);

  return (
    <div>
      {loading && <LoadingSpinner message="Searching posts" />}
      {posts?.length !== 0 && <MasonryLayout posts={posts} />}
      {posts?.length === 0 && searchTerm !== '' && !loading && (
        <div className="mt-10 text-center text-xl ">No posts found!</div>
      )}
    </div>
  );
};

export default Search;
