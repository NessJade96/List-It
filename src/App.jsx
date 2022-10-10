import './App.css';
import GlobalStyle from './globalStyles';
import Nav from './components/Nav';
import GroceryItemList from './components/GroceryItemList';

function App() {
	return (
		<div>
			<GlobalStyle />
			<Nav />
			<GroceryItemList />
		</div>
	);
}

export default App;
