import { Link } from "react-router-dom";

export default function BrowseCategory() {
  return (
    <div>
      <h2>Browse Cocktail by Spirit Type</h2>
      <div>
        <Link to="/gin">
          <button>Gin</button>
        </Link>
        <Link to="/vodka">
          <button>Vodka</button>
        </Link>
        <Link to="/tequila">
          <button>Tequila</button>
        </Link>
        <Link to="/rum">
          <button>Rum</button>
        </Link>
        <Link to="/whiskey">
          <button>Whiskey</button>
        </Link>
        <Link to="/brandy">
          <button>Brandy</button>
        </Link>
      </div>
    </div>
  );
}
