import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import ReservationList from "./pages/ReservationList";
import CalendarFC from "./pages/Calendar";
import "react-calendar/dist/Calendar.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/reservations" element={<ReservationList />} />
        <Route path="/calendar" element={<CalendarFC />} />
      </Routes>
    </div>
  );
}

export default App;
