import axios from 'axios';
import { useEffect, useState } from 'react';

export default function ArticleFilterByCategory() {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch all articles when component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchArticles = async () => {
    axios.get(`http://localhost:3000/categories/${selectedCategory}/articles`).then(response => {
      setArticles(response.data);
    }).catch(error => {
      console.error("Error fetching articles:", error);
    });
  };

  const fetchCategories = async () => {
    axios.get("http://localhost:3000/categories").then(response => {
      setCategories((response.data));
    }).catch(error => {
      console.error("Error fetching categories:", error);
    });
  }

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            fetchArticles();
          }}
        >Apply Filters</button>
        <button
          onClick={() => {
            setSelectedCategory('');
            setArticles([]);
          }}
        >Reset Filters</button>
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