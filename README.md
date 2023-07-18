# Pantry

## Date: 7/06/2023

### By: Adam Buffett

[GitHub](https://github.com/Fizreal) | [LinkedIn](https://www.linkedin.com/in/adam-buffett/) | [Trello](https://trello.com/b/vOLUolQq/pantry)

---

#### **_Description_**

Pantry is a grocery assistant tool that allows you create recipes and quickly generate grocery lists based on the recipes you plan to make. Ensure you are buying enough of the ingredients shared across your recipes, and never forget about minor ingredients again!

Pantry also comes with "Suggested ingredients" powered by OpenAi's GPT-3.5 Turbo model that recommends additional items to help supplement key nutrients.

---

#### **_Technologies Used_**

![Technologies Used](https://skillicons.dev/icons?i=react,nodejs,express,mongodb,js,tailwind)

- React
- Node.js
- Express
- MongoDB
- Javascript
- Tailwind CSS
- Mongoose

---

## API Integration

Utilized Edamam's API to draw on a database of over 900,000 foods for users to use creating their recipes, as well as OpenAI's API to generate suggestions based on deficient nutrients in a users grocery list.

#### **_Getting Started_**

[Visit Pantry](https://pantry-buddy.vercel.app/)

You will be prompted to register an account and login. Once authenticated you wil be able to create your recipes in the app, and then generate grocery lists from you your selected recipes.

---

#### **_Screenshots_**

**Create and browse your recipes (mobile)**

![Imgur](https://i.imgur.com/7ciWR0r.png)

**Search for ingredients (wide-screen)**

![Imgur](https://i.imgur.com/2Csde23.png)

**Generate grocery lists and receive AI generated suggestions (iPad)**

![Imgur](https://i.imgur.com/5OeenGC.png)

---

#### **_Task List_**

- [x] Deploy MVP
  - [x] Create Express server
    - [x] Create data models
    - [x] Enable User authentication and authorization with JWT
    - [x] Establish routes/controllers
      - [x] Auth
      - [x] Recipes
      - [x] GroceryLists
      - [x] Ingredients
  - [x] Create React application
    - [x] Set up BrowserRouter and Routes
    - [x] Set up services
    - [x] Create pages
      - [x] Home
      - [x] Recipes
      - [x] Recipe
      - [x] CreateRecipe
      - [x] SearchIngredients
      - [x] GroceryLists
      - [x] GroceryList
      - [x] SearchRecipes
    - [x] Create components
      - [x] NavBar
      - [x] SearchBar
      - [x] RecipeCard
      - [x] GroceryCard
      - [x] IngredientCard
- [x] Modify compiled grocery lists quantities/ingredients
- [x] OpenAI ingredient suggestions
- [ ] Friend requests
- [ ] Filter recipes by ingredients

---

#### **_Credits_**

**Edamam API**: [Edamam](https://www.edamam.com/)

**OpenAI API**: [OpenAI](https://openai.com/)

**Google fonts**:

- [Montserrat](https://fonts.google.com/specimen/Montserrat)
- [Titilliu](https://fonts.google.com/specimen/Titilliu)

**Icons**:

- [Flaticon](https://www.flaticon.com/)
  - [Trash](https://www.flaticon.com/free-icons/delete)
  - [Minus](https://www.flaticon.com/free-icons/minus)
  - [Grocery bag](https://www.flaticon.com/free-icons/groceries)
