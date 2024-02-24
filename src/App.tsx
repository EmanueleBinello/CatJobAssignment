import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { CatList } from "./components/catlist/CatList";
import { CatListDetail } from "./components/catlistdetail/CatListDetail";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={CatList}/>
        <Route path="/detail/:id" Component={CatListDetail}/> 
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;

