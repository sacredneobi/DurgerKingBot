import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";

const Default = (props) => {
  const { name, error, caption, items, onChange, data } = props;

  return (
    <FormControl fullWidth error={!!error[name]}>
      <InputLabel id={name}>{caption}</InputLabel>
      <Select
        id={name}
        label={caption}
        value={data[name] ? data[name] : ""}
        onChange={onChange(name)}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.caption}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{error[name]}</FormHelperText>
    </FormControl>
  );
};

export default Default;
