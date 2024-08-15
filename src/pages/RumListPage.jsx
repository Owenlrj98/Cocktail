import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

async function getDataRum() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Rum";
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

export default function RumListPage() {
  const [rum, setRum] = useState({ drinks: [] }); //reminder: api is an object with drinks array in it

  useEffect(() => {
    const loadRum = async () => {
      const dataRum = await getDataRum();
      setRum(dataRum);
    };
    loadRum();
  }, []);

  return (
    <>
      <h1>Rum Cocktails</h1>
      <Link to="/browse">
        <button>Back</button>
      </Link>
      <div>
        {rum.drinks.map((rum) => (
          <div key={rum.idDrink}>
            <Link to={`/cocktails/${rum.idDrink}`} className="text-warning">
              <div>{rum.strDrink}</div>
            </Link>
            <Link to={`/cocktails/${rum.idDrink}`}>
              <img src={rum.strDrinkThumb} alt={rum.strDrink} width="200" />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
