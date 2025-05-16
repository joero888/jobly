import { useState } from 'react';

export default function JobSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    
    // not working
    if (!query.trim()) {
      alert("Please enter a keyword before searching.");
      return;
    }
    
    console.log("Search clicked");
    console.log("Search started");

    // builds query string for API

    //const searchTerm = [query].filter(Boolean).join(' ');

    const searchParams = [
      `query=${encodeURIComponent(query.trim())}`,
      `page=1`,
      `num_pages=5`
    ];

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
      },
    };

    const url = `https://jsearch.p.rapidapi.com/search?${searchParams.join('&')}`;

    try {
      
      // makes actual request to API
      const res = await fetch(url, options);

      // if response is not 200 (OK), throw an error
      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      // converts data to a JSON object
      const data = await res.json();
      console.log("Raw jobs returned:", data.data?.length || 0);

      // checks if data is an array
      // if not, set jobs to an empty array
      let jobs = Array.isArray(data.data) ? data.data : [];
      
      console.log("Example job:", jobs[0]);
      
      // saves filtered jobs to results, whcih triggers a re-render
      setResults(jobs);
      console.log("setResults was called with", jobs.length, "jobs");

    } catch (err) {
      console.error('Job search failed:', err);
      setResults([]); // Set empty array to avoid crashing the UI
    }
  };

  return (
    <div>
      {/* confirms that the component is mounted and rendering */}
      <h2 style={{ color: 'red' }}>DEBUG: JobSearch is Rendering</h2>

      <h2>Job Search</h2>

      {/* each input field updates its respective state variable */}
      <input
        type="text"
        placeholder="Keyword (e.g. React developer)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* clicking button triggers entire search process */}
      <button onClick={handleSearch}>Search</button>

      {results.length === 0 ? (
        <p>No job results yet. Try searching!</p>
      ) : (
        <ul>
            {results.map((job, index) => (
              <li key={`${job.job_id}-${index}`}>
                <strong>{job.job_title}</strong> at {job.employer_name}
                  <br />
                    {job.job_city || "Unknown City"}, {job.job_country || "Unknown Country"}
                  <br />
                  <a href={job.job_apply_link} target="_blank" rel="noopener noreferrer">
                Apply
                </a>
              </li>
          ))}
        </ul>
    )}

    </div>
  );
}