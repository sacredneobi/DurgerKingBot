import { Box, Input, Autocomplete, Container } from "@components";
import { isFunc, checkInput } from "@utils";
import { useCallback, useState, useEffect } from "react";
import { DialogContent } from "@mui/material";
import Actions from "./actions";
import { useArticleGetAll, useGoodGetById2 } from "@api";

export default (props) => {
  const { onClose, onSave, id } = props;

  const [data, setData] = useState({});
  const [save, setSave] = useState(false);
  const [error, setError] = useState({});
  const [callbackGet, loading] = useGoodGetById2();

  useEffect(() => {
    if (id) {
      callbackGet(id, setData);
    }
  }, [id, callbackGet]);

  const validate = useCallback((data) => {
    return checkInput(data, [
      {
        name: "caption",
        maxLength: 200,
        minLength: 3,
        errorMessage: "Заголовок не должен быть больше 30 и меньше 3",
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
      isFunc(onSave, { ...data, articleId: data?.articleId?.id, id });
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
            <Input name="caption" caption="Заголовок" />
            <Input name="description" caption="Описание" />
            <Autocomplete
              name="articleId"
              caption="Артикул"
              useGet={useArticleGetAll}
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