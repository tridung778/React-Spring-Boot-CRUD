import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import EmployeeComponent from "./components/EmployeeComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderComponent />

        <Routes>
          <Route path="/" element={<ListEmployeeComponent />}></Route>
          <Route path="/employees" element={<ListEmployeeComponent />}></Route>

          <Route path="/add-employee" element={<EmployeeComponent />}></Route>
        </Routes>

        <FooterComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
