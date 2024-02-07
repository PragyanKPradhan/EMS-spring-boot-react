import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import ListEmployeesComponent from "./components/ListEmployeesComponent";
import EmployeeComponent from "./components/EmployeeComponent";
import ListDepartmentComponent from "./components/ListDepartmentComponent";
import DepartmentComponent from "./components/DepartmentComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* http://localhost:3000 */}
          <Route path="/" element={<ListEmployeesComponent />}></Route>
          {/* http://localhost:3000/employees */}
          <Route path="/employees" element={<ListEmployeesComponent />}></Route>
          {/* http://localhost:3000/add-employee */}
          <Route path="/add-employee" element={<EmployeeComponent />}></Route>
          {/* http://localhost:3000/edit-employee */}
          <Route path="/edit-employee/:id" element={<EmployeeComponent/>}></Route>
          {/* http://localhost:3000/departments */}
          <Route path="/departments" element={<ListDepartmentComponent/>}></Route>
          {/* http://localhost:3000/add-department */}
          <Route path="/add-department" element={<DepartmentComponent/>}></Route>

          <Route path="/edit-department/:id" element={<DepartmentComponent/>}></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
