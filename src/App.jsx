import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";

// pages and components
import NavbarComponent from "./components/NavBar";
import GinListPage from "./pages/GinListPage";
import VodkaListPage from "./pages/VodkaListPage";
import TequilaListPage from "./pages/TequilaListPage";
import RumListPage from "./pages/RumListPage";
import WhiskeyListPage from "./pages/WhiskeyListPage";
import BrandyListPage from "./pages/BrandyListPage";
import CocktailSearch from "./pages/CocktailSearch";
import CocktailSearchResult from "./pages/CocktailSearchResult";
import FavouriteCocktailPage from "./pages/FavouriteCocktailPage";
import Random from "./pages/Random";
import BrowseCategory from "./pages/BrowseCategory";
import CocktailDetails from "./pages/CocktailDetails";

// css
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [cocktails, setCocktails] = useState({ drinks: [] });
  const location = useLocation(); //find current location
  const isHomePage = location.pathname === "/";
  // checks if route is at homepage

  return (
    <>
      <div className="bg-dark w-100 min-vh-100 text-white">
        <h1>Get Drunk Tonight</h1>
        <NavbarComponent />
        <CocktailSearch setCocktails={setCocktails} />
        {/* navigation bar */}
        {isHomePage && (
          <>
            <div className="text-danger">
              <h1>Featured Cocktail</h1>
            </div>
            <Random />
          </>
        )}
        {/* for making the featured cocktail invisible after clicking other links */}
        <Routes>
          <Route
            path="/search-results"
            element={<CocktailSearchResult cocktails={cocktails} />}
          />
          <Route path="/gin" element={<GinListPage />} />
          <Route path="/vodka" element={<VodkaListPage />} />
          <Route path="/tequila" element={<TequilaListPage />} />
          <Route path="/rum" element={<RumListPage />} />
          <Route path="/whiskey" element={<WhiskeyListPage />} />
          <Route path="/brandy" element={<BrandyListPage />} />
          <Route path="/favourites" element={<FavouriteCocktailPage />} />
          <Route path="/browse" element={<BrowseCategory />} />
          <Route
            path="/cocktails/:id"
            element={<CocktailDetails cocktails={cocktails} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
