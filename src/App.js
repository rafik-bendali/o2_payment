import { BrowserRouter, Routes, Route } from "react-router-dom";
import Content from "./componenets/Content/Content";
import '../src/global.css';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Content />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
