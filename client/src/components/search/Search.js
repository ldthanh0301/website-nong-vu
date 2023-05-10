import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import ListProduct from "./ListProduct";
import "./style.css"

function Search() {
  const [searchInput, setSearchInput] = useState("")

  const onChangeSearchInput = (e) => {
    setSearchInput(e.target.value)
  }
  return (
    <div className="search-main">
      <Form className="d-flex" >
        <Form.Control
          type="search"
          placeholder="Tìm kiếm sản phẩm"
          className="me-2"
          name="searchInput"
          onChange={onChangeSearchInput}
          value={searchInput}
          aria-label="Search"
          autoComplete="off"
        />
        <Button variant="success">
          <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
        </Button>
      </Form>
      <ListProduct input={searchInput.toLowerCase()}></ListProduct>
    </div>
  );
}

export default Search;
