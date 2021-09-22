import { Container, Grid } from "@material-ui/core";
import { ChatProvider } from "../../contexts/ChatContext";
import OpennedChat from "./components/ChatComponent";
import ChatsList from "./components/ChatsList";
import { chatStyle } from "./styles";

const Chat = () => {
  const styles = chatStyle();

  return (
    <ChatProvider>
      <Container disableGutters style={{ height: "720px" }}>
        <Grid container direction="row" wrap="nowrap">
          <Grid item>
            <Container maxWidth="xl" className={styles.container}>
              <ChatsList />
            </Container>
          </Grid>
          <Grid item className={styles.expandFlex}>
            <Container className={styles.container}>
              <OpennedChat />
            </Container>
          </Grid>
        </Grid>
      </Container>
    </ChatProvider>
  );
};

export default Chat;
