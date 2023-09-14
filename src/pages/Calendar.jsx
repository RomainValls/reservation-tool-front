import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar"; // Import Calendar component

const API_URL = `http://localhost:5005`;

function CalendarFC() {
  const [date, setDate] = useState(new Date());
  const [locataire, setLocataire] = useState("");
  const [reservation, setReservation] = useState([]);
  const [datesBetween, setDatesBetween] = useState([]);

  async function getAllReservations() {
    try {
      const response = await axios.get(`${API_URL}/reservations`);
      await setReservation(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function handleClick() {
    console.log("date", date[0].toISOString());
  }

  async function postReservation(event) {
    try {
      event.preventDefault();
      try {
        const response = await axios.post(`${API_URL}/reservations`, {
          locataires: locataire,
          arrivée: date[0].toISOString(),
          départ: date[1].toISOString(),
        });
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllReservations();
  }, []);

  useEffect(() => {
    // This will calculate and update the datesBetween array before the map function is called
    const calculatedDatesBetween = reservation.map((res) => {
      const startDate = new Date(res.arrivée.substring(0, 10)); // Extract date part and convert to Date object
      const endDate = new Date(res.départ.substring(0, 10)); // Extract date part and convert to Date object

      // Calculate dates between startDate and endDate
      const dates = [];
      let currentDate = new Date(startDate);

      while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return [startDate, ...dates.slice(1)]; // Include startDate once, and the rest of the dates
    });

    setDatesBetween(calculatedDatesBetween);
  }, [reservation]);

  // Calculate and set the datesBetween array here

  return (
    <>
      <h1>Calendrier Barbâtre</h1>
      <div className="calendar-container">
        <Calendar onChange={setDate} value={date} selectRange={true} />
      </div>
      {date.length > 0 ? (
        <p>
          <span>Start:</span>
          {date[0].toLocaleDateString("fr-FR", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
          &nbsp;|&nbsp;
          <span>End:</span>
          {date[1].toLocaleDateString("fr-FR", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      ) : (
        <p>
          <span>Default selected date :</span>
          {date.toDateString()}
        </p>
      )}
      <button onClick={handleClick}>Log dates :</button>
      <form onSubmit={postReservation}>
        <div className="form-request-context">
          <label htmlFor="Prénom">Entrez votre nom et prénom</label>
          <input
            type="string"
            placeholder="Nom et prénom ici"
            onChange={(event) => setLocataire(event.target.value)}
          />
        </div>
        <button className="request-button">Réservez la maison !</button>
      </form>

      {datesBetween.map((dates, index) => (
        <div key={index}>
          {dates.map((d, idx) => (
            <span key={idx}>{d.toLocaleDateString("fr-FR")}</span>
          ))}
        </div>
      ))}
    </>
  );
}

export default CalendarFC;
