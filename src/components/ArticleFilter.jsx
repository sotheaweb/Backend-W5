  // import { useEffect, useState } from 'react';
  // import axios from 'axios'

  // export default function ArticleFilter() {
  //   const [articles, setArticles] = useState([]);
  //   const [journalists, setJournalists] = useState([])
  //   // Fetch all articles when component mounts
  //   useEffect(() => {
  //     fetchArticles();
  //     fetchJournalists();
  //     fetchCategories();
  //   }, []);

  //   const fetchArticles = async () => {
  //     // Fetch articles from the API
  //       axios.get('http://localhost:3000/articles')
  //       .then(respon =>{
  //         setArticles(respon.data)
  //       })
  //   };

  //   const fetchJournalists = async () => {
  //     // Fetch journalists from the API
  //     axios.get('http://localhost:3000/journalists')
  //     .then(resopnce =>{
  //       setJournalists(resopnce.data)
  //     })
  //   };

  //   const fetchCategories = async () => {
  //     // Fetch categories from the API
  //   }

  //   return (
  //     <div>
  //       <h2>Articles</h2>
  //       <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
  //         <label htmlFor="journalistFilter">Filter by Journalist:</label>
  //         <select id="journalistFilter">
  //           <option value="">All Journalists</option>
  //           {/* Options for journalists */}
  //         </select>

  //         <label htmlFor="categoryFilter">Filter by Category:</label>
  //         <select id="categoryFilter">
  //           <option value="">All Categories</option>
  //           {/* Options for categories */}
  //         </select>

  //         <button
  //           onClick={() => {
  //             // Logic to apply filters
  //           }}
  //         >Apply Filters</button>
  //         <button
  //           onClick={() => {
  //             // Logic to reset filters
  //           }}
  //         >Reset Filters</button>
  //       </div>

  //       <ul>
  //         {articles.map(article => (
  //           <li key={article.id}>
  //             <strong>{article.title}</strong> <br />
  //             <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
  //             <button disabled>Delete</button>
  //             <button disabled>Update</button>
  //             <button disabled>View</button>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //   );
  // }

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilter() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedJournalist, setSelectedJournalist] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchArticles();
    fetchJournalists();
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('http://localhost:3000/articles');
      setArticles(response.data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const fetchJournalists = async () => {
    try {
      const response = await axios.get('http://localhost:3000/journalists');
      setJournalists(response.data);
    } catch (error) {
      console.error('Error fetching journalists:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:3000/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleFilter = () => {
    fetchArticles(); // Refetch all, then filter locally

    // Wait a bit so that articles have been updated
    setTimeout(() => {
      setArticles(prevArticles =>
        prevArticles.filter(article => {
          return (
            (selectedJournalist === '' || article.journalistId == selectedJournalist) &&
            (selectedCategory === '' || article.categoryId == selectedCategory)
          );
        })
      );
    }, 100);
  };

  const resetFilters = () => {
    setSelectedJournalist('');
    setSelectedCategory('');
    fetchArticles();
  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select
          id="journalistFilter"
          value={selectedJournalist}
          onChange={(e) => setSelectedJournalist(e.target.value)}
        >
          <option value="">All Journalists</option>
          {journalists.map(j => (
            <option key={j.id} value={j.id}>
              {j.name || `Journalist #${j.id}`}
            </option>
          ))}
        </select>

        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>
              {c.name || `Category #${c.id}`}
            </option>
          ))}
        </select>

        <button onClick={handleFilter}>Apply Filters</button>
        <button onClick={resetFilters}>Reset Filters</button>
      </div>

      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button disabled>Delete</button>
            <button disabled>Update</button>
            <button disabled>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
