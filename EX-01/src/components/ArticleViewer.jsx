import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/articles/${id}`)
      .then(response => {
        console.log('Fetched article:', response.data); // Debug
        setArticle(response.data[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching article:', error);
        setError('Failed to load article.');
        setLoading(false);
      });
  }, [id]);


  if (loading) return <div>Loading article...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!article) return <div>No article found.</div>;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
      <div>
        <strong>Journalist ID:</strong> {article.journalistId}
      </div>
      <div>
        <strong>Category ID:</strong> {article.categoryId}
      </div>
    </div>
  );
}
