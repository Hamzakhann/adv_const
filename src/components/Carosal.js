import React , {useState ,useEffect} from 'react'
import {Carousel} from 'react-bootstrap';
import './carosal.css'
function Carosal() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(null);
    const [data , setData] = useState("")
    const [others , setOthers] = useState('')


    useEffect(() => {
        const fetchData =[
            {image:"http://res.cloudinary.com/atayyab1/image/upload/v1574146186/eqggexixmlqutmjebzga.jpg"},
            {image:"http://res.cloudinary.com/atayyab1/image/upload/v1574146451/uxp2pmiccjmfrx2vosqk.jpg"},
            {image:"http://res.cloudinary.com/atayyab1/image/upload/v1574146713/zhhzoypqpq8pv8awce3g.jpg"},
            {image:"http://res.cloudinary.com/atayyab1/image/upload/v1574146920/wth12ajvvpsji2ix7hc3.jpg"},
            {image:"http://res.cloudinary.com/atayyab1/image/upload/v1574147144/lk5yhzsqlvnmzkbnl0jk.jpg"},
            {image:"http://res.cloudinary.com/atayyab1/image/upload/v1574147373/ai40hylie0bq14xryvvs.jpg"},
            {image:"http://res.cloudinary.com/atayyab1/image/upload/v1574147654/ggpfasjruno3c2aan4kt.jpg"},
            {image:"http://res.cloudinary.com/atayyab1/image/upload/v1574148743/melrwnz1qcjkxg2zcgcz.jpg"},
        ] 
        setData(fetchData)
        let newData = [...fetchData]
        setOthers([...newData.slice(1,newData.length) , newData[0]])
    }, [])

    const setcarosal = () =>{
      
        if(index < data.length-1){
            setIndex(index+1)
        }else{
            setIndex(0)
        }
        let newArry = others.splice(0,1)
        setOthers([...others , ...newArry])
    }

    console.log(others.length , 'checkuuu')
    return (
    <div className='container' >
    <div className='slider-container' >
      <Carousel indicators={false} activeIndex={index} direction={direction} controls={false}>
          {data && data.map((img)=>{
              return(
                <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={img.image}
                  alt="First slide"
                  className='id-block w-100'
                />
                </Carousel.Item>
              )
          })}
      </Carousel>
      
      <div className='side-crop' >
      <img
            className="d-block w-100 sm-carosal"
            src={others && others[0].image}
            alt="Third slide"
          />
      </div>
      <div className='side-crop' >
      <img
            className="d-block w-100 sm-carosal"
            src={others && others[1].image}
            alt="Third slide"

          />
      </div>
      <div className='side-crop' >
      <img
            className="d-block w-100 sm-carosal"
            src={others && others[2].image}
            alt="Third slide"

          />
      </div>

      </div>
      <button onClick={()=> setcarosal()} >Set carosal</button>
      </div>
    );
  }

  export default Carosal;