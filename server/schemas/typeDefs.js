const {gql} = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID!
		username: String!
		email: String!
		savedGroceryLists: [GroceryList]
	}

	type GroceryItem {
		_id: ID
		itemName: String!
		amount: Int
		measurement: String
	}

	type GroceryList {
		_id: ID
		listName: String!
		users: [User]
		groceryItems: [GroceryItem]
	}

	input UserInput {
		_id: ID!
		username: String!
		email: String!
	}

	input GroceryListInput {
		listName: String!
		users: [UserInput!]
	}

	input GroceryItemInput {
		groceryListId: String!
		itemName: String!
		amount: Int
		measurement: String
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		me: User
		listItems: [GroceryList]
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth

		addGroceryList(input: GroceryListInput!): GroceryList
		updateGroceryList(_id: ID, listName: String!): GroceryList
		removeGroceryList(_id: ID): User

		addGroceryItem(input: GroceryItemInput!): User
		updateGroceryItem(
			itemName: String!
			amount: Int
			measurement: String
		): GroceryItem
		removeGroceryItem(_id: ID): User
	}
`;

module.exports = typeDefs;
