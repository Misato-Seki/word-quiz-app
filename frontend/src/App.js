import "./App.css";
import ReactDOM from 'react-dom/client';
import NavBar from './pages/NavBar';
import WordQuiz from "./pages/WordQuiz";
import DataEditor from "./pages/DataEditor";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<NavBar />}>
        <Route index element={<Home />} />
        <Route path='wordquiz' element={<WordQuiz />} />
        <Route path='dataeditor' element={<DataEditor />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
