import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function QuoteCreationPage() {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Upload image
      const formData = new FormData();
      formData.append('file', file);
      const uploadResponse = await fetch('https://crafto.app/crafto/v1.0/media/assignment/upload', {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadResponse.json();
      // Create quote
      const createResponse = await fetch('https://assignment.stage.crafto.app/postQuote', {
        method: 'POST',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          mediaUrl: uploadData?.[0]?.url,
        }),
      });
      if (createResponse.ok) {
        history('/quotes');
      }
    } catch (error) {
      console.error('Error creating quote:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Create Quote</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="text" className="block text-gray-700 text-sm font-bold mb-2">Quote Text</label>
          <textarea
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your quote"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="file" className="block text-gray-700 text-sm font-bold mb-2">Upload Image</label>
          <input
            id="file"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Quote'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default QuoteCreationPage;