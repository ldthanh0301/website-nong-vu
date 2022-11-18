import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { apiUrl } from "../../contexts/constants";

const SingleProductUser = ({ product: { msvt,tenVatTu, moTa, gia ,diaChiHinh} }) => (
  <Card>
      <Card.Img variant="top" src={apiUrl+"/"+diaChiHinh } />
      <Card.Body>
        <Card.Title>
          <Link to={"/vattu/"+msvt}>{tenVatTu}</Link>  
        </Card.Title>
        <Card.Text>
        {moTa}
        </Card.Text>
        <Card.Text>
        {gia}
        </Card.Text>
        <Button variant="primary" msvt={msvt}>Thêm vào giỏ</Button>
      </Card.Body>
    </Card>
);

export default SingleProductUser;
