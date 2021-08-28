import { Container, Grid } from "@material-ui/core";
import { ChatProvider } from "../../contexts/ChatContext";
import OpennedChat from "./components/OpennedChat";
import UserDrawer from "./components/UserDrawer";
import { chatStyle } from "./styles";

const Chat = () => {
  const styles = chatStyle();

  return (
    <ChatProvider>
      <Container>
        <Grid container direction="row" wrap="nowrap">
          <Grid item>
            <Container maxWidth="xl" className={styles.container}>
              <UserDrawer />
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
