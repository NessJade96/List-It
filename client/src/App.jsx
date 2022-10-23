import './App.css';
import {
	ApolloClient,
	ApolloProvider,
	InMemoryCache,
	createHttpLink,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Auth from './utils/auth';

//Styles and components
import GlobalStyle from './globalStyles';
import GroceryItemList from './components/GroceryItemList';
import SignupForm from './components/SignupForm';
import LoginForm from './components/loginForm';
import CreateList from './components/CreateList';
import YourLists from './components/YourLists';
import EditGroceryList from './components/EditGroceryList';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
	uri:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:3001/graphql'
			: '/graphql',
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
				{Auth.loggedIn() ? (
					<Routes>
						<Route path="/:id" element={<GroceryItemList />} />
						<Route path="/:id/users" element={<EditGroceryList />} />
						<Route path="/createlist" element={<CreateList />} />
						<Route path="/yourlists" element={<YourLists />} />
						<Route path="/" element={<YourLists />} />
						<Route
							path="*"
							element={<h1 className="display-2">Wrong page!</h1>}
						/>
					</Routes>
				) : (
					<Routes>
						<Route path="/signup" element={<SignupForm />} />
						<Route path="/login" element={<LoginForm />} />
						<Route path="/" element={<SignupForm />} />
						<Route
							path="*"
							element={<h1 className="display-2">Wrong page!</h1>}
						/>
					</Routes>
				)}
			</Router>
		</ApolloProvider>
	);
}

export default App;
