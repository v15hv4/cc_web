import React from "react";
import { Input } from "reactstrap";

const Searchbar = (props) => {
    const updateSearch = (e) => {
        if (!props.dataList) return null;
        console.log(e.target.value);
        props.setFilteredList(
            props.dataList.filter((obj) =>
                obj.name.toLowerCase().includes(e.target.value.toLowerCase())
            )
        );
    };

    return (
        <Input
            onChange={updateSearch}
            className={"shadow-sm " + props.className}
            type="text"
            bsSize="lg"
            placeholder="Search..."
        />
    );
};

export default Searchbar;