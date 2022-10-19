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

	type NewGroceryItem {
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

	input UpdateGrocerylistInput {
		groceryListId: String!
		newUsersId: String!
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

	type NewUser {
		_id: ID!
		username: String!
		email: String!
		savedGroceryLists: [ID!]
	}

	input NewGroceryListInput {
		listName: String!
	}

	type NewGroceryList {
		listName: String!
		users: [NewUser]
		groceryItems: [GroceryItem]
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
		UUupdateGroceryList(input: UpdateGrocerylistInput!): GroceryList
		removeGroceryList(_id: ID): User

		addGroceryItem(input: GroceryItemInput!): User
		removeGroceryItem(_id: ID!, groceryListId: String!): User

		addNewGroceryList(input: NewGroceryListInput): NewGroceryList
		addNewGroceryItem(input: GroceryItemInput!): NewGroceryList
		removeNewGroceryItem(_id: ID!, groceryListId: String!): NewGroceryList
		removeNewGroceryList(_id: String!): NewGroceryList
		updateGroceryList(input: UpdateGrocerylistInput!): NewGroceryList
		updateNewGroceryItem(input: UpdateGroceryItemInput!): NewGroceryItem
	}
`;

module.exports = typeDefs;
