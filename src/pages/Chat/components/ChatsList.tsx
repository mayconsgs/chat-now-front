import {
  AppBar,
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { AuthContext } from "../../../contexts/AuthContext";
import { ChatContext, ChatProps } from "../../../contexts/ChatContext";
import { chatStyle } from "../styles";

const UserDrawer = () => {
  const { t } = useTranslation(["chat"]);
  const { user, setUser } = useContext(AuthContext);
  const { chats, onOpenChat, openedChatId } = useContext(ChatContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const styles = chatStyle();

  function renderChatListItem({
    index,
    style,
    data,
  }: ListChildComponentProps<ChatProps[]>) {
    const chat = data[index];
    const hasNext = Boolean(data[index + 1]);

    const lastMessage =
      chat.messages[0]?.text || "Seja o primeiro a mandar uma mensagem";

    return (
      <ListItem
        button
        style={style}
        selected={openedChatId === chat.shareCode}
        divider={hasNext}
        onClick={() => onOpenChat(chat.shareCode)}
      >
        <ListItemAvatar>
          <Avatar />
        </ListItemAvatar>
        <ListItemText
          classes={{
            primary: styles.breakText,
            secondary: styles.breakText,
          }}
          primary={chat.title}
          secondary={lastMessage}
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
            {t("chat:ola") + user?.firstName}
          </Typography>
          <IconButton onClick={handleClick}>
            <MoreVert />
          </IconButton>
          <Menu
            id="simple-menu"
            open={Boolean(anchorEl)}
            onClose={handleClose}
            keepMounted
            anchorEl={anchorEl}
          >
            <MenuItem onClick={() => setUser(undefined)}>SignOut</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <FixedSizeList
        width={400}
        height={500}
        itemSize={80}
        itemCount={chats.length}
        itemData={chats}
      >
        {renderChatListItem}
      </FixedSizeList>
    </Fragment>
  );
};

export default UserDrawer;
