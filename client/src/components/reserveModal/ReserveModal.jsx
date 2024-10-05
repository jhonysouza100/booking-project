import "./reserveModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ReserveModal({ setOpen, hotelId }) {
  const[selectedRooms, setSelectedRooms] = useState([]); // select rooms to reserve
  const { data, loading, error } = useFetch(`http://localhost:8080/api/hotels/${hotelId}/rooms`); // get all rooms from an hotel
  const {dates} = useContext(SearchContext); // get dates from search context

  const getDatesInRange = (startDate, endDate) => { // calcule a range from date start to date end
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };


  const allDates = getDatesInRange(dates[0].startDate, dates[0].endDate);
  
  const isAvailable = (roomNumber) => {
    // del arreglo de rango de fechas, busca si ya tiene alguna de esas fechas incluidas in la habitacion
    const isFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter((item) => item !== value));
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`http://localhost:8080/api/rooms/availability/${roomId}`, {
            dates: allDates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  }

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((el, index) => (
          <div className="rItem" key={index}>
            <div className="rItemInfo">
              <div className="rTitle">{el.title}</div>
              <div className="rDesc">{el.desc}</div>
              <div className="rMax">
                Max people: <b>{el.maxPeople}</b>
              </div>
              <div className="rPrice">
                Price: <b>${el.price}</b>
              </div>
            </div>
            {el.roomNumbers.map((item, index) => (
              <div className="room" key={index*100}>
                <label>{item.number}</label>
                <input
                  type="checkbox"
                  value={item._id}
                  onChange={handleSelect}
                  disabled={!isAvailable(item)}
                />
              </div>
            ))}
          </div>
        ))}
        <button onClick={handleClick} className="rButton">Reserve Now!</button>
      </div>
    </div>
  );
}

export default ReserveModal;
