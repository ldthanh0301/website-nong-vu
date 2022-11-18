import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import axios from "axios";
import { apiUrl } from "../../contexts/constants";
import SelectCategory from "./SelectCategory";
import { CategoryContext } from "../../contexts/CategoryContext";

const UpdateProductModal = () => {
  // Contexts
  const { 
    productState: {product},
    showUpdateProductModal, 
    setShowUpdateProductModal, 
    updateProduct 
  } = useContext(ProductContext);

  const {
    categoryState: { categories },
    getCategories,
  } = useContext(CategoryContext);

  useEffect(() => {
    getCategories();
  }, []);
  // State
  
  const [updatedProduct, setUpdatedProduct] = useState(product)


  useEffect(() => setUpdatedProduct(product),[product])


  const [img, setImg] = useState("");
  const { tenVatTu, moTa, gia, categoryId, soLuong, maHinh } = updatedProduct;
  const uploadFileHandler = (event) => {
    const file = event.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);
    axios
      .post(`${apiUrl}/upload`, bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setImg(res.data);
      });
  };

  const onChangeNewProductForm = (event) => {
    setUpdatedProduct({ ...updatedProduct, [event.target.name]: event.target.value });
  };

  const closeDialog = () => {
    setShowUpdateProductModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updateProduct({
      ...updatedProduct,
      maHinh: img ? img : updatedProduct.srcImg
    });
    closeDialog()
    // setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
  };

  const handlerCategory = (e) => {
    setUpdatedProduct({...updatedProduct, categoryId: e.target.value})
  }

  return (
    <Modal show={showUpdateProductModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Chỉnh sửa thông tin sản phẩm</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Tên sản phẩm"
              name="tenVatTu"
              required
              aria-describedby="title-help"
              value={tenVatTu}
              onChange={onChangeNewProductForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Mô tả sản phẩm"
              name="moTa"
              value={moTa}
              onChange={onChangeNewProductForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Giá</Form.Label>
            <Form.Control
              type="text"
              placeholder="Giá "
              name="gia"
              value={gia}
              onChange={onChangeNewProductForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Số lượng</Form.Label>
            <Form.Control
              type="text"
              placeholder="Số lượng "
              name="soLuong"
              value={soLuong}
              onChange={onChangeNewProductForm}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Ảnh sản phẩm</Form.Label>
            <Form.Control type="file" name="img" onChange={uploadFileHandler} />
          </Form.Group>
          <Form.Select
            aria-label="Default select example"
            onChange={handlerCategory}
            required
            defaultValue={updatedProduct.categoryId}
          >
            {categories.map((category) => (
              <option key={category.mslvt} value={category.mslvt}>
                {category.tenLoaiVatTu}
              </option>
            ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Cấp nhật
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateProductModal;
