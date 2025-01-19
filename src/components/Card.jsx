import { useState } from "react";
import { Link } from "react-router-dom";
import style from "../components/Card.module.css";

function Card({
  image = "https://picsum.photos/600/400",
  title,
  badge,
  description = "Descrizione non presente",
  id,
  onDelete,
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className={`card ${style.cardEffect} ${hover ? style.cardHover : ""}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className={style.imageWrapper}>
        <img
          src={image}
          className={`card-img-top ${style.cardImg}`}
          alt={title}
        />
        {hover && <div className={style.overlay}></div>}
      </div>
      <div className="card-body text-center">
        <h5 className="card-title text-truncate">{title}</h5>
        <p className={`card-text ${style.description}`}>{description}</p>
        <span className={`badge bg-primary ${style.badge}`}>{badge}</span>
        <div className="mt-3">
          <Link to={`/posts/${id}`} className="btn btn-outline-primary me-2">
            Vedi dettaglio
          </Link>
          <button onClick={onDelete} className="btn btn-danger">
            Elimina
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
