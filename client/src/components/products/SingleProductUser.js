import { useContext } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { Link, Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { CartContext } from "../../contexts/CartContext";
import { apiUrl } from "../../contexts/constants";

const SingleProductUser = ({ vatTu}) => {
  const {addProductToCart,setShowToast} = useContext(CartContext)
  const {authState: {isAuthenticated}} = useContext(AuthContext)
  
  return (
  <Card>
      <Card.Img variant="top" src={apiUrl+"/"+ vatTu.diaChiHinh } />
      <Card.Body>
        <Card.Title>
          <Link to={"/vattu/"+vatTu.msvt}>{vatTu.tenVatTu}</Link>  
        </Card.Title>
        <Card.Text>
        {vatTu.gia}
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
