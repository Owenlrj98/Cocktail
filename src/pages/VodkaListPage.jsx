import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

async function getDataVodka() {
  const url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka";
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

export default function VodkaListPage() {
  const [vodka, setVodka] = useState({ drinks: [] });

  useEffect(() => {
    const loadVodka = async () => {
      const dataVodka = await getDataVodka();
      setVodka(dataVodka);
    };
    loadVodka();
  }, []);

  return (
    <>
      <h1>Vodka List</h1>
      <Link to="/browse">
        <button>Back</button>
      </Link>
      <div>
        {vodka.drinks.map((vodka) => (
          <div key={vodka.idDrink}>
            <Link to={`/cocktails/${vodka.idDrink}`} className="text-warning">
              <div>{vodka.strDrink}</div>
            </Link>
            <Link to={`/cocktails/${vodka.idDrink}`}>
              <img src={vodka.strDrinkThumb} alt={vodka.strDrink} width="200" />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
