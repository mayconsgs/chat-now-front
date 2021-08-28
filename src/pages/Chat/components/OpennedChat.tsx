import {
  AppBar,
  Avatar,
  Fab,
  Grid,
  IconButton,
  List,
  Slide,
  Snackbar,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Close, FileCopy, Send } from "@material-ui/icons";
import { FormEvent, Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChatContext } from "../../../contexts/ChatContext";
import api from "../../../services/api";
import { chatStyle } from "../styles";

const OpennedChat = () => {
  const { t } = useTranslation(["chat"]);
  const { opennedChat: openedChat, openChatId } = useContext(ChatContext);
  const [newMessage, setNewMessage] = useState("");
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const styles = chatStyle();

  function submitMessage(e: FormEvent) {
    e.preventDefault();

    api
      .post(`/chats/${openChatId}/messages`, {
        text: newMessage.trim(),
      })
      .then(() => {
        setNewMessage("");
      });
  }

  async function copyShareCode() {
    await navigator.clipboard.writeText(openedChat?.shareCode!);
    setOpenSnackBar(true);
  }

  function handleClose(event?: React.SyntheticEvent, reason?: string) {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  }

  return (
    <Fragment>
      <AppBar position="relative">
        <Toolbar>
          <Avatar className={styles.appBarAvatar} />
          <Typography className={styles.expandFlex} variant="h5">
            {openedChat?.title}
          </Typography>
          <Tooltip arrow title={t("chat:copiar")}>
            <IconButton
              aria-label={t("chat:copiar").toLowerCase()}
              onClick={copyShareCode}
            >
              <FileCopy />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <List>
        {openedChat?.messages.map((message) => {
          return <Typography key={message.id}>{message.text}</Typography>;
        })}
      </List>

      <Grid
        container
        direction="row"
        wrap="nowrap"
        spacing={2}
        component="form"
        onSubmit={submitMessage}
      >
        <Grid item className={styles.expandFlex}>
          <TextField
            required
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onInvalid={(e) => e.preventDefault()}
            placeholder={t("chat:newMessagePlaceholder")}
          />
        </Grid>
        <Grid item>
          <Fab color="secondary" type="submit">
            <Send />
          </Fab>
        </Grid>
      </Grid>

      <Snackbar
        anchorOrigin={{
          horizontal: "left",
          vertical: "bottom",
        }}
        color="#121212"
        open={openSnackBar}
        autoHideDuration={5000}
        onClose={handleClose}
        message={t("chat:snackMessage")}
        TransitionComponent={Slide}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      />
    </Fragment>
  );
};

export default OpennedChat;
