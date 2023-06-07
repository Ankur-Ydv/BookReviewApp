import React, { useState } from "react";

const SearchBox = ({ reviews }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [filteredReviews, setFilteredReviews] = useState([]);

  const handleSearch = () => {
    const filtered = reviews.filter((review) => {
      const authorMatch =
        !author || review.author.toLowerCase() === author.toLowerCase();
      const titleMatch =
        !title || review.title.toLowerCase() === title.toLowerCase();

      return authorMatch && titleMatch;
    });

    setFilteredReviews(filtered);
  };

  return (
    <div className="flex gap-2 p-2 w-full justify-evenly">
      <input
        type="text"
        placeholder="Enter Author Here"
        className="w-48 rounded-sm dark:text-white bg-gray-100 dark:bg-darkMode-component flex flex-grow p-4 focus:outline-none"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        className="w-48 rounded-sm dark:text-white bg-gray-100 dark:bg-darkMode-component flex flex-grow p-4 focus:outline-none"
        value={title}
        placeholder="Enter Title Here"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="bg-darkMode-btn px-4 py-2 dark:text-white rounded-md"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
