import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const signUpStyle = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
    iconAvatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  })
);

export default signUpStyle;
