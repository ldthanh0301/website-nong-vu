import Card from "react-bootstrap/Card";



function Dashboard() {
  // contexts
  
  let body = null;

  body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1"> Trang quản lý đơn hàng và vật tư </Card.Header>
          <Card.Body>
            <Card.Title> </Card.Title>
          </Card.Body>
        </Card>
      </>
    );
  return <>
   {body}
  </>;
}

export default Dashboard;
