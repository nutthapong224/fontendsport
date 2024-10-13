// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePlayerfootball from "./page/Football"; // Import the CreatePlayer component
import CreateCoach from "./page/CreateCoach";  
import Home from "./page/Home"; 
import SearchCoaches from "./page/SearchCoaches"; 
import SearchPlayers from "./page/Searchplayer"; 
import Createplayerbasketballmen from "./page/Basketballmen" 
import Createplayerbasketballwomen from "./page/Basketballwomen"; 
import Volleyballmen from "./page/Volleyballmen"; 
import Volleyballwomen from "./page/Volleyballwomen"; 
import Tabletenissinglemen from "./page/Tabletenissinglemen"; 
import Tabletenissinglewomen from "./page/Tabletenissinglewomen"; 
import Tabletenisdoublemen from "./page/Tabletenisdoublemen"; 
import Tabletenisdoublewomen from "./page/Tabletenisdoublewomen"; 
import Petanquesingle from "./page/Petanquesinglemen"; 
import Tabletenismix from "./page/Tabletenismix"; 
import Esport from "./page/Esport"; 
import Badmintondoublemen from "./page/Badmintondoublemen"; 
import Badmintondoublewomen from "./page/Badmintondoublewomen"; 
import Badmintonmix from "./page/Badmintonmix"; 
import Badmintonsinglemen from "./page/Badmintonsinglemen";
import Badmintonsinglewomen from "./page/Badmintonsinglewomen";  
import Hooptakraw from "./page/Hooptakraw"; 
import Petanquesinglemen from "./page/Petanquesinglemen"; 
import Petanquedoublemen from "./page/Badmintondoublewomen" 
import Petanquedoublewomen from "./page/Petanquedoublewomen"; 
import Petanquedoublemix from "./page/Petanquedoublemix"; 
import Petanquesinglewomen from "./page/Petanquesinglewomen"; 
import Takrawdoublemen from "./page/Takrawdoublemen "; 
import Takrawdoublewomen from "./page/Takrawdoublewomen"; 
import Takrawsinglemen  from "./page/Takrawsinglemen"; 
import Takrawsinglewomen from "./page/Takrawsinglewomen"; 
import Takrawteammen from "./page/Takrawteammen"; 
import Futsalsinglemen from "./page/Futsalmen"; 
import Futsalsinglewomen from "./page/Futsalwomen"; 
import Createplayer from "./page/Createplayer";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/createcoach" element={<CreateCoach />} />
        <Route path="/football" element={<CreatePlayerfootball />} />
        <Route path="/basketballmen" element={<Createplayerbasketballmen />} />
        <Route
          path="/basketballwomen"
          element={<Createplayerbasketballwomen />}
        />
        <Route path="/hooptakraw" element={<Hooptakraw />} />
        <Route path="/petanquesinglemen" element={<Petanquesinglemen />} />
        <Route path="/petanquesinglewomen" element={<Petanquesinglewomen />} />
        <Route path="/petanquedoublewomen" element={<Petanquedoublewomen />} />
        <Route path="/petanquedoublemen" element={<Petanquedoublemen />} />
        <Route path="/petanquedoublemix" element={<Petanquedoublemix />} />
        <Route path="/volleyballmen" element={<Volleyballmen />} />
        <Route path="/volleyballwomen" element={<Volleyballwomen />} />
        <Route path="/tabletenissinglemen" element={<Tabletenissinglemen />} />
        <Route path="/tabletenisdoublemen" element={<Tabletenisdoublemen />} />
        <Route path="/tabletenismix" element={<Tabletenismix />} />
        <Route path="/badmintondoublemen" element={<Badmintondoublemen />} />
        <Route path="/badmintonsinglemen" element={<Badmintonsinglemen />} />
        <Route path="/takrawdoublemen" element={<Takrawdoublemen />} />
        <Route path="/takrawdoublewomen" element={<Takrawdoublewomen />} />
        <Route path="/takrawsinglemen" element={<Takrawsinglemen />} />
        <Route path="/takrawsinglewomen" element={<Takrawsinglewomen />} />
        <Route path="/takrawteammen" element={<Takrawteammen />} />
        <Route path="/futsalsinglemen" element={<Futsalsinglemen />} />
        <Route path="/futsalsinglewomen" element={<Futsalsinglewomen />} />
        <Route path="/createplayer" element={<Createplayer />} />
        <Route
          path="/badmintondoublewomen"
          element={<Badmintondoublewomen />}
        />
        <Route path="/badmintonmix" element={<Badmintonmix />} />
        <Route
          path="/badmintonsinglewomen"
          element={<Badmintonsinglewomen />}
        />
        <Route
          path="/tabletenisdoublewomen"
          element={<Tabletenisdoublewomen />}
        />

        <Route path="/petanquesingle" element={<Petanquesingle />} />
        <Route path="/esport" element={<Esport />} />
        <Route
          path="/tabletenissinglewomen"
          element={<Tabletenissinglewomen />}
        />
        <Route path="/searchcoach" element={<SearchCoaches />} />
        <Route path="/searchplayers" element={<SearchPlayers />} />
      </Routes>
    </Router>
  );
}

export default App;
