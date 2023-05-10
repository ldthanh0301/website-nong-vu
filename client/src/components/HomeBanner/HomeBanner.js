 import React from "react";

 import BackgroundImage1 from "../../assets/images/slider05.jpg";
 import BackgroundImage2 from "../../assets/images/slider02.jpg";
 import BackgroundImage3 from "../../assets/images/slider03.jpg";
 import { Carousel } from "react-bootstrap";
 import "./style.css"
 
 function HomeBanner(props) {
   return (
    <div>
     <Carousel>
       <Carousel.Item>
         <div
           className="d-block w-100 main_slider"
           style={{
             backgroundImage: `url(${BackgroundImage1})`,
           }}
         >
           <div className="container fill_height">
             <div className="row align-items-center fill_height">
               <div className="col">
                 <div className="main_slider_content" data-aos="fade-right">
                   <h6>Ưu đãi hot</h6>
                   <h1>Các sản phẩm đang được giảm giá</h1>
                   <div className="red_button shop_now_button">
                     <a href="/vattu">Xem thêm</a>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </Carousel.Item>
       <Carousel.Item>
         <div
           className="d-block w-100 main_slider"
           style={{
             backgroundImage: `url(${BackgroundImage2})`,
           }}
         >
           <div className="container fill_height">
             <div className="row align-items-center fill_height">
               <div className="col">
                 <div className="main_slider_content" data-aos="fade-right">
                   <h6>Vụ Đông Xuân 2023</h6>
                   <h1>Các chương trình khuyến mãi tháng 5</h1>
                   <div className="red_button shop_now_button">
                     <a href="/khuyenmai">Tìm kiểu ngay</a>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </Carousel.Item>
       <Carousel.Item>
         <div
           className="d-block w-100 main_slider"
           style={{
             backgroundImage: `url(${BackgroundImage3})`,
           }}
         >
           <div className="container fill_height">
             <div className="row align-items-center fill_height">
               <div className="col">
                 <div className="main_slider_content" data-aos="fade-right">
                   <h6>Vụ Thu Đông 2023</h6>
                   <h1>Các sản phẩm mới hiệu quả nhất hiện nay</h1>
                   <div className="red_button shop_now_button">
                     <a href="/vattu">Tìm hiểu ngay</a>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </Carousel.Item>
     </Carousel>
    </div>
   );
 }
 
 export default HomeBanner;
 