import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,

} from "reactstrap";

const Category = ({categorys, handleFilter }) => {

  return (
    <>
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
          <DropdownItem href="#pablo" onClick={(e) => handleFilter("All")}>
            All
          </DropdownItem>
          {
            categorys.map((category) => (
            <DropdownItem
              key={category}
              href="#pablo"
              onClick={(e) => handleFilter(category)}
            >
              {category}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default Category;
