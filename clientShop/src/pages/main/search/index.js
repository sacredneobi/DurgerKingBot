import { TextField } from "@mui/material";
import { Box } from "../../../components";

const Default = (props) => {
  const { sx, ...other } = props;
  return (
    <Box sx={{ flexGrow: 1, ...sx }} {...other}>
      <TextField
        id="input-with-sx"
        placeholder="Поиск ..."
        size="small"
        fullWidth
        sx={{ "& .MuiOutlinedInput-input": { color: "black" } }}
      />
    </Box>
  );
};

export default Default;
