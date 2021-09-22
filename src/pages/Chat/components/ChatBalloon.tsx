import {
  Avatar,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { FC } from "react";
import { MessageProps } from "../../../contexts/ChatContext";

interface ChatBalloonProps {
  message: MessageProps;
  contatUser: boolean;
  isSended: boolean;
}

const ChatBalloonStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      paddingInline: theme.spacing(2),
      width: "fit-content",
      marginTop: theme.spacing(2),
    },
    text: {
      paddingInline: theme.spacing(2),
      maxWidth: "500px",
      overflowWrap: "break-word",
    },
    sended: {
      marginLeft: "auto",
    },
    concat: {
      marginTop: theme.spacing(1.5),
    },
    chatContainer: {
      marginLeft: theme.spacing(1),
    },
    addSpaceImage: {
      marginLeft: theme.spacing(5),
    },
  })
);

const ChatBalloon: FC<ChatBalloonProps> = ({
  message,
  contatUser,
  isSended,
}) => {
  const chatStyle = ChatBalloonStyle();

  const rootClasses: string[] = [chatStyle.root];
  const textClasses: string[] = [chatStyle.text];
  const textContainerClasses: string[] = [];

  if (contatUser && !isSended) {
    textContainerClasses.push(chatStyle.addSpaceImage);
  }
  if (isSended) {
    rootClasses.push(chatStyle.sended);
  } else {
  }
  if (contatUser) {
    rootClasses.push(chatStyle.concat);
  }

  return (
    <div className={rootClasses.join(" ")}>
      {!isSended && !contatUser && <Avatar src={message.user.avatarUrl} />}
      <div className={textContainerClasses.join(" ")}>
        {!isSended && !contatUser && (
          <Typography
            color="textSecondary"
            className={chatStyle.text}
            variant="subtitle1"
          >
            {message.user.fullName}
          </Typography>
        )}
        <Typography className={textClasses.join(" ")} variant="body2">
          {message.text}
        </Typography>
      </div>
    </div>
  );
};

export default ChatBalloon;
