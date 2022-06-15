import { OutlinedInput } from "@mui/material";
import { Box, IconButton } from "../../../components";

const Default = (props) => {
  const { sx, value = "", setValue, onSearch, onHide, ...other } = props;

  const handleOnChange = (event) => {
    if (typeof setValue === "function") {
      setValue(event.target.value);
    }
  };

  const handleOnKeyUp = (event) => {
    if (event.key.toUpperCase() === "ENTER") {
      if (typeof setValue === "function") {
        onSearch(value);
      }
      if (typeof onHide === "function") {
        onHide();
      }
    }
  };

  const handleOnClear = () => {
    if (typeof setValue === "function") {
      setValue("");
    }
    if (typeof setValue === "function") {
      onSearch("");
    }
    if (typeof onHide === "function") {
      onHide();
    }
  };

  const handleOnMouseDown = (event) => {
    event.preventDefault();
  };

  return (
    <Box sx={{ flexGrow: 1, ...sx }} {...other}>
      <OutlinedInput
        id="input-with-sx"
        placeholder="Поиск ..."
        size="small"
        fullWidth
        value={value}
        autoFocus
        onKeyUp={handleOnKeyUp}
        onChange={handleOnChange}
        sx={{ "& .MuiOutlinedInput-input": { color: "black" } }}
        endAdornment={
          value !== "" && (
            <IconButton
              onClick={handleOnClear}
              onMouseDown={handleOnMouseDown}
              edge="end"
              textIcon="close"
            />
          )
        }
      />
    </Box>
  );
};

export default Default;
