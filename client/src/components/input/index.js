import { TextField } from "@mui/material";
import Skeleton from "../skeleton";

const Default = (props) => {
  const { name, error, onChange, data, caption, loading } = props;

  if (loading) {
    return <Skeleton height={56} />;
  }

  return (
    <TextField
      error={!!error[name]}
      label={caption}
      helperText={error[name]}
      fullWidth
      value={data?.[name] || ""}
      onChange={onChange(name)}
    />
  );
};

export default Default;
