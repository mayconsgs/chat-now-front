import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import signUpStyle from "./styles";

const SignUp = () => {
  const { t } = useTranslation(["signUp"]);
  const style = signUpStyle();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetPassword, setRepetPassword] = useState("");
  const [avatar, setAvatar] = useState<File>();

  function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (password.trim() !== repetPassword.trim()) return;

    const form = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    console.log(form);
  }

  return (
    <Container maxWidth="xs">
      <Card>
        {" "}
        <CardContent>
          <Grid container direction="column" spacing={5}>
            <Grid item>
              <Typography variant="h4">{t("signUp:cadastro")}</Typography>
            </Grid>

            <Grid item container justifyContent="center">
              <Avatar className={style.avatar}>
                <Person className={style.iconAvatar} />
              </Avatar>
            </Grid>

            <Grid
              item
              component="form"
              container
              direction="column"
              spacing={8}
              onSubmit={onSubmit}
            >
              <Grid item container direction="column" spacing={2}>
                <Grid item container>
                  <TextField
                    value={firstName}
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    label={t("signUp:nome")}
                  />
                </Grid>
                <Grid item container>
                  <TextField
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    label={t("signUp:sobrenome")}
                  />
                </Grid>
                <Grid item container>
                  <TextField
                    value={email}
                    required
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    label={t("signUp:email")}
                  />
                </Grid>
                <Grid item container>
                  <TextField
                    value={password}
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    label={t("signUp:senha")}
                  />
                </Grid>
                <Grid item container>
                  <TextField
                    value={repetPassword}
                    required
                    type="password"
                    onChange={(e) => setRepetPassword(e.target.value)}
                    label={t("signUp:repetirSenha")}
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
                    {t("signUp:cadastrar")}
                  </Button>
                </Grid>
                <Grid item>
                  {" "}
                  <Typography variant="caption">
                    {t("signUp:possuiConta")}
                  </Typography>
                </Grid>
                <Grid item container>
                  {" "}
                  <Button variant="outlined" fullWidth color="secondary">
                    {t("signUp:entrar")}
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

export default SignUp;
