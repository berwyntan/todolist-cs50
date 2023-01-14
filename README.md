# ToDoList

### Video Demo

### About
This is my final project for CS50x 2022. It is a todo list app, built with PERN stack. The idea for this app came from using Reminders app on iOS. It felt good to complete tasks and watch them disappear from your list, but it would be great to be able to reuse completed tasks so you didn't have to type it again. This makes it easy to add back your habit to the list.
The app includes a habit tracker in the form of a heatmap, like Github. 

The idea for the app is built on James Clear's Atomic Habits:

#### Make it obvious
App loads straight to the todolist on refresh.
#### Make it easy
The text field for the entry of habits is relatively small, encouraging the user to keep it simple.
You do not need to retype repeat todos, simply go to the Done list and uncheck it.
#### Make it attractive
You get to check your habit off and watch it disappear (to the completed list).
#### Make it satisfying
The heatmap gives a visual image of the times you did the todo per day, for a year.

### Frontend
Built with React.

#### Libraries used
- Axios
- React Hook Form
- React Router Dom
- Zustand
- DayJS
- Tailwind CSS & DaisyUI

#### Code features

##### Validation
Login and signup come with validation. Invalid email will be rejected. Passwords must have at least 5 characters that are alphanumeric. When signing up, password must be entered twice and be the same. React Hook Form handles the validation and then makes a request to the backend on submission.

##### Responsive design
Works for both mobile and desktop. Comes with light and dark mode based on system preferences.

##### User interface
The user will have a list on items to do ("ToDos") and a list of completed items ("Done"). Uncompleted todos can be checked off and sent to "Done." If you need to repeat that todo, you can go to "Done", click the checkbox and the todo will go back to "ToDos".

The todos are sorted in ascending order of created date. The oldest todo will be at the top and the newest at the bottom. If a todo is completed and moved to the other list, it will be considered "new" and will be placed at the bottom of the list.

Tasks are created by clicking the "Add Todo" button. To keep the interface clean, the user will press enter to add a new task. There is validation to check if the field is empty. If nothing is typed and the user presses enter, an error message will appear.

When a task is completed, it can be checked off by clicking the checkbox. To create the impression of the item being removed from the todo list after being checked, a setTimeout function is used that delays the updating of the todos to the database. Client side updates the state first, then after 2 seconds, server side is updated and then the client side gets the updated data from the database, updating the page.

Todos can be edited by clicking on the todo text. The HTML div containing the text has an onClick listener. Clicking will toggle the "edit" state and render an input text field in place of the original text. This input field has controlled inputs using React's useState. As with the adding of todos, the user presses enter to trigger the update of the todo to the database. The client side will then fetch the updated data. The updated todo will then be rendered, in the same sequence before the changes. This maintains a sense of consistency. If the text is unchanged and the user presses enter, no network call to the backend will be made. 

If needed, user can logout by clicking the "Logout" button.

### Backend
The backend is running on Node and Express. The API functions are modularized to model, controller, router. Passwords are hashed with Bcrypt so the database does not store the actual password.

#### Libraries used
- Bcrypt
- Cors
- Dotenv
- Sequelize
- Validator
- JSONWebToken

#### Code features

##### Validation for APIs
Every API function checks whether the required fields are defined. If undefined, the function will return an error message to the frontend.
Validator checks the user inputs from the API calls, such as whether the password has at least 5 characters and is alphanumeric.

##### Authentication/API calls with Access Token
Authentication is done with JWTs, where the client receives an access token. The access token is used for API calls to protected routes on the backend. On the access token is the user's unique id. If the id in request parameters and the id on the access token are not the same, the API call returns an error 403.

##### Persistent login
Client side receives a refresh token in a HTTP only cookie on logging in. The refresh token lasts for 2 days. When the app loads, the client will send an API call with the refresh token via useEffect. The refresh token is verified and if the user email and the token exists on the database, a new access token is issued and the user is logged in automatically.

##### Database

![Database schema](https://res.cloudinary.com/dkilrhnk7/image/upload/v1671802742/drawSQL-export-2022-12-23_21_38_hc3st6.png)

The database is PostgreSQL, hosted on ElephantSQL.
Sequelize is used as the ORM.

##### Future improvements

- Multiple lists per user
- Functionality to update password and email
