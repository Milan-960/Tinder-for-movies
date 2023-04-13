import "./App.css";
import MovieRecommendation from "./components/MovieRecommendation";
import { MovieContextProvider } from "./hooks/MovieContext";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Tinder for Movies</h1>
        </header>
      </div>

      <MovieContextProvider>
        <MovieRecommendation />
      </MovieContextProvider>
    </>
  );
}

export default App;
