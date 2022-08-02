import { useState } from "react";
import { TextField } from "@mui/material";
import Skeleton from "../skeleton";
import { getValue } from "@utils";

const Default = (props) => {
  const {
    name,
    error,
    onChange,
    data,
    caption,
    loading,
    changeOnEnter,
    ...other
  } = props;

  const [inputData, setInputData] = useState("");

  const handleOnKeyPress = (event) => {
    if (event.charCode === 13) {
      onChange(name)({ target: { value: inputData } });
    }
  };

  const handleOnChange = (event) => {
    setInputData(event.target.value);
  };

  if (loading) {
    return <Skeleton height={56} />;
  }

  return (
    <TextField
      error={!!error?.[name]}
      label={caption}
      helperText={error?.[name]}
      fullWidth
      onKeyPress={changeOnEnter ? handleOnKeyPress : null}
      value={changeOnEnter ? inputData : getValue(data, name) || ""}
      onChange={changeOnEnter ? handleOnChange : onChange(name)}
      {...other}
    />
  );
};

export default Default;
