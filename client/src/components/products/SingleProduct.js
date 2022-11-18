import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { apiUrl } from "../../contexts/constants";
import AcctionButtons from "./AcctionButtons";

const SingleProduct = ({ product: { msvt,tenVatTu, moTa, gia ,diaChiHinh} }) => (
  <Card>
      <Card.Header>
        <AcctionButtons _id={msvt} />
      </Card.Header>
      <Card.Img variant="top" src={apiUrl+"/"+diaChiHinh } />
      <Card.Body>
        <Card.Title>
          <Link to={"/admin/vattu/" + msvt}>{tenVatTu}</Link>  
        </Card.Title>
        <Card.Text>
        {moTa}
        </Card.Text>
        <Card.Text>
        {gia}
        </Card.Text>
        <Button variant="primary">Thêm vào giỏ</Button>
      </Card.Body>
    </Card>
);

export default SingleProduct;
