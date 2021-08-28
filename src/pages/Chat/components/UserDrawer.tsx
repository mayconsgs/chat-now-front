import {
  AppBar,
  Avatar,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Fragment, useContext } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../contexts/AuthContext";
import { ChatContext } from "../../../contexts/ChatContext";
import { chatStyle } from "../styles";
import ChatListItem from "./ChatListItem";

const UserDrawer = () => {
  const { t } = useTranslation(["chat"]);
  const { user, setUser } = useContext(AuthContext);
  const { chats } = useContext(ChatContext);

  const styles = chatStyle();

  return (
    <Fragment>
      <AppBar position="relative">
        <Toolbar>
          <Avatar className={styles.appBarAvatar} />
          <Typography className={styles.expandFlex} variant="h5">
            {t("chat:ola") + user?.firstName}
          </Typography>
          <IconButton onClick={() => setUser(undefined)}>
            <Delete />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        classes={{
          paper: styles.drawerPaper,
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          {chats.map((chat, index) => {
            return (
              <ChatListItem
                key={chat.shareCode}
                chat={chat}
                next={chats[index + 1]}
              />
            );
          })}
        </List>
      </Drawer>
    </Fragment>
  );
};

export default UserDrawer;
