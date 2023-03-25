import { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../../../contexts/AuthContext";
import { CartContext } from "../../../../contexts/CartContext";
import { apiUrl } from "../../../../contexts/constants";
import { VND } from "../../../../utils/format";
import "./style.css"

const SingleProductUser = ({ vatTu}) => {
  const {addProductToCart} = useContext(CartContext)
  const {authState: {isAuthenticated}} = useContext(AuthContext)
  
  return (
  <Card>
      <Card.Img variant="top" src={apiUrl+"/"+ vatTu.diaChiHinh } />
      <Card.Body>
        <Card.Title className="card-title ">
          <Link to={"/vattu/"+vatTu.msvt}>{vatTu.tenVatTu}</Link>  
        </Card.Title>
        <Card.Text>
        {VND.format(vatTu.gia)}
        </Card.Text>
        <Button variant="primary" onClick={()=>{
          if (isAuthenticated) {
            addProductToCart(vatTu)
          } else {
            window.location.replace('/dangnhap');
          }
        }}>Thêm vào giỏ</Button>
      </Card.Body>
    </Card>
)}  

export default SingleProductUser;
