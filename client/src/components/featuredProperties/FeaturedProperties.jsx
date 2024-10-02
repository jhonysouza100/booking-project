import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {

  const { data, loading, error } = useFetch("http://localhost:8080/api/hotels?featured=true&limit=4");

  return (
    <div className="fp">
      {loading ? "Loading" : <>
        {data.map((el, index) => (
          <div className="fpItem" key={index}>
          <img
            src={el.photos[0]}
            alt=""
            className="fpImg"
          />
          <span className="fpName">{el.name}</span>
          <span className="fpCity" style={{textTransform: "capitalize"}}>{el.city}</span>
          <span className="fpPrice">Starting from ${el.cheapestPrice}</span>
          {el.rating && <div className="fpRating">
            <button>{el.rating}</button>
            <span>Excellent</span>
          </div>}
        </div>
        ))}
      </>}
    </div>
  );
};

export default FeaturedProperties;
