import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SearchAdmin(props) {
  const { filterFunc ,onChangeData} = props;

  const [searchInput, setSearchInput] = useState("");

  const onChangeSearchInput = (e) => {
      setSearchInput(e.target.value);
      onChangeData(filterFunc(e.target.value.toLowerCase()))
  };
  return (
    <>
      <div className="search">
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Tìm kiếm sản phẩm"
            className="me-2"
            name="searchInput"
            onChange={onChangeSearchInput}
            value={searchInput}
            aria-label="Search"
            autocomplete="off"
          />
          <Button variant="success">
            <FontAwesomeIcon icon={['fas', 'fa-magnifying-glass']} />
          </Button>
        </Form>
      </div>
    </>
  );
}

export default SearchAdmin;
