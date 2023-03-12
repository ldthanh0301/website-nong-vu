import React, {useContext, useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { NavLink } from 'react-router-dom'
import { CategoryContext } from '../../contexts/CategoryContext';

function SidebarMenuUser() {

  const style = {
    backgroundColor: '#f3f3f3',
    margin: "25px 25px",
    padding: "25px 25px"
  }
  const h3 = {
    color: "#00a803", 
    textTransform: "uppercase",
    textAlign: "center"
  }

  const {
    categoryState: { categories },
    getCategories,
  } = useContext(CategoryContext);

  useEffect(()=> {getCategories()},[])
  return (
    <>
      <div style={style}>
          <h3 style={h3}>Danh mục vật tư</h3>
          <ListGroup>
          {categories.map((category) => (
              <ListGroup.Item key={category.mslvt}>
              <NavLink  className="nav-link" to={"/vattu?mslvt="+category.mslvt} end>{category.tenLoaiVatTu}</NavLink>
            </ListGroup.Item>
            ))}
          </ListGroup>
      </div>
    </>
  )
}

export default SidebarMenuUser