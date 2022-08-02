import { Box, IconButton, OutlinedInput } from "@components";
import { isFunc } from "@utils";

const Default = (props) => {
  const { sx, value = "", setValue, onSearch, onHide, ...other } = props;

  const handleOnChange = (event) => {
    isFunc(setValue, event.target.value);
  };

  const handleOnKeyUp = (event) => {
    if (event.key.toUpperCase() === "ENTER") {
      isFunc(onSearch, value);
      isFunc(onHide);
    }
  };

  const handleOnClear = () => {
    isFunc(onSearch, "");
    isFunc(setValue, "");
    isFunc(onHide);
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
