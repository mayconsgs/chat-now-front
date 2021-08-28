import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { FormEvent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

const SignIn = () => {
  const { t } = useTranslation(["signIn"]);
  const history = useHistory();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const { data } = await api.post("/login", { email, password, rememberMe });

    setUser(data);
  }

  return (
    <Container maxWidth="xs">
      <Card>
        {" "}
        <CardContent>
          <Grid container direction="column" spacing={5}>
            <Grid item>
              <Typography variant="h4">{t("signIn:login")}</Typography>
            </Grid>

            <Grid
              item
              component="form"
              container
              direction="column"
              onSubmit={onSubmit}
              spacing={8}
            >
              <Grid item container direction="column" spacing={2}>
                <Grid item container>
                  <TextField
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    label={t("signIn:email")}
                  />
                </Grid>
                <Grid item container>
                  <TextField
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    label={t("signIn:senha")}
                  />
                </Grid>
                <Grid item container>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={rememberMe}
                        onChange={(e) => setRememberMe(!rememberMe)}
                      />
                    }
                    label="Lembrar de mim"
                  />
                </Grid>
              </Grid>

              <Grid
                item
                container
                direction="column"
                alignItems="center"
                spacing={1}
              >
                <Grid item container>
                  <Button
                    disableElevation
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="secondary"
                  >
                    {t("signIn:entrar")}
                  </Button>
                </Grid>
                <Grid item>
                  {" "}
                  <Typography variant="caption">
                    {t("signIn:semConta")}
                  </Typography>
                </Grid>
                <Grid item container>
                  {" "}
                  <Button
                    onClick={() => history.push("/sign-up")}
                    variant="outlined"
                    fullWidth
                    color="secondary"
                  >
                    {t("signIn:cadastrar")}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignIn;
