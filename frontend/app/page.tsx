'use client';
import { useState } from 'react';

export default function Home() {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Error handling UI

  // Dynamic Interaction 1: Ask Java to generate the post
  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:8080/api/posts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic, platform: 'LinkedIn' }),
      });

      if (!response.ok) throw new Error('Failed to generate post');
      
      const data = await response.text();
      setResult(data);
    } catch (err) {
      setError('Uh oh! Our servers are busy. Please try again.'); // Graceful error handling
    }
    setLoading(false);
  };

  // Dynamic Interaction 2: Save to Database
  const handleSave = async () => {
    await fetch('http://localhost:8080/api/posts/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic: topic, platform: 'LinkedIn', generatedText: result }),
    });
    alert('Saved to your Content Library!');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-10">
      {/* Ensure you use Tailwind classes like flex-col and sm:flex-row for Responsiveness! */}
      <h1 className="text-3xl font-bold mb-6">Prismix AI Generator</h1>
      
      <input 
        className="border p-2 w-full max-w-md rounded text-black" 
        value={topic} 
        onChange={(e) => setTopic(e.target.value)} 
        placeholder="What should we post about?" 
      />
      
      <button onClick={handleGenerate} className="mt-4 bg-blue-600 text-white p-2 rounded">
        {loading ? 'Generating...' : 'Create Post'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {result && (
        <div className="mt-8 p-4 border rounded shadow w-full max-w-md">
          <p>{result}</p>
          <button onClick={handleSave} className="mt-4 bg-green-600 text-white p-2 rounded w-full">
            Save to Library
          </button>
        </div>
      )}
    </main>
  );
}