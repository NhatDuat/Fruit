import React, { useEffect, useRef, useState, useContext } from 'react';
import '../styles/fruit-details.css';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import calculateAvgRating from '../untils/avgRating';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../compontents/Booking/Booking';
import Newsletter from '../shared/Newsletter';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../untils/config';
import { AuthContext } from '../context/AuthContext';

const FruitDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [fruitRating, setFruitRating] = useState(null);
  const {user} = useContext(AuthContext)

  //fetch data from database
  const { data: fruit, loading, error } = useFetch(`${BASE_URL}/fruits/${id}`);
  //this is an static data later we will call our API and load our data from database
  // const fruit = FruitData.find((fruit) => fruit.id === id);

  //destructure properties from fruit object

  const {
    photo,
    title,
    desc,
    price,
    address,
    reviews,
    city,
    distance,
    maxGroupSize,
  } = fruit;

  const { totalRating, avgRating } = calculateAvgRating(reviews);
  //format date
  const options = { day: 'numeric', month: 'long', year: 'numeric' };

  //submit request to the server
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    

    try {
      if(!user || user ===undefined || user === null){
        alert('Please sign in')
      }

      const reviewObj = {
        username:user?.username,
        reviewText,
        rating:fruitRating
      }


      const res= await fetch(`{BASE_URL}/reviews/${id}`,{
        method:'post',
        headers:{
          'content-type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(reviewObj)
      })

   const result = await res.json()
   if(!res.ok) {
    return alert(result.message);
   }

   alert(result.message)
    }catch (error){
      alert(error.message);

    }

  
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [fruit]);

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading.......</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              <Col lg="8">
                <div className="fruit__content">
                  <img src={photo} alt="" />
                  <div className="fruit__info">
                    <h2>{title}</h2>

                    <div className="d-flex align-items-center gap-5">
                      <span className="d-flex align-items-center gap-1">
                        <span className="fruit__rating d-flex align-items-center gap-1">
                          <i
                            class="ri-star-fill"
                            style={{ color: 'var(--secondary -color)' }}
                          ></i>{' '}
                          {avgRating === 0 ? null : avgRating}
                          {totalRating === 0 ? (
                            'Not rated'
                          ) : (
                            <span>({reviews?.length})</span>
                          )}
                        </span>
                      </span>
                      <span>
                        <i class="ri-map-pin-user-fill"></i> {address}
                      </span>
                    </div>

                    <div className="fruit__extra-details">
                      <span>
                        <i class="ri-map-pin-2-line"></i>
                        {city}
                      </span>
                      <span>
                        <i class="ri-money-dollar-circle-line"></i> ${price}/Kg
                      </span>
                      <span>
                        <i class="ri-map-pin-time-line"></i> {distance}k/m
                      </span>
                      <span>
                        {' '}
                        <i class="ri-time-line"></i>
                        {maxGroupSize} h
                      </span>
                    </div>
                    <h5>Description</h5>
                    <p>{desc}</p>
                  </div>
                  {/*================== fruit reviews section==========*/}
                  <div className="fruit__reviews mt-4">
                    <h4>Reviews({reviews?.length} reviews)</h4>

                    <Form onSubmit={submitHandler}>
                      <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                        <span onClick={() => setFruitRating(1)}>
                          1 <i class="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setFruitRating(2)}>
                          2 <i class="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setFruitRating(3)}>
                          3 <i class="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setFruitRating(4)}>
                          4 <i class="ri-star-fill"></i>
                        </span>
                        <span onClick={() => setFruitRating(5)}>
                          5 <i class="ri-star-fill"></i>
                        </span>
                      </div>

                      <div className="review__input">
                        <input
                          type="text"
                          ref={reviewMsgRef}
                          placeholder="share your thoughts"
                          required
                        />
                        <button
                          className="btn primary__btn text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                    <ListGroup className="user__reviews">
                      {reviews?.map((review) => (
                        <div className="review__item">
                          <img src={avatar} alt="" />

                          <div className="w-100">
                            <div className="d-flex align-items-center justify-content-between ">
                              <div>
                                <h5>{review.username}</h5>
                                <p>
                                  {new Date('05-03-2023').toLocaleDateString(
                                    'en-US',
                                    options
                                  )}
                                </p>
                              </div>
                              <span className="d-flex align-items-center ">
                                {review.rating}<i class="ri-star-s-fill"></i>
                              </span>
                            </div>
                            <h6>{review.reviewText}</h6>
                          </div>
                        </div>
                      ))}
                    </ListGroup>
                  </div>
                  {/*================== fruit reviews section end==========*/}
                </div>
              </Col>
              <Col lg="4">
                <Booking fruit={fruit} avgRating={avgRating} />
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default FruitDetails;
