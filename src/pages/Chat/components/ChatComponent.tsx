import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Slide,
  Snackbar,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import { Close, FileCopy } from "@material-ui/icons";
import { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { ChatContext } from "../../../contexts/ChatContext";
import { chatStyle } from "../styles";
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

  function renderMessage(props: ListChildComponentProps) {
    const { index, style } = props;
    const currentMessage = openedChat?.messages[index];
    const contatUser =
      openedChat?.messages[index - 1]?.user.id === currentMessage?.user.id;

    return (
      <ListItem style={style}>
        {contatUser ? (
          <Fragment />
        ) : (
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
        )}
        <ListItemText
          primary={contatUser ? undefined : currentMessage?.user.fullName}
          secondary={currentMessage?.text}
        />
      </ListItem>
    );
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

      <Box>
        <FixedSizeList
          height={720}
          width="100%"
          itemSize={70}
          itemCount={openedChat?.messages.length || 0}
          style={{ direction: "revert" }}
        >
          {renderMessage}
        </FixedSizeList>
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
