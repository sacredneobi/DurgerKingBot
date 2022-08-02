import { useUserContext as useContext } from "@context";
import { observer } from "mobx-react-lite";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import login from "../../../res/images/123.jpg";
import { Input, Container, Box } from "@components";
import { useState, useCallback, useEffect } from "react";
import { useAuth } from "@api";
import { hashString } from "react-hash-string";

export default observer((props) => {
  const dataUser = useContext();

  const [data, setData] = useState({});
  const [user, setUser] = useState(null);
  const [useCallbackAuth, loading] = useAuth();

  const handleChange = useCallback((param) => {
    return (event) => {
      setData((prev) => {
        prev[param] = event.target.value;
        return { ...prev };
      });
    };
  }, []);

  const handleOnLogin = (event) => {
    useCallbackAuth(
      { login: data.login, password: hashString(data.password) },
      setUser
    );
    event.stopPropagation();
  };

  useEffect(() => {
    if (user && user.isAuth) {
      localStorage.setItem("token", user.accessToken);
      dataUser.data.setIsUser(true);
    }
  }, [user]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card sx={{ width: 450 }}>
        <CardMedia
          component="img"
          height="140"
          image={login}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Войти в систему
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Container data={data} onChange={handleChange} disabled={loading}>
              <Input name="login" caption="Логин" />
              <Input name="password" caption="Пароль" />
            </Container>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button onClick={handleOnLogin} disabled={loading}>
            Войти
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
});
