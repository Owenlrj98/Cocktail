import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

async function getDataWhiskey() {
  const url =
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Whiskey";
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

export default function WhiskeyListPage() {
  const [whiskey, setWhiskey] = useState({ drinks: [] });

  useEffect(() => {
    const loadWhiskey = async () => {
      const dataWhiskey = await getDataWhiskey();
      setWhiskey(dataWhiskey);
    };
    loadWhiskey();
  }, []);

  return (
    <>
      <h1>Whiskey Cocktails</h1>
      <Link to="/browse">
        <button>Back</button>
      </Link>
      <div>
        {whiskey.drinks.map((whiskey) => (
          <div key={whiskey.idDrink}>
            <Link to={`/cocktails/${whiskey.idDrink}`} className="text-warning">
              <div>{whiskey.strDrink}</div>
            </Link>
            <Link to={`/cocktails/${whiskey.idDrink}`}>
              <img
                src={whiskey.strDrinkThumb}
                alt={whiskey.strDrink}
                width="200"
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
