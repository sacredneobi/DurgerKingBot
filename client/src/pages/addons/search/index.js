import { Box, IconButton, OutlinedInput } from "@components";

const isFunction = (fn) => {
  return typeof fn === "function";
};

const Default = (props) => {
  const { sx, value = "", setValue, onSearch, onHide, ...other } = props;

  const handleOnChange = (event) => {
    if (isFunction(setValue)) {
      setValue(event.target.value);
    }
  };

  const handleOnKeyUp = (event) => {
    if (event.key.toUpperCase() === "ENTER") {
      if (isFunction(setValue)) {
        onSearch(value);
      }
      if (isFunction(onHide)) {
        onHide();
      }
    }
  };

  const handleOnClear = () => {
    if (isFunction(setValue)) {
      setValue("");
    }
    if (isFunction(setValue)) {
      onSearch("");
    }
    if (isFunction(onHide)) {
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
        sx={{
          "& .MuiOutlinedInput-input": {
            color: "var(--tg-theme-text-color, #000)",
          },
        }}
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
