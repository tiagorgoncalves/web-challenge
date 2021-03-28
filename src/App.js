import Table from "./components/Table/Table";
import { Route, Switch } from "react-router";
import Navbar from "./components/UI/Navbar/Navbar";
import Brands from "./components/Brands/Brands";
import BrandProducts from "./components/Brands/BrandProducts/BrandProducts";

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Table}></Route>
        <Route path="/brand" component={BrandProducts}></Route>
        <Route path="/brands" component={Brands}></Route>
      </Switch>
    </div>
  );
}

export default App;
