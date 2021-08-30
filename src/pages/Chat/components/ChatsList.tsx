import {
  AppBar,
  Avatar,
  IconButton,
  List,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../contexts/AuthContext";
import { ChatContext } from "../../../contexts/ChatContext";
import { chatStyle } from "../styles";
import ChatListItem from "./ChatListItem";

const UserDrawer = () => {
  const { t } = useTranslation(["chat"]);
  const { user, setUser } = useContext(AuthContext);
  const { chats } = useContext(ChatContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const styles = chatStyle();

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
      <List>
        {chats.map((chat, index) => {
          return (
            <ChatListItem
              key={chat.shareCode}
              chat={chat}
              hasNext={Boolean(chats[index + 1])}
            />
          );
        })}
      </List>
    </Fragment>
  );
};

export default UserDrawer;
