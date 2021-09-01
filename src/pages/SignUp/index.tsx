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
import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";
import signUpStyle from "./styles";

const SignUp = () => {
  const { t } = useTranslation(["signUp"]);
  const history = useHistory();
  const style = signUpStyle();
  const { setUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  // const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repetPassword, setRepetPassword] = useState("");
  const [avatar, setAvatar] = useState<File>();
  const [avatarPreview, setAvatarPreview] = useState<string>();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (password.trim() !== repetPassword.trim()) return;

    const form = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      password: password.trim(),
      avatar,
    };

    api
      .post("/users", form, { withCredentials: true })
      .then(({ data }) => setUser(data));
  }

  function getAvatar(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files?.length) return;
    setAvatar(e.target.files[0]);

    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      if (reader.result) {
        const preview = reader.result as string;
        setAvatarPreview(preview);
      }
    };
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
              <label htmlFor="#input-avatar">
                <Avatar src={avatarPreview} className={style.avatar} />
              </label>
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
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="#input-avatar"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={getAvatar}
                />
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
                  <Button
                    onClick={() => history.push("/sign-in")}
                    variant="outlined"
                    fullWidth
                    color="secondary"
                  >
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
