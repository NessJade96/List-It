# List It

## Description:

This shopping list application is a dynamic application created with Mongodb, Express, React, and Node. The user is able to create an account, and access their saved shopping lists from anywhere, users can even link their shopping lists with others!

## User Setup:

To run locally go to the root folder in your terminal and run the following commands to invoke the application:
`npm i` to install packages,
then `npm run develop` starts the live servers.

## User Story

```md
without PWA:
AS A shopper
I WANT to create a shopping list that I can edit and share with others
SO THAT I can retrieve for later use at the supermarket
```

## Screenshots:

Here is the first concept wireframe before I began creating the application, color scheme etc.

![image](./assets/wireframe.PNG)

## Technologies used:

Vite for React, HTML, CSS, Styled-Components, Babel-plugin-styled-components, Apollo, GraphQL, bcrypt, express, JWT, mongoose, nodemon, react-dom, react-router-dom, and deployed on Heroku.

## Links:

- GitHub: https://github.com/NessJade96/Project-3
- Heroku: https://blooming-basin-11579.herokuapp.com/

## planning notes:

1. Go through the criteria

- Create wireframe concept of mobile, tablet, and desktop.
  -media queries: Mobile 320px - 480px, Tablet 481px - 1024px, PC 1025+px
- Create user login/signup page or model
  - link this to user signup (mutations/queries)
- Setup React, src code etc. Client and Server
  - Create Users and grocery item lists in database.
- Create the typeDefs, Resolvers, Models, and link to the front end with the Mutations and Query functions to render that data to components on the frontend jsx files.

Colorpallet from Coolors:

- Dark Purple: 41, 25, 46 RGB
- Burnished Brown: 139, 112, 113 RBG
- Xanadu: 114, 134, 107 RGB
- Laurel Green: 169, 183, 155 RGB
- Gainsboro: 221, 218, 222 RBG
  ![Colours](./assets/Colour%20Theme.jpg)

## Future Development:

- Turning the application into a PWA
- Giving users the option to remove other users from their lists
- Have the owners/creators of the shared list control the permissions of the others. Maybe some users can only add to the list and not remove, etc.
- Have a reset password funciton

## Commit notes:

1. Write my planning notes, folder setup, and create readme.md

2. Create React DOM to render the mobile screen.

3. React rendering and components first render.

4. Installed Styled-Components and the Babel-plugin-styled-components, to use for the applications styling. I read the docs and created a globalStyles.js for my background colour and text fonts etc.

5. Created styling for the NAV using sytled-components.
   ![Nav](./assets/Mobile-Nav-Style.jpg)

6. Made simple styling (pending some cleaning up) on the GroceryItemForm.
   ![GroceryItemForm](./assets/GroceryItemForm-styling.jpg)

7. Styling of the grocery list items.
   ![GroceryItems](./assets/GroceryListItems.jpg)

8. Changed the website icon, and other icons throughout the website.

9. Added in media queries for list page, added the login/logout button (no functions yet as I need to create the server).

10. Renamed each of the text/value variables so they are consistent like the amount and measurements variables.
    ![ShoppingListHomePageClient](./assets/MVP%20of%20grocery%20list%20CLIENT.jpg)

11. Files and folders for the server side created.

12. Created the loginForm and SignupForm components and began styling. I have imported all main components to the App.js. I later will create functions to conditionally render each component depending if the user is logged in, etc.

13. Imported the apollo client, auth, and react-router-dom. Implimented the functions for auth, and updated the App() function with the React Router and ApolloProvider. Changed styling on H3 component. Lastly, implemented navigation between the signup page and login pages.

14. Changed the uri in App.js to 'http://localhost:3001/graphql' so the frontend calls actually reach graphql. Updated some button styling. The login and Signup user work perfectly now. You can navigate between pages smoothly. Removed the profile picture because I decided I will add that in at the end if I have time as it does not meet MVP.
    ![signup](./assets/Signup%20page.jpg)

15. Wrote queries and mutations for GET_USER, and added AddGroceryList model, updated typeDefs, resolver, and mutation. Updated the GroceryItem, and User Model. Lastly created a new more mutations in the TypeDefs for the requests to make next.

16. Made it so that the GroceryList model to has a key for users, as an array of users that have access to the list. (handle permissions on frontend)

17. The addGroceryItems resolver was created and users can now create grocery lists and add items to that list.

18. Realised I needed to refactor the collection models -> so all the queries and mutations were created again for the new models and a code tidyup was completed.

19. Working on frontend components - I created the 'create list' component so users to enter a list name and this creates a list. Additionally created the YourLists component and page so display your lists
    ![Lists](./assets/YourLists.jpg)

20. Github continous deploy to heroku setup - site is live! When submitting your new list name, it will navigate you to 'yourlists' page on creation. When user is logged in and viewing their lists, the user can now delete the list by clicking on the cross.

21. Went through and changed the user loggedIn? navigation routes. Can now add groceryItems to the groceryList. Grocery list items now render the the screen.

22. Groceryitems can now be edited using an update mutation. There is now a new button on the Yourlists page where you can add who else has access to the lists. This will add the new user to the groceryLists array of users. The users are then rendered to the screen.

23. Moved the Nav component out of the App.jsx, and into each of the pages - this was to update the Header for each page.

Thank you, Vanessa Bloom <(^.^)>
