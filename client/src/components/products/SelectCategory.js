import React, { useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { CategoryContext } from "../../contexts/CategoryContext";
function SelectCategory() {
  const {
    categoryState: { categories },
    getCategories
  } = useContext(CategoryContext);
  useEffect(()=>{getCategories()},[])

  const handlerCategory = (e) => {
    console.log(e.target.value)
  }
  return (
    <Form.Select aria-label="Default select example" onChange={handlerCategory}>
        {
            categories.map(category =>(<option key={category._id} value={category._id}>{category.name}</option>))
        }
    </Form.Select>
  );
}

export default SelectCategory;
