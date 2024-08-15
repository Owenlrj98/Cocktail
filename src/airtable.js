const headers = {
    "Content-Type": "application/json",
    Authorization:
  `Bearer ${import.meta.env.VITE_APIKEY}`
  };
  // the constant below helps to prevent duplicates
  const fetchExistingCocktails = async () => {
      const url = "https://api.airtable.com/v0/appxzEJlWbr8OBPcp/Table%201";
      try {
        const response = await fetch(url, { headers });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
    
        const json = await response.json();
        return json.records.map(record => record.fields.idDrink); // Assuming idDrink is unique
      } catch (error) {
        console.error(error.message);
      }
    };
    
  
  export const addCocktail = async (name, thumb, id) => {
  // to check if there are existing dplicates
      const existingCocktails = await fetchExistingCocktails();
  
      if (existingCocktails.includes(id)) {
        throw new Error("Cocktail already exists in favourites.");
      }  
  // checks if id already exist in the airtable
    const url = "https://api.airtable.com/v0/appxzEJlWbr8OBPcp/Table%201";
    const payload = { 
      fields: {
          strDrink: name,
          strDrinkThumb: thumb,
          idDrink: id
     } 
  };
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
        headers,
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      const result = { id: json.id, ...json.fields };
  
      return result;
    } catch (error) {
      console.error(error.message);
    }
  };
  
  export const deleteCocktail = async (cocktailId) => {
      const url = `https://api.airtable.com/v0/appxzEJlWbr8OBPcp/Table%201/${cocktailId}`;
      try {
              const response = await fetch(url, {
              method: "DELETE",
              headers,
                  });
                  if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                  }
              
                  await response.json();
                } catch (error) {
                  console.error(error.message);
                }
              };
          