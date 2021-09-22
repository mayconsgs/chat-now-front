import {
  AppBar,
  Avatar,
  Box,
  Grid,
  IconButton,
  Slide,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Close, FileCopy } from "@material-ui/icons";
import { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../contexts/AuthContext";
import { ChatContext } from "../../../contexts/ChatContext";
import { chatStyle } from "../styles";
import ChatBalloon from "./ChatBalloon";
import MessageFormComponent from "./MessageFormComponent";

const OpennedChat = () => {
  const { t } = useTranslation(["chat"]);
  const { openedChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  const styles = chatStyle();

  const [openSnackBar, setOpenSnackBar] = useState(false);

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

      <Box
        paddingBottom="2rem"
        height="calc(720px - 64px - 64px)"
        overflow="auto"
        id="messages-display"
      >
        <Grid container direction="column">
          {openedChat?.messages.map((currentMessage, index) => {
            const contatUser =
              openedChat.messages[index - 1]?.user.id ===
              currentMessage?.user.id;
            const sended = currentMessage.user.id === user?.id;

            return (
              <Grid item key={currentMessage.id}>
                <ChatBalloon
                  contatUser={contatUser}
                  message={currentMessage}
                  isSended={sended}
                />
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <MessageFormComponent />

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
