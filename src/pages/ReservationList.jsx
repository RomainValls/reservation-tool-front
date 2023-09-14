import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_URL = `http://localhost:5005`;

function ReservationList({ reservationProps }) {
  const [reservations, setReservations] = useState([]);

  const getAllReservations = () => {
    axios
      .get(`${API_URL}/reservations`)
      .then((response) => {
        console.log("this is the reservations response", response.data);
        setReservations(response.data);
      })
      .catch((error) => console.log(error));
  };

  const tileDisabled = ({ date }) => {
    const isoDate = formatDateISO(date);
    return datesBetween.some(
      (disabledDate) => formatDateISO(disabledDate) === isoDate
    );
  };

  useEffect(() => {
    getAllReservations();
  }, []);

  function formatDateLong(date) {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("fr-FR", options);
  }

  function getDatesBetween(startDate, endDate) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    dateArray.push(endDate);
    return dateArray;
  }

  function formatDateISO(date) {
    return date.toISOString();
  }

  return (
    <>
      <div>
        <h3>Reservations</h3>
      </div>
      <div className="ReservationList">
        {reservations.map((reservation) => {
          const arriveeDate = new Date(reservation.arrivée);
          const departDate = new Date(reservation.départ);
          const datesBetween = getDatesBetween(arriveeDate, departDate);
          console.log("Dates Between:", datesBetween);

          return (
            <div key={reservation._id}>
              <h3>{reservation.locataires}</h3>
              <h3>{formatDateISO(arriveeDate)}</h3>
              <h3>{formatDateISO(departDate)}</h3>
              <ul>
                {datesBetween.map((date, index) => (
                  <li key={index}>{formatDateISO(date)}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default ReservationList;
