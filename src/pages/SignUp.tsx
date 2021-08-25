import {
  Avatar,
  Button,
  Card,
  CardContent,
  Container,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import { Person } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  })
);

const SignUp = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs">
      <Card>
        {" "}
        <CardContent>
          <Typography variant="h4" color="secondary">
            Cadastro
          </Typography>

          <Avatar className={classes.large}>
            <Person fontSize="default" />
          </Avatar>

          <form>
            <TextField variant="outlined" label="Nome" fullWidth />
            <TextField variant="outlined" label="Sobrenome" fullWidth />
            <TextField variant="outlined" label="E-mail" fullWidth />
            <TextField variant="outlined" label="Senha" fullWidth />
            <TextField variant="outlined" label="Repetir senha" fullWidth />

            <Button type="submit" variant="contained" color="secondary">
              Cadastrar
            </Button>
            <Typography variant="caption">Já possui conta?</Typography>
            <Button variant="outlined" color="secondary">
              Entrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SignUp;
