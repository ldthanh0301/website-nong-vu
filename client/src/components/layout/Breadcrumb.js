import Breadcrumb from 'react-bootstrap/Breadcrumb';

function BreadcrumbExample() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/vattu">
        Vật tư
      </Breadcrumb.Item>
      <Breadcrumb.Item active>Thuốc trừ sâu</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbExample;