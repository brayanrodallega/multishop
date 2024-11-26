import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/HienBolw.css";

// eslint-disable-next-line react/prop-types
const HienBowl = ({ image, title, description, imagePosition = "left" }) => {
  const isImageLeft = imagePosition === "left";

  return (
    <div className="container my-5">
      <div className={`row align-items-center ${isImageLeft ? "" : "flex-row-reverse"}`}>
        <div className="col-md-6">
          <div className="image-container">
            <img
              src={image}
              alt="Hien Bowl"
              className="img-fluid shadow-custom"
            />
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="text-uppercase text-light mb-3">{title}</h2>
          <p className="text-light">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default HienBowl;
