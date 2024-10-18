import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import moment from 'moment';

function QuoteListPage() {
  const [quotes, setQuotes] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { token } = useAuth();

  const fetchQuotes = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await fetch(`https://assignment.stage.crafto.app/getQuotes?limit=500&offset=${offset}`, {
        headers: { 'Authorization': token },
      });
      const data = await response.json();
      if (data?.data?.length > 0) {
        setQuotes(prevQuotes => [...prevQuotes, ...data?.data]);
        setOffset(prevOffset => prevOffset + 100);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Quotes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {quotes.map(quote => (
          <div key={quote.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative">
              <img src={quote.mediaUrl} alt="Quote" className="w-full h-48 sm:h-64 object-cover" />
              <p className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-3 text-sm sm:text-base">
                {quote.text}
              </p>
            </div>
            <div className="p-3 sm:p-4">
              <p className="text-xs sm:text-sm text-gray-600">{quote.username} - {moment(quote.created_at).format("MMM Do YY")}</p>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <button
          onClick={fetchQuotes}
          className="mt-6 sm:mt-8 w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Load More'}
        </button>
      )}
      <Link
        to="/create-quote"
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 bg-blue-500 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Create new quote"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </Link>
    </div>
  );
}

export default QuoteListPage;