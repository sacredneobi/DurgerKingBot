import { DialogEmpty, Box } from "@components";
import { isFunc } from "@utils";
import { useEffect, useState } from "react";
import {
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";

const Container = (props) => {
  const { isSave, onSave, id } = props;

  const [data, setData] = useState({ id });

  useEffect(() => {
    if (isSave) {
      isFunc(onSave, data);
    }
  }, [isSave]);

  const handleChange = (param) => {
    return (event) => {
      setData((prev) => {
        prev[param] = event.target.value;
        return { ...prev };
      });
    };
  };

  return (
    <Box
      sx={{
        padding: (theme) => theme.spacing(1, 0),
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 400,
      }}
    >
      <TextField
        label="Caption"
        helperText=""
        value={data.caption ? data.caption : ""}
        onChange={handleChange("caption")}
      />
      <TextField
        label="Description"
        helperText=""
        value={data.description ? data.description : ""}
        onChange={handleChange("description")}
      />
      <FormControl fullWidth>
        <InputLabel id="article">Article</InputLabel>
        <Select
          id="article"
          label="Article"
          value={data.articleId ? data.articleId : ""}
          onChange={handleChange("articleId")}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

const Default = (props) => {
  const { onClose, ...other } = props;

  const [isSave, setIsSave] = useState(false);

  const handleOnSave = () => {
    setIsSave(true);
  };

  const actions = [
    {
      onClick: onClose,
      caption: "Cancel",
      variant: "contained",
      color: "error",
    },
    { onClick: handleOnSave, caption: "Save" },
  ];

  return (
    <DialogEmpty
      actions={actions}
      container={<Container isSave={isSave} {...other} />}
    />
  );
};

export default Default;
