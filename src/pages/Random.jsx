import { useState, useEffect } from "react";

async function getRandom() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

export default function Random() {
  const [randomCocktail, setRandomCocktail] = useState({ drinks: [] });

  useEffect(() => {
    const loadRandomCocktail = async () => {
      const randomData = await getRandom();
      setRandomCocktail(randomData);
    };
    loadRandomCocktail();
  }, []);

  return (
    <>
      <div>
        <ul style={{ marginBottom: "0px" }}>
          {randomCocktail.drinks.map((ct) => (
            <div key={ct.idDrink}>
              <h2>{ct.strDrink}</h2>
              <img src={ct.strDrinkThumb} alt={ct.strDrink} width="300" />
              <p>
                <strong className="text-warning">Instructions:</strong>{" "}
                {ct.strInstructions}
              </p>
              <p>
                <strong className="text-warning">Ingredients:</strong>
              </p>
              {/* create array with 15 empty slots as there are 15 values */}
              {/* loop and transform each value into new array*/}
              {Array.from({ length: 15 }).map((_, index) => {
                const ingredient = ct[`strIngredient${index + 1}`];
                const measurement = ct[`strMeasure${index + 1}`];
                {
                  /*index+1 as the strIngrededient and
                      strMeasurement starts from 1 return if ingredient exist (not null) */
                }
                return ingredient ? (
                  <div key={index}>
                    {measurement ? `${measurement} ` : ""}
                    {ingredient}
                  </div>
                ) : null;
              })}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
