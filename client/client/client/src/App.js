import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './Nav';
import Home from './Components/Home';
import NewMovie from './Components/NewMovie';
import Movie from './Components/Movie';
import SortedMovies from './Components/SortedMovies';
import NewCrewmember from './Components/NewCrewmember';
import Crewmember from './Components/Crewmember';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-movie" element={<NewMovie />} />
        <Route path="/movie/:movieId" element={<Movie />} />
        <Route path="/movies-sorted" element={<SortedMovies />} />
        <Route path="/add-crewmember" element={<NewCrewmember />} />
        <Route path="/crewmember/:crewmemberId" element={<Crewmember />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
