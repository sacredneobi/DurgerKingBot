import { TextField } from "@mui/material";

const Default = (props) => {
  const { name, error, handleChange, data, caption } = props;

  return (
    <TextField
      error={!!error[name]}
      label={caption}
      helperText={error[name]}
      fullWidth
      value={data[name] ? data[name] : ""}
      onChange={handleChange(name)}
    />
  );
};

export default Default;
