
import './App.css';
import Cart from './components/Cart';
import LoginComponent from './components/LoginUser';
import ProductList from './components/ProductList';
import RegisterUser from './components/RegisterUser';

function App() {
  return (
    <div className="App">
      <ProductList />
      <Cart />
    </div>
  );
}

export default App;
