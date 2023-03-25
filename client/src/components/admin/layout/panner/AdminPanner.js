

 import React from "react";

 import BackgroundImage1 from "../../../../assets/images/slider01.jpg";
 import BackgroundImage2 from "../../../../assets/images/slider05.jpg";
 import BackgroundImage3 from "../../../../assets/images/slider04.jpg";
 import { Carousel } from "react-bootstrap";
 import "./style.css";

 function AdminPanner(props) {
   return (
    <div>
     <Carousel>
       <Carousel.Item>
         <div
           className="d-block w-100 admin-panner"
           style={{
             backgroundImage: `url(${BackgroundImage3})`,
           }}
         >
           <div className="container admin-panner__box">
             <div className="row align-items-center">
               <div className="col">
                   <h1>Trang quản trị website quản lý nông vụ</h1>
               </div>
             </div>
           </div>
         </div>
       </Carousel.Item>
     </Carousel>
    </div>
   );
 }
 
 export default AdminPanner;
 