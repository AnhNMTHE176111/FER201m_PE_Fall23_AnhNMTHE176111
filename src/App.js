import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Star from './components/Star';
import Movie from './components/Movie';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Star />} />
        <Route path='/star' element={<Star />} />
        <Route path='/movie' element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
