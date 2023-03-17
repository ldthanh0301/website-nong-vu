import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import axios from "axios";
import { apiUrl } from "../../contexts/constants";
import SelectCategory from "./SelectCategory";
import { CategoryContext } from "../../contexts/CategoryContext";

const AddProductModal = () => {
  // Contexts
  const { showAddProductModal, setShowAddProductModal, addProduct } =
    useContext(ProductContext);
  const [distributorList, setDistributorList] = useState([]);

  const {
    categoryState: { categories },
    getCategories,
  } = useContext(CategoryContext);

  const getDistributorList = () => {
    axios.get(apiUrl + "/nhacungcap").then((res) => {
      setDistributorList(res.data.distributorList);
    });
  };
  useEffect(() => {
    getCategories();
    getDistributorList();
  }, []);
  // State
  const [newProduct, setNewProduct] = useState({
    tenVatTu: "",
    moTa: "",
    gia: 0,
    mslvt: 1,
    soLuong: 0,
    maHinh: "",
    msncc: 1,
  });

  const [maHinh, setMaHinh] = useState("");

  const { tenVatTu, moTa, gia, mslvt, soLuong, msncc } = newProduct;
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
        console.log("ảnh: ", res.data);
        setMaHinh(res.data.maHinh);
      });
  };

  const onChangeNewProductForm = (event) => {
    setNewProduct({ ...newProduct, [event.target.name]: event.target.value });
  };

  const closeDialog = () => {
    setAddProductData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const { success, message } = await addProduct({
      ...newProduct,
      maHinh: maHinh,
    });
    setAddProductData();
    // setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
  };

  const setAddProductData = () => {
    setNewProduct({
      tenVatTu: "",
      moTa: "",
      gia: 0,
      mslvt: "",
      soLuong: 0,
      msncc:'',
    });
    setShowAddProductModal(false);
  };

  const handlerCategory = (e) => {
    setNewProduct({ ...newProduct, mslvt: e.target.value });
  };
  const handlerDistributor = (e) => {
    setNewProduct({ ...newProduct, msncc: e.target.value });
  };
  return (
    <Modal show={showAddProductModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Thêm sản phẩm mới</Modal.Title>
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
            <Form.Control
              type="file"
              name="maHinh"
              onChange={uploadFileHandler}
            />
          </Form.Group>
          <Form.Select
            aria-label="Default select example"
            onChange={handlerCategory}
            required
          >
            <option>Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category.mslvt} value={category.mslvt}>
                {category.tenLoaiVatTu}
              </option>
            ))}
          </Form.Select>
          <hr />
          <Form.Select
            aria-label="Default select example"
            onChange={handlerDistributor}
            required
          >
            <option>Chọn nhà cung cấp</option>
            {distributorList.map((distributor) => (
              <option key={distributor.msncc} value={distributor.msncc}>
                {distributor.tenNCC}
              </option>
            ))}
          </Form.Select>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={setAddProductData}>
            Hủy
          </Button>
          <Button variant="primary" type="submit">
            Thêm
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
