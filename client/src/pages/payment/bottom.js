import { TextField } from "@mui/material";
import { Box, Text } from "@components";
import { styled } from "@mui/material/styles";
import styles from "./styles";

const CssTextField = styled(TextField)(() => ({
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
  return (
    <>
      <Box sx={styles.rootBottom}>
        <CssTextField
          id="comment"
          placeholder="Add comment"
          multiline
          fullWidth
        />
      </Box>
      <Text
        caption="Any special requests, details, final wishes etc."
        variant="subtitle2"
        gutterBottom
        sx={styles.bottomComment}
      />
    </>
  );
};

export default Default;
