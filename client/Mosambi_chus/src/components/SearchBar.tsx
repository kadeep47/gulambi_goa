import React, { ReactNode, ChangeEvent } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";

interface SearchBarProps {
  placeholder?: string;
  icon?: ReactNode;
  onSearch?: (query: string) => void;
}

function SearchBar({ placeholder = "Search", icon, onSearch }: SearchBarProps) {
  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (onSearch) {
      onSearch(query); // Calls the onSearch function with the query
    }
  };

  return (
    <Form className="d-flex justify-content-center mt-3">
      <InputGroup className="w-75">
        <InputGroup.Text>
          {icon || <i className="bi bi-search"></i>}{" "}
          {/* Default icon if none is provided */}
        </InputGroup.Text>
        <FormControl
          type="search"
          placeholder={placeholder}
          aria-label="Search"
          onChange={handleSearch}
        />
      </InputGroup>
    </Form>
  );
}

export default SearchBar;
