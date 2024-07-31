import "./App.css";
import ReactDOM from 'react-dom/client';
import Layout from './pages/Layout';
import WordQuiz from "./pages/WordQuiz";
import DataEditor from "./pages/DataEditor";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='wordquiz' element={<WordQuiz />} />
        <Route path='dataeditor' element={<DataEditor />} />
      </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
