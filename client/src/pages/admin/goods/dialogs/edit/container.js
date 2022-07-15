import { Box, Select, Input } from "@components";
import { isFunc, checkInput } from "@utils";
import { useCallback, useState, useEffect } from "react";
import { DialogContent } from "@mui/material";
import Actions from "./actions";

const items = [
  { caption: "11111", value: 1 },
  { caption: "22222", value: 2 },
  { caption: "33333", value: 3 },
  { caption: "44444", value: 4 },
];

const Default = (props) => {
  const { onClose, onSave, ...other } = props;

  const [data, setData] = useState(other);
  const [save, setSave] = useState(false);
  const [error, setError] = useState({});

  const validate = useCallback((data) => {
    return checkInput(data, [
      {
        name: "caption",
        maxLength: 30,
        minLength: 3,
        errorMessage: "Заголовок не должен быть больше 30 и меньше 3",
      },
      {
        name: "description",
        maxLength: 30,
        minLength: 3,
        errorMessage: "Описание не должен быть больше 30 и меньше 3",
      },
      {
        name: "articleId",
        isNull: true,
        errorMessage: "Должен быть выбранный",
      },
    ]);
  }, []);

  const handleOnSave = useCallback(() => {
    setSave((prev) => !prev);
  }, []);

  useEffect(() => {
    if (save) {
      isFunc(onSave, data);
    }
  }, [onSave, data, save]);

  useEffect(() => {
    setError(validate(data));
  }, [data, validate]);

  const handleChange = (param) => {
    return (event) => {
      setData((prev) => {
        prev[param] = event.target.value;
        return { ...prev };
      });
    };
  };

  return (
    <>
      <DialogContent>
        <Box
          sx={{
            padding: (theme) => theme.spacing(1, 0),
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "100%",
          }}
        >
          <Input
            name="caption"
            caption="Заголовок"
            error={error}
            data={data}
            handleChange={handleChange}
          />
          <Input
            name="description"
            caption="Описание"
            error={error}
            data={data}
            handleChange={handleChange}
          />
          <Select
            name="articleId"
            caption="Артикул"
            error={error}
            data={data}
            onChange={handleChange}
            items={items}
          />
        </Box>
      </DialogContent>
      <Actions
        handleOnSave={handleOnSave}
        disabled={error.isError}
        onClose={onClose}
      />
    </>
  );
};

export default Default;
