import { BrowserRouter, Routes, Route } from "react-router-dom";

import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import NeedList from "./pages/NeedList";
import Duplicates from "./pages/Duplicates";
import Countries from "./pages/Countries";
import CountryDetail from "./pages/CountryDetail";
import Backup from "./pages/Backup";
import Trade from "./pages/Trade";

import BottomNav from "./Components/BottomNav";

import { useTheme } from "./context/ThemeContext";

function App() {

  const { darkMode } = useTheme();

  return (
    <div
      className={
        darkMode
          ? "dark-theme"
          : "light-theme"
      }
    >
      <BrowserRouter>

        <div
          style={{
            paddingBottom: "80px"
          }}
        >
          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/search"
              element={<Search />}
            />

            <Route
              path="/need"
              element={<NeedList />}
            />

            <Route
              path="/duplicates"
              element={<Duplicates />}
            />

            <Route
              path="/trade"
              element={<Trade />}
            />

            <Route
              path="/countries"
              element={<Countries />}
            />

            <Route
              path="/country/:country"
              element={<CountryDetail />}
            />

            <Route
              path="/backup"
              element={<Backup />}
            />

          </Routes>
        </div>

        <BottomNav />

      </BrowserRouter>
    </div>
  );
}

export default App;