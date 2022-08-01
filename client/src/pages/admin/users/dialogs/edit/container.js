import { Box, Input, Container } from "@components";
import { isFunc, checkInput } from "@utils";
import { useCallback, useState, useEffect } from "react";
import { DialogContent } from "@mui/material";
import Actions from "./actions";
import { useUsersGetById as useGetById } from "@api";
import { hashString } from "react-hash-string";

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
        name: "name",
        maxLength: {
          val: 200,
          errorMessage: "Заголовок не должен быть длиннее ${val} символов",
        },
        minLength: {
          val: 3,
          errorMessage: "Заголовок не должен быть короче ${val} символов",
        },
      },
      {
        name: "password",
        maxLength: {
          val: 200,
          errorMessage: "Заголовок не должен быть длиннее ${val} символов",
        },
        minLength: {
          val: 3,
          errorMessage: "Заголовок не должен быть короче ${val} символов",
        },
      },
    ]);
  }, []);

  const handleOnSave = useCallback(() => {
    setSave((prev) => !prev);
  }, []);

  useEffect(() => {
    if (save) {
      isFunc(onSave, {
        name: data.name,
        password: hashString(data.password),
        id,
      });
    }
  }, [onSave, data, save]);

  useEffect(() => {
    setError(validate(data));
  }, [data, validate]);

  const handleChange = useCallback((param) => {
    return (event) => {
      setData((prev) => {
        if (param === "price.sale") {
          if (prev.price) {
            prev.price.sale = event.target.value;
          } else {
            prev.price = { sale: event.target.value };
          }
        } else {
          prev[param] = event.target.value;
        }
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
            <Input name="name" caption="Логин" />
            <Input name="password" caption="Пароль" />
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
