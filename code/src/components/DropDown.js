import Dropdown from "react-bootstrap/Dropdown";

//Display the Drop down button where you can choose your filter options
const DropDownButton = (props) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Filter by
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => props.nameAsc()}>
          Name - ascending
        </Dropdown.Item>
        <Dropdown.Item onClick={() => props.nameDsc()}>
          Name - descending
        </Dropdown.Item>
        <Dropdown.Item onClick={() => props.dateAsc()}>
          Date - ascending
        </Dropdown.Item>
        <Dropdown.Item onClick={() => props.dateDsc()}>
          Date - descending
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownButton;
