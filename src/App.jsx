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
import Volleyballwomen from "./page/volleyballwomen"; 
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
import Petanquedoublemen from "./page/Petanquedoublemen" 
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
import Fulsalpage from "./page/Futsalpage"; 
import Basketballpage from "./page/Basketballpage"; 
import Volleyballpage from "./page/volleyballpage"; 
import Tabletenispage from "./page/Tabletenispage";   
import Tabletenismen from "./page/Tabletenismen"; 
import Tableteniswomen from "./page/Tableteniswomen"; 
import Petanquepage from "./page/Petanquepage"; 
import Petanquemen from "./page/Petanquemen"; 
import Petanquewomen from "./page/Petanquewomen"; 
import Badmintonpage from "./page/Badmintonpage"; 
import Badmintonmen from "./page/Badmintonmen"; 
import Badmintonwomen from "./page/Badmintonwomen"; 
import Takrawpage from "./page/Takrawpage"; 
import Takrawwomen from "./page/Takrawwomen"; 
import Takrawmenpage from "./page/Takrawmenpage"; 
import Playerdetail from "./page/Playerdetail"; 
import CoachDetail from "./page/Coachdetail"; 
import ExportExcelButton from "./page/Exportplayer";






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/exportplayer" element={<ExportExcelButton />} />
        <Route path="/player/:id" element={<Playerdetail />} />
        <Route path="/coach/:id" element={<CoachDetail />} />
        <Route path="/createcoach" element={<CreateCoach />} />
        <Route path="/football" element={<CreatePlayerfootball />} />
        <Route path="/basketballmen" element={<Createplayerbasketballmen />} />
        <Route path="/volleyballpage" element={<Volleyballpage />} />
        <Route path="/tabletenispage" element={<Tabletenispage />} />
        <Route path="/tabletenismen" element={<Tabletenismen />} />
        <Route path="/tableteniswomen" element={<Tableteniswomen />} />
        <Route path="/petanquepage" element={<Petanquepage />} />
        <Route path="/petanquemen" element={<Petanquemen />} />
        <Route path="/petanquewomen" element={<Petanquewomen />} />
        <Route path="/badmintonpage" element={<Badmintonpage />} />
        <Route path="/badmintonmen" element={<Badmintonmen />} />
        <Route path="/badmintonwomen" element={<Badmintonwomen />} />
        <Route
          path="/basketballwomen"
          element={<Createplayerbasketballwomen />}
        />
        <Route path="/basketballpage" element={<Basketballpage />} />
        <Route path="/fulsalpage" element={<Fulsalpage />} />
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
        <Route path="/takrawpage" element={<Takrawpage />} />
        <Route path="/takrawmenpage" element={<Takrawmenpage />} />
        <Route path="/takrawwomenpage" element={<Takrawwomen />} />
        <Route path="/futsalmen" element={<Futsalsinglemen />} />
        <Route path="/futsalwomen" element={<Futsalsinglewomen />} />
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
