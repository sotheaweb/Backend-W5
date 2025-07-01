import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticleFilterByJournalist() {
  const [articles, setArticles] = useState([]);
  const [journalists, setJournalists] = useState([]);
  const [selectedJournalist, setSelectedJournalist] = useState('');
  // Fetch all articles when component mounts
  useEffect(() => {
    fetchJournalists();
    // fetchArticles();
  }, []);

  const fetchArticles = async () => {
    // Fetch articles from the API
    axios.get(`http://localhost:3000/journalists/${selectedJournalist}/articles`)
      .then(response => {
        console.log("Fetched articles:", response.data);
        console.log("✅ Is array:", Array.isArray(articles), "→ Length:", articles.length);
        setArticles(response.data);
      })
      .catch(error => {
        console.error("Error fetching articles:", error);
      });
    console.log("Hello word");
  };

  const fetchJournalists = async () => {
    // Fetch journalists from the API\
    axios.get("http://localhost:3000/journalists")
      .then(response => {
        setJournalists(response.data);
      })
      .catch(error => {
        console.error("Error fetching journalists:", error);
      });

  };

  return (
    <div>
      <h2>Articles</h2>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <label htmlFor="journalistFilter">Filter by Journalist:</label>
        <select id="journalistFilter"
          value={selectedJournalist}
          onChange={e => setSelectedJournalist(e.target.value)}
          >
          <option value="">All Journalists</option>
          {journalists.map(journalist => (
            <option key={journalist.id} value={journalist.id}>
              {journalist.name} 
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
            setSelectedJournalist('');
            setArticles([]);
          }}
        >Reset Filters</button>
      </div>

        <ul>
          {articles.map(article => (
            <li key={article.id}>
              <strong>{article.title}</strong><br />
              <small>By Journalist #{article.journalistId} | Category #{article.categoryId}</small>
            </li>
          ))}
        </ul>

    </div>
  );
}
