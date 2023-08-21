import Dropdown from "react-bootstrap/Dropdown";

export interface DropDownProps {
  nameAsc: () => void;
  nameDsc: () => void;
  dateAsc: () => void;
  dateDsc: () => void;
}

//Display the Drop down button where you can choose your filter options
const DropDownButton = ({
  nameAsc,
  nameDsc,
  dateAsc,
  dateDsc,
}: DropDownProps) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Filter by
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => nameAsc()}>
          Name - ascending
        </Dropdown.Item>
        <Dropdown.Item onClick={() => nameDsc()}>
          Name - descending
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dateAsc()}>
          Date - ascending
        </Dropdown.Item>
        <Dropdown.Item onClick={() => dateDsc()}>
          Date - descending
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropDownButton;
