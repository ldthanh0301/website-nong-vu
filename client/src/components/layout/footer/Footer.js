import React from 'react'
import './style.css'


 function Footer(props) {
   return (
     <footer className="footer">
       <div className="container">
         <div className="row">
           <div className="col-lg-6 col-sm-6">
             <div className="footer_nav_container d-flex flex-sm-row flex-column align-items-center justify-content-lg-start justify-content-center text-center">
               <ul className="footer_nav">
                 <li>
                   <a href="./">Trang chủ</a>
                 </li>
                 <li>
                   <a href="#">Giới thiệu</a>
                 </li>
                 <li>
                   <a href="#">Thông tin liên hệ</a>
                 </li>
               </ul>
             </div>
           </div>
           <div className="col-lg-6 col-sm-6">
             <div className="footer_social d-flex flex-row align-items-center justify-content-lg-end justify-content-center">
               <ul>
                 <li>
                   <a href="#">
                     <i className="fab fa-facebook-f"></i>
                   </a>
                 </li>
                 <li>
                   <a href="#">
                     <i className="fab fa-twitter"></i>
                   </a>
                 </li>
                 <li>
                   <a href="#">
                     <i className="fab fa-instagram"></i>
                   </a>
                 </li>
 
                 <li>
                   <a href="#">
                     <i className="fab fa-pinterest-p"></i>
                   </a>
                 </li>
               </ul>
             </div>
           </div>
         </div>
         <div className="row">
           <div className="col-lg-12">
             <div className="footer_nav_container">
               <div className="cr">
                 ©2023 Phát triển ứng dụng web quản lý nông vụ
                 <i className="fa fa-heart-o" aria-hidden="true"></i> bởi
                 <a href="https://www.facebook.com/ldthanh0301" target="_blank">
                   Lê Duy Thanh
                 </a>
               </div>
             </div>
           </div>
         </div>
       </div>
     </footer>
   );
 }
 
 export default Footer;
 