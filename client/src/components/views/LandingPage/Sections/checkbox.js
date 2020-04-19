import React, { useState } from "react";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;


function CheckBox(props) {
  const CheckedProps = props.filterProps.continent || [];
  const [Checked, setChecked] = useState(CheckedProps);
  const onCheckBoxChange = continentId => {
    const currentIndex = Checked.indexOf(continentId);
    const newChecked = [...Checked];
    if (currentIndex === -1) {
      newChecked.push(continentId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.handleFilters(newChecked)
  };
  const renderCheckBoxList = ()=> props.list.map((continent, index) => (
    <React.Fragment key={index}>
      <Checkbox
        onChange={()=>onCheckBoxChange(continent._id)}
        type="checkbox"
        checked={Checked && Checked.indexOf(continent._id) === -1 ? false: true}
      />
      <span>{continent.name}</span>
    </React.Fragment>
  ));

  return (
    <div>
      <Collapse defaultActiveKey={[`${Checked.length?"1":"0"}`]}>
        <Panel header="Continent Filters" key="1">
          {renderCheckBoxList()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
