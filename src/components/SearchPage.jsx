import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchPage.css";

function SearchPage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    const trimmedQuery = query.trim().toLowerCase();
    setLoading(true);
    setError("");

    try {
      const response = await fetch('http://localhost:3000/api/recommend', { // Backend URL'ini burada güncelleyin
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          philosophy: trimmedQuery
        })
      });
      

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        navigate("/result", { state: { recommendations: data.data, philosophy: data.philosophy } });
      } else {
        setError(data.error);
      }
    } catch (err) {
      console.error('Hata:', err);
      setError("Sunucuya bağlanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-page">
      <div className="search-box">
        <h1 className="search-title">Sana En Yakın Akımı Bul</h1>
        <input
          type="text"
          placeholder="İstediğin akımı yaz (örn: realizm)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="search-input"
        />
       <button 
  onClick={handleSearch}  
  className="search-button"
  disabled={loading}
>
  {loading ? <div className="loading-spinner"></div> : "Bir Tık Kadar Yakın"}
</button>

        {error && <p className="error-message">{error}</p>}

      </div>
    </div>
  );
}

export default SearchPage;
