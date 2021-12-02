Matthew Vargas Code Review:
1. Your project is organized quite well, it's quite clear what each component is for and all the styling for each component.
2. I saw the built in validations for the form worked well, I even tested not inputting correct data
3. I think some of your styling, particularly for images, is not sized symmetrically, so it looks a little strange.
4. I tried to request laundry services, and i didn't fill in any checkboxes, but put in a valid date in the future (1/31/2022), and got an error of "can't choose date in the past".  I think the error fired when I didn't fill anything in, but the response error on the front end doesn't make sense.  
5. I actually tried the form again, and am not sure what I'm doing wrong or if it's not fully implemented yet.  It still isn't working for me.

# [Hamper Dash - Laundry App](https://hamperdash.herokuapp.com/)

## Objective:

Create a working platform app that provides users and providers to request/provide laundry services.

As a registered user you can request laundry/dry cleaning as well as additional options like folded or delivered. You can narrow the provider results by the selective criteria of your laundry needs and sort the providers by price/distance. You can then select which provider you wish to engage in the transaction with. You can edit your profile details in the profile page.

As a registered provider you can individually add which laundry services you wish to provide, such as delivery, dry clean, folding, or wash. You can then individually edit the prices for each of the services as well as remove the services completely.

## Project URL:

[Hamper Dash Heroku Depolyment](https://hamperdash.herokuapp.com/).

## Video Demonstration:

[Hamper Dash Youtube Demo Video](https://www.youtube.com/watch?v=8nVDjWNg4Tw).

## Local Execution

- Download/clone this project from [Hamper Dash - Laundry App GithHub Repo](https://github.com/michaelchang106/laundryApp).
- Make sure to install node.js, which will come with node project manager (npm).
- Change to the folder where you download the applicaiton using the OS terminal.
- Type in the terminal `yarn install` to install all the dependencies.
- Type in the terminal `yarn start` to start the server.
- In a new terminal tab browse to laundryApp/front and type `yarn start` to start the front end React development server.
- In your favorite browser go to http://localhost:3000/.

## Google Slides

[Hamper Dash - Laundry App Google slides](https://docs.google.com/presentation/d/1bYNIuE9gPj8sa-mBor1tm1KgpyxUjtUu8uHuIROcY2s/edit?usp=sharing)

## Folder Content (Backend):

### database

- Contains all the JavaScript code for managing and querying interactions with the MongoATLAS server.

### routes

- Contains all the JavaScript code for handling the route requests coming from the front end.

## Folder Content (Frontend):

### public

- Contains the base index.html used for rendering the React root.

### src

- Contains the different directories organized by:
  - components - the different React components built and organized by 
    - customer 
    - layout 
    - login 
    - provider
    - signups 
    - ui
  - images - images used in the different components and pages
  - pages - the page components that are the face of what the user sees and houses other sub-components
  - store - the data store that is used for delivering context throughout components

## Division of works and tasks

### Both team members collaborated and contributed evenly on:

- Database (dbManager)
- index Routes
- MongoDB implementation
- CSS styling

### [Michael Chang](https://github.com/michaelchang106)

- Users (customers)
- Login

### [Daniel Lisko](https://github.com/djlisko01)

- Providers

## Test User Accounts
### Customer Test Account
- Email: john_doe@email.com 
- Password: 123

### Provider Test Account
- Email: dirtybiz@gmail.com 
- Password: 123

