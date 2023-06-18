import { Select } from "antd";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const WSelect = ({ placeholder, category, onChange, onSearch }) => {
  const { categories } = useContext(AppContext);
  const options = categories.map((item) => ({
    label: item.name,
    value: item._id,
  }));
  return (
    <Select
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
      value={category}
      options={options}
      style={{
        width:'100%'
      }}
      allowClear
    />
  );
};
export default WSelect;
