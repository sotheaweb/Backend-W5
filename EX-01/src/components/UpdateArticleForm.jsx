import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function UpdateArticleForm() {
  const {id} = useParams()
  const [form, setForm] = useState({
    title: '',
    content: '',
    journalistId: '',
    categoryId: '',
  });


  // Fetch to prefill a form and update an existing article
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/articles/${id}`);
        setForm({
          title: res.data.title || '',
          content: res.data.content || '',
          journalistId: res.data.journalistId ? res.data.journalistId.toString(): '',
          categoryId: res.data.journalistId ? res.data.categoryId.toString(): '',
        });
      } catch (error) {
        console.error('Error fetching article:', error);
        alert('Failed to fetch article data');
      }
    };

    fetchArticle();
  }, [id]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update article with axios
    try{
      await axios.put(`http://localhost:3000/articles/${id}`, form)
      alert("Update Successfully!");
    }
    catch (error){
      console('failed to Update artice')
      alert("Error Update article")
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Update Article</h3>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required /><br />
      <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required /><br />
      <input name="journalistId" value={form.journalistId} onChange={handleChange} placeholder="Journalist ID" required /><br />
      <input name="categoryId" value={form.categoryId} onChange={handleChange} placeholder="Category ID" required /><br />
      <button type="submit">Update</button>
    </form>
  );
}
