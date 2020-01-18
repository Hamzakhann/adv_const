import React, { useEffect, useState } from 'react';
import { useParams , useHistory } from 'react-router-dom';
import  HeaderComponent from '../components/header';
import FooterComponent from '../components/footer';
import '../product-detail.css';
import axios from 'axios';

function ProductDetails(props) {
   const [ids,setIds] = useState()
   const [product, setProduct] = useState();
   const [nextProduct, setNextProduct] = useState();
   let { id } = useParams();
   let history = useHistory();
   const [currentId , setCurrentId] = useState(id)
   const [isDisabled , setDisabled] = useState(false)

   useEffect(() => {
	   let newIds =props.location.state.projects.map((project) =>project.id) 
		setIds(newIds)

	   let p_1 = axios.get('https://adv-construction.herokuapp.com/front/projectPage?id=' + currentId)
	   let p_2 = axios.get('https://adv-construction.herokuapp.com/front/projectPage?id=' + newIds[1])

	   axios.all([p_1,p_2]).then(axios.spread((...response)=>{
		   console.log(props.location.state.projects.map((project) =>project.id) , 'aftetr res')
		//    console.log('all walay' ,response[1].data[0])
		   setProduct(response[0].data[0]);
		   setNextProduct(response[1].data[0])
	   }))
	//    axios.get('https://adv-construction.herokuapp.com/front/projectPage?id=' + currentId).then(res => {
	// 	   console.log('res chek hello', res.data[0]);
	// 	   setProduct(res.data[0]);
	//    })
   }, [])
  const nextProject = ()=>{
	  if(nextProduct !== undefined){
		if(currentId == ids[ids.length -1] || nextProduct.id == ids[ids.length -1]){
			let newId = nextProduct.id
			setCurrentId(newId)
			history.push('/product-details/' + newId)
			let p_1 = axios.get('https://adv-construction.herokuapp.com/front/projectPage?id=' + newId)
			let p_2 = axios.get('https://adv-construction.herokuapp.com/front/projectPage?id=' + ids[0])
			axios.all([p_1,p_2]).then(axios.spread((...response)=>{
				console.log('all walaaaa' ,response[1].data[0])
				setProduct(response[0].data[0]);
				setNextProduct(response[1].data[0])
			}))	  
		}else{
			let newId = ids[ids.indexOf(Number(currentId)) + 1]
			let nextNewId = ids[ids.indexOf(Number(currentId)) + 2]
			setCurrentId(newId)
			history.push('/product-details/' + newId)
			let p_1 = axios.get('https://adv-construction.herokuapp.com/front/projectPage?id=' + newId)
			let p_2 = axios.get('https://adv-construction.herokuapp.com/front/projectPage?id=' + nextNewId)
			axios.all([p_1,p_2]).then(axios.spread((...response)=>{
				console.log('all waloo' ,response[1].data[0])
				setProduct(response[0].data[0]);
				setNextProduct(response[1].data[0])
			}))
		// 	axios.get('https://adv-construction.herokuapp.com/front/projectPage?id=' + newId).then(res => {
		// 	console.log('next res', res.data[0]);
		// 	setProduct(res.data[0]);
		// })
		  }

	  }
  }
  console.log("idyyy",ids);
  console.log("curent idd",currentId);
 console.log("project",product);
  console.log('check nextttt' ,nextProduct)
  return (
        <div style={{backgroundColor:"white"}} >
        <HeaderComponent id='top' topclassName={"relative-top mob-header"}></HeaderComponent>
        {product ? <main style={{background: "#fff"}}>
    	    <div className="container"  >
    		<div className="row">
    			<div className="col-md-12 col-sm-12">
    				<div className="two-heding">
    					<h6>Ongoing project</h6>
    					<h3 className="h3-responsive font-weight-bold">{product.name}</h3>
    				</div>
    				<img src={product.image} className="img-fluid" />
    			</div>
    			
    		</div>

    		<div className="row" style={{marginTop: "20px"}}>
                <div className="col-md-6 col-sm-6 col-6 pr-1">
                    <div className="card">
                        <img src={product.mini_image1} className="card-img"  />
                    </div>
                </div>
                <div className="col-md-6 col-sm-6 col-6 pl-1">
                    <div className="card">
                        <img src={product.mini_image2} className="card-img"  />
                    </div>
                </div>
            </div>


    		<div className="row " style={{marginTop: "30px"}}>
    			<div className="col-md-4 col-sm-4 p-1 col-4">
    				<div className="content  content1 ">
    					<h6>{product.total_price}</h6>
    					<p>
    						million
    					</p>
    				</div>
    				<p className="text-center font-col">
    					<strong>TOTAL PRICE</strong>
    				</p>
    			</div>
    			<div className="col-md-4 col-sm-4 p-1  col-4">
    				<div className="content content1">
    					<h6 >{product.length} </h6>
    					<p className="">
    					Kilometers
    					</p>
    				</div>	
    				<p className="text-center font-col">
    					<strong>LENGTH OF THE<br />CONSTRUCTION</strong>
    				</p>
    				<hr style={{marginTop: "30px", width: "60%"}} />
    			</div>
    			<div className="col-md-4 col-sm-4 p-1 col-4">
    				<div className="content content2">
    					<h6 className="complete-date-heading">{product.completion_date}</h6>
    				</div>	
    				<p className="text-center font-col">
    					<strong>COMPLETION</strong>
    				</p>
    			</div>
    		</div>

    		<div className="row" style={{marginTop: "30px"}}>
    			<div className="col-md-6 col-sm-12 " style={{margin:"0 auto"}}>
    				<p className="text-center" style={{color:"#000", lineHeight: "1.7"}}>
						{product.long_description}
    				</p>
    				<hr style={{marginTop: "40px"}} />
    			</div>
    		</div>

    		<div className="row" style={{marginTop: "30px"}}>
    			<div className="col-md-6 col-sm-12">
    				<div className="inner"> 
  					<h3 className="h3-responsive font-weight-bold">{nextProduct && nextProduct.name}</h3>
					  <p className='text-justify' >{nextProduct && nextProduct.long_description}</p>
					  <a href="#top" disabled={isDisabled ? "disabled" : ''} onClick={() =>nextProject()} >Next Project</a>

					</div>	
    			</div>
    			<div className="col-md-6 col-sm-12">
    				<img src={nextProduct && nextProduct.image} style={{width:'90%', height:'300px' }} />
    			</div>
    		</div>
			
    	</div>
		<br/>
		<br/>
		<br/>
		<hr style={{width:'100%' , marginBottom:'0px'}} />
    </main>: null
	}

        <FooterComponent></FooterComponent>
    </div>

   );
}

export default ProductDetails;