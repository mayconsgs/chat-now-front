import { Container } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { ChatProvider } from "../../contexts/ChatContext";
import UserDrawer from "./components/UserDrawer";

const Chat = () => {
  const { t } = useTranslation(["chat"]);

  return (
    <ChatProvider>
      <Container>
        <UserDrawer />
      </Container>
    </ChatProvider>
  );
};

export default Chat;
