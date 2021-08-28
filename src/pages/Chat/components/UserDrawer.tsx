import {
  AppBar,
  Avatar,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../../contexts/AuthContext";
import { ChatContext } from "../../../contexts/ChatContext";

const UserDrawer = () => {
  const { t } = useTranslation(["chat"]);
  const { user } = useContext(AuthContext);
  const { chats } = useContext(ChatContext);

  return (
    <Drawer variant="permanent" anchor="left">
      <AppBar position="relative">
        <Toolbar>
          <Avatar alt={user?.fullName} src={user?.avatarUrl} />
          <Grid item container direction="column">
            <Grid item>
              <Typography variant="h5">
                {t("chat:ola") + user?.firstName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography>2 conversas não lidas</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <List>
        {chats.map((chat) => {
          const lastMessage =
            chat.messages[0]?.text || "Seja o primeiro a mandar uma mensagem";

          return (
            <ListItem>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText primary={chat.title} secondary={lastMessage} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default UserDrawer;
