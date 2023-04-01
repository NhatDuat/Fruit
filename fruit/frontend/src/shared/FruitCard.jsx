import React from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import calculateAvgRating from '../untils/avgRating';
import './fruit-card.css';


const FruitCard = ({ fruit }) => {
  const { _id, title, city ,photo,price, featured, reviews } = fruit;

  const { totalRating, avgRating } = calculateAvgRating(reviews);

  return (
    <div className="fruit__card">
      <Card>
        <div className="fruit__img">
          <img src={photo} alt="fruit-img" />
          {featured && <span>Chất lượng</span>}
        </div>
        
        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="fruit__location d-flex align-items-center gap-1">
              <i class="ri-map-pin-line"></i>
              {city}
            </span>
            <span className="fruit__rating d-flex align-items-center gap-1">
              <i class="ri-star-fill"></i> {avgRating === 0 ? null : avgRating}
              {totalRating === 0 ? (
                'Not rated'
              ) : (
                <span>({reviews.length})</span>
              )}
            </span>
          </div>

          <h5 className="fruit_title">
            <Link to={`/fruits/${_id}`}>{title}</Link>
          </h5>
          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>
              ${price} <span> /kg</span>
            </h5>

            <button className="btn booking__btn">
              <Link to={`/fruits/${_id}`}>Mua ngay</Link>
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default FruitCard;
