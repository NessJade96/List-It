const {gql} = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID!
		username: String!
		email: String!
		savedGroceryLists: [GroceryListName]
	}

	type GroceryItem {
		_id: ID
		itemName: String!
		amount: Int
		measurement: String
	}

	type GroceryListName {
		listName: String!
		_id: ID!
	}

	type GroceryList {
		listName: String!
		users: [User]
		groceryItems: [GroceryItem]
	}

	input UpdateGrocerylistInput {
		groceryListId: String!
		usersId: String!
	}

	input UpdateGroceryItemInput {
		groceryListId: String!
		_id: String!
		itemName: String!
		amount: Int
		measurement: String
	}

	input GroceryItemInput {
		groceryListId: String!
		itemName: String!
		amount: Int
		measurement: String
	}

	input GroceryListInput {
		listName: String!
	}

	type Auth {
		token: ID!
		user: User
	}

	type Query {
		me: User
		groceryList(_id: ID!): GroceryList
		groceryItem(_id: ID!): GroceryItem
	}

	type Mutation {
		addUser(username: String!, email: String!, password: String!): Auth
		login(email: String!, password: String!): Auth

		addGroceryList(input: GroceryListInput): GroceryList
		addGroceryItem(input: GroceryItemInput!): GroceryList

		removeGroceryItem(_id: ID!, groceryListId: String!): GroceryList
		removeGroceryList(_id: String!): GroceryList

		updateGroceryList(input: UpdateGrocerylistInput!): GroceryList
		updateGroceryItem(input: UpdateGroceryItemInput!): GroceryItem
	}
`;

module.exports = typeDefs;
