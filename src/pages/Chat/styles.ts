import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const chatStyle = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      position: "relative",
      width: "100%",
      overflowX: "hidden",
      overflowY: "auto",
    },
    breakText: {
      width: "30vw",
      maxWidth: "250px",
      minWidth: "180px",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },
    badgeCenter: {
      top: "50%",
    },
    container: {
      padding: 0,
    },
    appBarAvatar: {
      marginRight: theme.spacing(2),
    },

    expandFlex: {
      flexGrow: 1,
    },
  })
);
