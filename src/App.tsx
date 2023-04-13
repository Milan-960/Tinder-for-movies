import MovieRecommendation from "./components/MovieRecommendation";
import { MovieContextProvider } from "./hooks/MovieContext";
import "./App.css";
import "./styles/MovieCard.css";
import "./styles/MovieRecommendation.css";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Tinder for Movies</h1>
        </header>
      </div>

      <MovieContextProvider>
        <MovieRecommendation />
      </MovieContextProvider>
    </>
  );
}

export default App;
