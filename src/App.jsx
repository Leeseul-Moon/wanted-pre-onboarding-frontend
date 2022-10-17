import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginJoinPage from "./pages/LoginJoinPage";
import TodoPage from "./pages/TodoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginJoinPage />} />
        <Route path="/todo" element={<TodoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
