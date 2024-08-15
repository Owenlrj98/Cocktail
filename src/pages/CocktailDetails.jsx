import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addCocktail,  } from "../airtable";

async function getCocktailDetails(id) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

export default function CocktailDetails() {
  const { id } = useParams();
  const [cocktail, setCocktail] = useState(null);

  const handleAdd = async (name, thumb, id) => {
    try {
      await addCocktail(name, thumb, id);
  } catch (error) {
      console.error(error.message);
  }
};

  useEffect(() => {
    const loadCocktailDetails = async () => {
      const data = await getCocktailDetails(id);
      if (data) {
        setCocktail(data.drinks[0]);
      }
    };
    loadCocktailDetails();
  }, [id]);

  if (!cocktail) return <div>Loading...</div>;

  return (
    <div>
      <h1>{cocktail.strDrink}</h1>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width="200"/>
      <p><strong className="text-warning">Category:</strong> {cocktail.strCategory}</p>
      <p><strong className="text-warning">Instructions:</strong> {cocktail.strInstructions}</p>
      <h3 className="text-warning">Ingredients:</h3>
      <ul>
        {Object.keys(cocktail)
          .filter(key => key.startsWith('strIngredient') && cocktail[key])
          .map(key => (
            <li key={key}>{cocktail[key]} {cocktail[`strMeasure${key.replace('strIngredient', '')}`]}</li>
          ))}
      </ul>
      <button onClick={() => handleAdd(cocktail.strDrink, cocktail.strDrinkThumb, cocktail.idDrink)}>
        Add to Favourites
      </button>
    </div>
  );
}
