import React, {useState} from "react";
import { Input } from "antd";
function SearchFeature(props) {
  const { Search } = Input;
  const [SearchTerms, setSearchTerms] = useState("");
  const onSearchChange = (event) => {
    setSearchTerms(event.currentTarget.value);
    props.upadateSearchTerms(event.currentTarget.value);
  }
  return (
    <div>
      <Search onChange={onSearchChange} value={SearchTerms} placeholder="Search"/>
    </div>
  );
}

export default SearchFeature;
