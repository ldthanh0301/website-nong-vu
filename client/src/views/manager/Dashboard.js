import Card from "react-bootstrap/Card";



function Dashboard() {
  // contexts
  
  let body = null;

  body = (
      <>
        <Card className="text-center m-2">
          <Card.Header as="h1"> Dashboard</Card.Header>
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
