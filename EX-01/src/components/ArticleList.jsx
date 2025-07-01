import axios from 'axios';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

export default function ArticleList() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    await axios.get('http://localhost:3000/articles')
      .then(response => {
        setArticles(response.data)
      })
      .catch(error => { 
        console.error('Error fetching articles:', error);
      });
  };

   const deleteArticle = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/articles/${id}`);
      alert('Article deleted successfully.');
      fetchArticles(); // Refresh list
    } catch (error) {
      console.error('Error deleting article:', error);
      alert('Failed to delete article.');
    }
  };

  return (
    <div>
      {/* Navigation Links */}
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/" style={{ marginRight: '10px' }} className='head'>📄 View Articles</Link>
        <Link to="/add" className='head'> ➕ Add Article</Link>
      </nav>

      <h2>Articles</h2>
      {/* <h1>Hello bee</h1> */}
      <ul>
        {articles.map(article => (
          <li key={article.id}>
            <strong>{article.title}</strong> <br />
            <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small><br />
            <button onClick={() => deleteArticle(article.id)}>Delete</button>
            <button onClick={() => {
              navigate(`/update/${article.id}`)
            }}>Update</button>
            <button onClick={() => {  
              navigate(`/articles/${article.id}`)
            }}>View</button>
          </li>
        ))}
      </ul>
    </div>
  );
}