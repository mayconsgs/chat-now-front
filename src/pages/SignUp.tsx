import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

const SignUp = () => {
  const { t } = useTranslation(["signUp"]);

  return (
    <Container maxWidth="xs">
      <Card>
        {" "}
        <CardContent>
          <Typography variant="h4">{t("signUp:cadastro")}</Typography>

          <Avatar>
            <Person fontSize="default" />
          </Avatar>

          <form>
            <TextField label={t("signUp:nome")} />
            <TextField label={t("signUp:sobrenome")} />
            <TextField label={t("signUp:email")} />
            <TextField label={t("signUp:senha")} />
            <TextField label={t("signUp:repetirSenha")} />

            <Button
              disableElevation
              type="submit"
              variant="contained"
              color="secondary"
            >
              {t("signUp:cadastrar")}
            </Button>
            <Typography variant="caption">{t("signUp:possuiConta")}</Typography>
            <Button variant="outlined" color="secondary">
              {t("signUp:entrar")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignUp;
