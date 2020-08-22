// eslint-disable-next-line
import React,{useEffect, useState} from 'react';
import Recipe from './Recipe.js';
import './App.css';

const App = () => {
  const APP_ID = "e03e83cb";
  const APP_KEY = "e411dbfba9976c2e8882440684bcc085";

  const [recipes, setRecipes] = useState([]);

  // runs on render
  const [search, setSearch] = useState(['']);

  // only updates on "submit"
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e =>  {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <h1 className="site-title">Recipe Finder</h1>
      <form onSubmit={getSearch} className="search-form">
        <input 
          className="search-bar" 
          type="text" 
          value={search}
          onChange={updateSearch}
          placeholder="Type a food..."
        />
        <button className="search-button" type="submit">Search</button>
      </form>
      <div className="recipe" >
      {recipes.map(recipe => (
        <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories.toFixed(1)}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
      ))}
        </div>
    </div>
  )
}

export default App;
