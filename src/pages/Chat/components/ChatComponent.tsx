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
} from "@material-ui/core";
import { Close, FileCopy } from "@material-ui/icons";
import { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ListChildComponentProps, VariableSizeList } from "react-window";
import { ChatContext, MessageProps } from "../../../contexts/ChatContext";
import { chatStyle } from "../styles";
import ChatBalloon from "./ChatBalloon";
import MessageFormComponent from "./MessageFormComponent";

const OpennedChat = () => {
  const { t } = useTranslation(["chat"]);
  const { openedChat } = useContext(ChatContext);

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

  function renderMessage({
    index,
    style,
    data,
  }: ListChildComponentProps<MessageProps[]>) {
    const currentMessage = data[index];
    const contatUser = data[index - 1]?.user.id === currentMessage?.user.id;

    return (
      <ChatBalloon
        contatUser={contatUser}
        message={currentMessage}
        style={style}
      />
    );
  }

  const rowHeight = openedChat?.messages.map((currentMessage, index) => {
    const contatUser =
      openedChat?.messages[index - 1]?.user.id === currentMessage?.user.id;

    const lines = Math.floor(currentMessage.text.length / 133 + 1);

    const height = lines * (56 / 3) + (contatUser ? 16 : 20);

    if (!contatUser && height < 40) return 40;

    return height;
  });

  const getItemSize = (index: number) => {
    if (!rowHeight) return 80;

    return rowHeight[index];
  };

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

      <Box>
        <VariableSizeList
          height={600}
          width="100%"
          itemSize={getItemSize}
          itemCount={openedChat?.messages.length || 0}
          itemData={openedChat?.messages}
        >
          {renderMessage}
        </VariableSizeList>
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
