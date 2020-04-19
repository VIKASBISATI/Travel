import React, {useState} from "react";
import { Collapse, Radio } from "antd";

const { Panel } = Collapse;

function RadioBox(props) {
  const [Value, setValue] = useState('0')
  const renderRadioBox = () => (
    props.list.map((value)=>(
        <Radio key={value._id} value={`${value._id}`}>{value.name}</Radio>
    ))
  )
  const onRadioChange = (event) => {
    setValue(event.target.value);
    props.handleFilters(event.target.value)
  }
  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Price Filters" key="1">
            <Radio.Group
            onChange={onRadioChange}
            value={Value}
            >
                {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
