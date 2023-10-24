import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Tasks from "./components/Tasks";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </>
  );
}

export default App;
