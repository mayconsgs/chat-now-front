import {
  AppBar,
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { FormEvent, Fragment, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { AuthContext } from "../../../contexts/AuthContext";
import { ChatContext, ChatProps } from "../../../contexts/ChatContext";
import api from "../../../services/api";
import { chatStyle } from "../styles";

const ChatsList = () => {
  const { t } = useTranslation(["chat"]);
  const { user, setUser } = useContext(AuthContext);
  const { chats, onOpenChat, openedChatId } = useContext(ChatContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showMenu, setShowMenu] = useState(false);

  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const styles = chatStyle();

  function openMenu(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget);
    setShowMenu(true);
  }

  function closeMenu() {
    setAnchorEl(null);
    setShowMenu(false);
  }

  function openNewChatModal() {
    setShowMenu(false);
    setShowNewChatModal(true);
  }

  function onSubmitNewChat(e: FormEvent) {
    e.preventDefault();

    api
      .post("/chats", {
        title,
        description,
      })
      .then((response) => {
        setShowNewChatModal(false);
      });
  }

  async function logOut() {
    await api.post("logout");
    setUser();
  }

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
          <IconButton onClick={openMenu}>
            <MoreVert />
          </IconButton>
          <Menu
            id="simple-menu"
            open={showMenu}
            onClose={closeMenu}
            keepMounted
            anchorEl={anchorEl}
          >
            <MenuItem onClick={logOut}>SignOut</MenuItem>
            <MenuItem onClick={openNewChatModal}>Criar novo Chat</MenuItem>
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

      <Modal open={showNewChatModal} onClose={() => setShowNewChatModal(false)}>
        <Container maxWidth="xs">
          <Grid
            container
            sm
            direction="column"
            component="form"
            onSubmit={onSubmitNewChat}
            spacing={1}
          >
            <Grid item>
              <TextField
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                label="Name"
              />
            </Grid>
            <Grid>
              <TextField
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                label="Description"
              />
            </Grid>
            <Grid>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
              >
                Criar
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Modal>
    </Fragment>
  );
};

export default ChatsList;
