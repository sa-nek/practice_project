import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<p>error</p>} />
      </Route>
    </Routes>
  );
}

export default App;
