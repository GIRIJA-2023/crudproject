import "bootstrap/dist/css/bootstrap.min.css";
import EmpTable from "./components/EmpTable"
import EmpForm from "./components/EmpForm";
import EmpEdit from "./components/EmpEdit";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import "./index.css";
function App() {
  return (
   <div> 
    <BrowserRouter basename="/crudproject">
    <Routes>
      <Route path="/"  element= {<EmpTable/>}></Route>
      <Route path="/EmpForm" element={<EmpForm/>}></Route>
      <Route path="/EmpEdit/:userName" element={<EmpEdit/>}></Route>
      </Routes>
      </BrowserRouter>
    
   
    
       
   </div>
  );
}

export default App;
