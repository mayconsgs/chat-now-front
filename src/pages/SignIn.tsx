import {
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

const SignIn = () => {
  const { t } = useTranslation(["signUp"]);

  return (
    <Container maxWidth="xs">
      <Card>
        {" "}
        <CardContent>
          <Grid container direction="column" spacing={5}>
            <Grid item>
              <Typography variant="h4">{t("signUp:cadastro")}</Typography>
            </Grid>

            <Grid
              item
              component="form"
              container
              direction="column"
              spacing={8}
            >
              <Grid item container direction="column" spacing={2}>
                <Grid item container>
                  <TextField required type="email" label={t("signUp:email")} />
                </Grid>
                <Grid item container>
                  <TextField
                    type="password"
                    required
                    label={t("signUp:senha")}
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

export default SignIn;
