import { TextField, Typography } from "@mui/material";
import { Box } from "../../components";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)(({ theme }) => ({
  "& label.Mui-focused": {
    color: "#fff",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#fff",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#fff",
    },
    "&:hover fieldset": {
      borderColor: "#fff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#fff",
    },
  },
}));

const Default = (props) => {
  // const { caption } = props;
  return (
    <>
      <Box
        sx={{
          marginTop: 2,
          paddingLeft: 0.5,
          backgroundColor: "#fff",
        }}
      >
        <CssTextField
          id="comment"
          placeholder="Add comment"
          multiline
          fullWidth
        />
      </Box>
      <Typography
        variant="subtitle2"
        gutterBottom
        component="div"
        sx={{ marginTop: 1, marginLeft: 2.5, color: "#74787a" }}
      >
        Any special requests, details, final wishes etc.
      </Typography>
    </>
  );
};

export default Default;
