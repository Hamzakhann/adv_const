import React , {useState} from 'react'
import {Carousel} from 'react-bootstrap';
import './carosal.css'
function Carosal() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
  
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
      setDirection(e.direction);
    };
  
    return (
    <div className='container' >
    <div className='slider-container' >
      <Carousel indicators={false} activeIndex={index} direction={direction} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ytimg.com/vi/5HMptrBLzR4/maxresdefault.jpg"
            alt="First slide"
            className='id-block w-100'
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ytimg.com/vi/5HMptrBLzR4/maxresdefault.jpg"
            alt="Second slide"
            className='id-block w-100'
          />
  
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://i.ytimg.com/vi/5HMptrBLzR4/maxresdefault.jpg"
            alt="Third slide"
            className='d-block w-100'
          />
  
        </Carousel.Item>
      </Carousel>
      <div className='sm-img' >
      <img
            className="d-block w-100"
            src="https://i.ytimg.com/vi/5HMptrBLzR4/maxresdefault.jpg"
            alt="Third slide"
            className='d-block w-100'
          />
      </div>
      <div className='sm-img' >
      <img
            className="d-block w-100"
            src="https://i.ytimg.com/vi/5HMptrBLzR4/maxresdefault.jpg"
            alt="Third slide"
            className='d-block w-100'
          />
      </div>
      <div className='sm-img' >
      <img
            className="d-block w-100"
            src="https://i.ytimg.com/vi/5HMptrBLzR4/maxresdefault.jpg"
            alt="Third slide"
            className='d-block w-100'
          />
      </div>

      </div>
      </div>
    );
  }

  export default Carosal;