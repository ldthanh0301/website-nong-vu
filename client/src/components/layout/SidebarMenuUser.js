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
  const listItem  = {
    background: "#fff",
    padding: "15px 15px",
    marginBottom: "15px",
    textColor: "black"
  }
  const navLink = {
    color: "black",
    textDecoration: "auto",
    fontSize: "18px"
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
              <ListGroup.Item key={category.mslvt} style={listItem}>
              <NavLink style={navLink}  to={"/vattu?mslvt="+category.mslvt}>{category.tenLoaiVatTu}</NavLink>
            </ListGroup.Item>
            ))}
          </ListGroup>
      </div>
    </>
  )
}

export default SidebarMenuUser