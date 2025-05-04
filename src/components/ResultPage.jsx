import { useNavigate, useLocation } from "react-router-dom";
import "./ResultPage.css";

function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { recommendations, philosophy } = location.state || {};

  if (!recommendations) {
    return (
      <div className="result-container">
        <h1>Veri Bulunamadı</h1>
        <button className="back-button" onClick={() => navigate("/")}>
          ← Ana Sayfaya Dön
        </button>
      </div>
    );
  }

  return (
    <div className="result-container">
      <h1>{philosophy} Akımı</h1>
      <h2>Gerçekçiliğin sanatla buluştuğu yer.</h2>
      
      <div className="recommendations-section">
        <h3>Kitaplar</h3>
        <div className="recommendations-grid">
          {recommendations.books.map((book, index) => (
            <div key={index} className="recommendation-card">
              <h4>{book.title}</h4>
              <p className="author">{book.author}</p>
              <p className="description">{book.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations-section">
        <h3>Filmler</h3>
        <div className="recommendations-grid">
          {recommendations.movies.map((movie, index) => (
            <div key={index} className="recommendation-card">
              <h4>{movie.title}</h4>
              <p className="year">{movie.year}</p>
              <p className="director">Yönetmen: {movie.director}</p>
              <p className="description">{movie.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations-section">
        <h3>Diziler</h3>
        <div className="recommendations-grid">
          {recommendations.series.map((series, index) => (
            <div key={index} className="recommendation-card">
              <h4>{series.title}</h4>
              <p className="year">{series.year}</p>
              <p className="creator">Yaratıcı: {series.creator}</p>
              <p className="description">{series.description}</p>
            </div>
          ))}
        </div>
      </div>

      <button className="back-button" onClick={() => navigate("/")}>
        ← Ana Sayfaya Dön
      </button>
    </div>
  );
}

export default ResultPage;
