import './App.css';
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

//Styles and components
import GlobalStyle from './globalStyles';
import Nav from './components/Nav';
import GroceryItemList from './components/GroceryItemList';
import SignupForm from './components/SignupForm';
import LoginForm from './components/loginForm';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
	uri: '/graphql',
	cache: new InMemoryCache(),
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, {headers}) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('id_token');
	// return the headers to the context so httpLink can read them
	return (
		console.log('token returned'),
		{
			headers: {
				...headers,
				authorization: token ? `Bearer ${token}` : '',
			},
		}
	);
});

const client = new ApolloClient({
	// Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<GlobalStyle />
				<Nav />
				<Routes>
					<Route path="/" element={<GroceryItemList />} />
					<Route path="/signup" element={<SignupForm />} />
					<Route path="/login" element={<LoginForm />} />
					<Route
						path="*"
						element={<h1 className="display-2">Wrong page!</h1>}
					/>
				</Routes>
			</Router>
		</ApolloProvider>
	);
}

export default App;
