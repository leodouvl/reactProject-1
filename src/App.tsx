import { Home } from "./pages/Home";
import { Favoris } from "./pages/Favoris";
import { MovieInfo } from "./pages/MovieInfo";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <header className="header">
        <nav className="nav">
          <Link to="/">Accueil</Link>
          <Link to="/favoris">Favoris</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favoris" element={<Favoris />} />
          <Route path="/movie-info/:id" element={<MovieInfo />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
