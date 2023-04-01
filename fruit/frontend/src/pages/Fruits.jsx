import React, { useState, useEffect } from 'react';
import CommonSection from '../shared/CommonSection';

import '../styles/fruit.css';

import FruitCard from './../shared/FruitCard';
import SearchBar from '../shared/SearchBar';
import Newsletter from '../shared/Newsletter';
import { Container, Row, Col } from 'reactstrap';

import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../untils/config.js';

const Fruits = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const {
    data:fruits,
    loading,
    error,
  } = useFetch(`${BASE_URL}/fruits?page=${page}`);
  const { data:fruitCount } = useFetch(
    `${BASE_URL}/fruits/search/getFruitCount`
  );

  useEffect(() => {
    const pages = Math.ceil(fruitCount / 8);
    setPageCount(pages);
    window.scrollTo(0, 0);
  }, [page, fruitCount, fruits]);

  return (
    <>
      <CommonSection title={'All Fruit'}></CommonSection>
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {loading && <h4 className="text-center pt-5">{error}</h4>}

          {!loading && !error && (
            <Row>
              {fruits?.map(fruit => (
                <Col lg="3" className="mb-4" key={fruit._id}>
                  <FruitCard fruit={fruit} />
                </Col>
              ))}
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? 'active__page' : ''}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Fruits;
