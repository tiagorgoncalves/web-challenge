import Table from "./components/Table/Table";
import { Route, Switch } from "react-router";
import Navbar from "./components/UI/Navbar/Navbar";
import Brands from "./components/Brands/Brands";
import BrandList from "./components/Brands/BrandList/BrandList";
import ProductPage from "./components/Products/ProductPage/ProductPage";

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Table}></Route>
        <Route path="/brand" component={BrandList}></Route>
        <Route path="/brands" component={Brands}></Route>
        <Route path="/product" component={ProductPage}></Route>
      </Switch>
    </div>
  );
}

export default App;
