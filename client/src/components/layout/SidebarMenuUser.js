import React, {useContext, useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import { NavLink } from 'react-router-dom'
import { CategoryContext } from '../../contexts/CategoryContext';

function SidebarMenuUser() {
  const style = {
    width: 320,
    backgroundColor: '#ccc',
    maxWidth: 320,
    marginLeft: 25
  }
  
  const {
    categoryState: { categories },
    getCategories,
  } = useContext(CategoryContext);

  useEffect(()=> {getCategories()},[])
  return (
    <>
      <div style={style}>
          <h3>Danh mục vật tư</h3>
          <ListGroup>
          {categories.map((category) => (
              <ListGroup.Item key={category.mslvt}>
              <NavLink  to={"/vattu?mslvt="+category.mslvt}>{category.tenLoaiVatTu}</NavLink>
            </ListGroup.Item>
            ))}
          </ListGroup>
      </div>
    </>
  )
}

export default SidebarMenuUser