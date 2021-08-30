import { Fab, Grid, TextField } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import { FormEvent, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChatContext } from "../../../contexts/ChatContext";
import api from "../../../services/api";
import { chatStyle } from "../styles";

const MessageFormComponent = () => {
  const { t } = useTranslation(["chat"]);
  const { socket, openedChatId } = useContext(ChatContext);

  const styles = chatStyle();

  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    setNewMessage("");
  }, [openedChatId]);

  function submitMessage(e: FormEvent) {
    e.preventDefault();

    api
      .post(`/chats/${openedChatId}/messages`, {
        text: newMessage.trim(),
      })
      .then(({ data: message }) => {
        setNewMessage("");
        socket?.emit("sendMessage", openedChatId, message);
      });
  }

  return (
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
        <Fab type="submit">
          <Send color="action" />
        </Fab>
      </Grid>
    </Grid>
  );
};

export default MessageFormComponent;
