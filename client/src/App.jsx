import './App.css';
import GlobalStyle from './globalStyles';
import Nav from './components/Nav';
import GroceryItemList from './components/GroceryItemList';
import SignupForm from './components/SignupForm';
import LoginForm from './components/loginForm';

function App() {
	return (
		<>
			<GlobalStyle />
			<Nav />
			<GroceryItemList />
			<SignupForm />
			<LoginForm />
		</>
	);
}

export default App;
