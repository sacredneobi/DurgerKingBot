import { Box, Input, Container, Autocomplete } from "@components";
import { isFunc, checkInput } from "@utils";
import { useCallback, useState, useEffect } from "react";
import { DialogContent } from "@mui/material";
import Actions from "./actions";
import {
  useGoodCompositionGetById as useGetById,
  useGoodGetAll as useGetAll,
} from "@api";

export default (props) => {
  const { onClose, onSave, id } = props;
  const [data, setData] = useState({});
  const [save, setSave] = useState(false);
  const [error, setError] = useState({});
  const [callbackGet, loading] = useGetById();

  useEffect(() => {
    if (id) {
      callbackGet(id, setData);
    }
  }, [id, callbackGet]);

  const validate = useCallback((data) => {
    return checkInput(data, [
      {
        name: "count",
        minValue: {
          val: 0,
          errorMessage: "Количество должно быть больше ${val}",
        },
        maxValue: {
          val: 999999,
          errorMessage: "Количество должно быть меньше ${val}",
        },
      },
      {
        name: "sale",
        minValue: {
          val: 0,
          errorMessage: "Стоимость должна быть больше ${val}",
        },
        maxValue: {
          val: 999999,
          errorMessage: "Стоимость должна быть меньше ${val}",
        },
      },
      {
        name: "goodId",
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
      isFunc(onSave, { ...data, id });
    }
  }, [onSave, data, save]);

  useEffect(() => {
    setError(validate(data));
  }, [data, validate]);

  const handleChange = useCallback((param) => {
    return (event) => {
      setData((prev) => {
        prev[param] = event.target.value;
        return { ...prev };
      });
    };
  }, []);

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
          <Container
            error={error}
            data={data}
            onChange={handleChange}
            loading={loading}
          >
            <Input name="count" caption="Количество" />
            <Input name="sale" caption="Стоимость за единицу" />
            <Autocomplete
              name="goodId"
              caption="Товар"
              useGet={useGetAll}
              loadOnInput
            />
          </Container>
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
