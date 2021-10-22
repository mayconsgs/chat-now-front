import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Slide,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Close, FileCopy } from "@material-ui/icons";
import { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import AutoSizer from "react-virtualized-auto-sizer";
import { VariableSizeList } from "react-window";
import { AuthContext } from "../../../contexts/AuthContext";
import { ChatContext } from "../../../contexts/ChatContext";
import { chatStyle } from "../styles";
import ChatBalloon from "./ChatBalloon";
import MessageFormComponent from "./MessageFormComponent";

const OpennedChat = () => {
  const { t } = useTranslation(["chat"]);
  const { openedChat } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const theme = useTheme();

  const styles = chatStyle();

  const [openSnackBar, setOpenSnackBar] = useState(false);

  const messagesHeight = openedChat?.messages.map((message, index) => {
    let height = theme.spacing(2);
    const contatUser =
      openedChat?.messages[index - 1]?.user.id === message.user.id;
    const sended = message.user.id === user?.id;

    height = Math.floor((message.text.length / 62 + 1) * theme.spacing(3));

    if (contatUser) {
      height = height - theme.spacing(0.5);
    } else {
      height = height + theme.spacing(2);
    }

    return height;
  });

  const getMessageHeight = (index: number) =>
    messagesHeight ? messagesHeight[index] : 0;

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
      >
        <AutoSizer>
          {({ height, width }) => (
            <VariableSizeList
              height={height}
              width={width}
              itemData={openedChat?.messages}
              itemCount={openedChat?.messages.length || 0}
              itemSize={getMessageHeight}
              className="messages-display"
            >
              {({ style, index, data }) => {
                const currentMessage = data[index];
                const contatUser =
                  data[index - 1]?.user.id === currentMessage.user.id;
                const sended = currentMessage.user.id === user?.id;

                return (
                  <ChatBalloon
                    contatUser={contatUser}
                    message={currentMessage}
                    isSended={sended}
                    style={style}
                  />
                );
              }}
            </VariableSizeList>
          )}
        </AutoSizer>
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
