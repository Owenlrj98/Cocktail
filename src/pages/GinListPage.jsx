import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

async function getDataGin() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin";
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

export default function GinListPage() {
  const [gin, setGin] = useState({ drinks: [] }); //reminder: api is an object with drinks array in it

  useEffect(() => {
    const loadGin = async () => {
      const dataGin = await getDataGin();
      setGin(dataGin);
    };
    loadGin();
  }, []);

  return (
    <>
      <h1>Gin Cocktails</h1>
      <Link to="/browse">
        <button>Back</button>
      </Link>
      <div>
        {gin.drinks.map((gin) => (
          <div key={gin.idDrink}>
            <Link to={`/cocktails/${gin.idDrink}`} className="text-warning">
              <div>{gin.strDrink}</div>
            </Link>

            <Link to={`/cocktails/${gin.idDrink}`}>
              <img src={gin.strDrinkThumb} alt={gin.strDrink} width="200" />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
