import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./reserveModal.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function ReserveModal({setOpen, hotelId}) {

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
      </div>
      <span>Select your rooms:</span>
    </div>
  );
}

export default ReserveModal;