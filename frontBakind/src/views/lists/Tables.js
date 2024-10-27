import {
  Card,
  CardHeader,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Table,
  Container,
  Row,
  Button,
  Modal,
  CardBody,
  FormGroup,
  InputGroup,
  Input,
  Form,
  UncontrolledAlert,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import React, { useEffect, useState } from "react";
import api from "axiosConfig";

const Tables = () => {
  const [refresh, setrefresh] = useState(false);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    category: "",
  });
  const [categorys, setCategorys] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAlert, setIsOpenAlert] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [error, setError] = useState("");

  const onClickAdd = (e) => {
    setIsOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price") {
      if (isNaN(value)) return;
      if (value && !/^\d*\.?\d*$/.test(value)) return;
    }

    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const onClickRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setrefresh(false);
      const productData = {
        ...product,
        price: parseFloat(product.price),
      };
      const response = await api.post("/Product/Add", productData);
      const { code } = response.data;
      if (code === "Success") {
        console.log(code);
      }
      setProduct({ name: "", price: "", description: "", category: "" });

      setrefresh(true);
    } catch (err) {
      if (err.status) {
        setIsOpenAlert(true);
      }
      setError("Errr en los datos");
    }
    setIsOpen(false);
  };

  const onClickEdit = async (e, product) => {
    e.preventDefault();
    setError("");
    setProduct(product);
    setIsOpenEdit(true);
  };

  const onClickUpdate = async (e) => {
    e.preventDefault();
    try {
      setIsOpenAlert(false);
      setrefresh(false);
      const productData = {
        ...product,
        price: parseFloat(product.price),
      };

      const response = await api.put("/Product/put", productData);
      const { code } = response.data;
      if (code === "Success") {
        console.log(code);
      }
      setProduct({ name: "", price: "", description: "", category: "" });

      setrefresh(true);
    } catch (err) {
      if (err.status) {
        setIsOpenAlert(true);
      }
      setError("Errr en los datos");
    }
    setIsOpenEdit(false);
  };

  const onClickDelete = async (e, id) => {
    e.preventDefault();
    try {
      setIsOpenAlert(false);
      setrefresh(false);
      const response = await api.delete("/Product/Delete", {
        params: { id: id },
      });
      const { code } = response.data;
      if (code === "Success") {
        console.log(code);
      }

      setrefresh(true);
    } catch (err) {
      console.log(err.status);
      if (err.status) {
        setIsOpenAlert(true);
      }
    }
  };

  const onClickfilter = async(value)  => {
    
    try {
      const response = await api.get("/Product/GetProductByCategory",{
        params: { name: value },
      });
      setProducts(response.data);
    } catch (err) {
      setError("Failed to load products");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/Product/GetAll");
        setProducts(response.data);
      } catch (err) {
        setError("Failed to load products");
      }
    };

    fetchProducts();
  }, [refresh]);

  useEffect(() => {
    const fetchCategorys = async () => {
      try {
        const response = await api.get("/Product/GetAllCategory");
        setCategorys(response.data);
      } catch (err) {
        setError("Failed to load category");
      }
    };

    fetchCategorys();
  }, [refresh]);

  return (
    <>
      <Header />

      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Lista de Product</h3>

                <label className="form-control-label" htmlFor="input-username">
                  Categorias:
                </label>
                <UncontrolledDropdown>
                  <DropdownToggle
                    className="btn-icon-only text-right mr-6"
                    href="#pablo"
                    role="button"
                    size="sm"
                    color=""
                    onClick={(e) => e.preventDefault()}
                  >
                    <i className="fas fa-ellipsis-v" />
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem
                      href="#pablo"
                      onClick={(e) => onClickfilter("All")}
                    >
                      All
                    </DropdownItem>
                    {categorys.map((category) => (
                      <DropdownItem
                       key={category}
                        href="#pablo"
                        onClick={(e) => onClickfilter(category)}
                      >
                        {category}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>

                <Button
                  className="text-right ml-6"
                  color="primary"
                  type="button"
                  onClick={onClickAdd}
                >
                  Add
                </Button>
                <UncontrolledAlert
                  color="danger"
                  isOpen={isOpenAlert}
                  fade={true}
                >
                  <span className="alert-inner--icon">
                    <i className="ni ni-like-2" />
                  </span>{" "}
                  <span className="alert-inner--text">
                    <strong>Danger!</strong> No tienes permisos para esta
                    accion!
                  </span>
                </UncontrolledAlert>
              </CardHeader>

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Description</th>
                    <th scope="col">Category</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <th scope="row">{product.name}</th>
                      <td>${product.price.toFixed(2)}</td>
                      <td>{product.description}</td>
                      <td>{product.category}</td>
                      <td className="text-right">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => onClickEdit(e, product)}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => onClickDelete(e, product.id)}
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>

      <Modal
        className="modal-dialog-centered"
        size="sm"
        isOpen={isOpen}
        //  toggle={() => setIsOpen(false)}
      >
        <div className="modal-header">
          <h5 className="modal-title">New product</h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Product
                  </label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      id="input-username"
                      placeholder="Product"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={product.name}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <label className="form-control-label" htmlFor="input-price">
                    price
                  </label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      id="input-price"
                      placeholder="Price"
                      type="text"
                      name="price"
                      onChange={handleChange}
                      value={product.price}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-category"
                  >
                    Category
                  </label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      id="input-category"
                      placeholder="Category"
                      type="text"
                      name="category"
                      onChange={handleChange}
                      value={product.category}
                      required
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-description"
                  >
                    Description
                  </label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      id="input-description"
                      placeholder="Description"
                      type="text"
                      name="description"
                      onChange={handleChange}
                      value={product.description}
                      required
                    />
                  </InputGroup>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
          <Button
            className="my-4"
            color="primary"
            type="button"
            onClick={onClickRegister}
          >
            Register
          </Button>
        </div>
      </Modal>

      <Modal className="modal-dialog-centered" size="sm" isOpen={isOpenEdit}>
        <div className="modal-header">
          <h5 className="modal-title">Edit product</h5>
          <button
            aria-label="Close"
            className="close"
            data-dismiss="modal"
            type="button"
            onClick={() => setIsOpenEdit(false)}
          >
            <span aria-hidden={true}>×</span>
          </button>
        </div>
        <div className="modal-body p-0">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-5 py-lg-5">
              <Form role="form">
                <FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Product
                  </label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      id="input-username"
                      placeholder="Product"
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={product.name}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <label className="form-control-label" htmlFor="input-price">
                    price
                  </label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      id="input-price"
                      placeholder="Price"
                      type="number"
                      name="price"
                      onChange={handleChange}
                      value={product.price}
                      required
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-category"
                  >
                    Category
                  </label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      id="input-category"
                      placeholder="Category"
                      type="text"
                      name="category"
                      onChange={handleChange}
                      value={product.category}
                      required
                    />
                  </InputGroup>
                </FormGroup>

                <FormGroup className="mb-3">
                  <label
                    className="form-control-label"
                    htmlFor="input-description"
                  >
                    Description
                  </label>
                  <InputGroup className="input-group-alternative">
                    <Input
                      id="input-description"
                      placeholder="Description"
                      type="text"
                      name="description"
                      onChange={handleChange}
                      value={product.description}
                      required
                    />
                  </InputGroup>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div className="modal-footer">
          <Button
            color="secondary"
            data-dismiss="modal"
            type="button"
            onClick={() => setIsOpenEdit(false)}
          >
            Close
          </Button>
          <Button
            className="my-4"
            color="primary"
            type="button"
            onClick={onClickUpdate}
          >
            Update
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Tables;
