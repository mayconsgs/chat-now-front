import {
  Avatar,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { CSSProperties, FC, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { MessageProps } from "../../../contexts/ChatContext";

interface ChatBalloonProps {
  message: MessageProps;
  contatUser: boolean;
  style: CSSProperties;
}

const ChatBalloonStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      paddingInline: theme.spacing(2),
    },
    message: {
      maxWidth: "500px",
      overflowWrap: "break-word",
      width: "fit-content",
      padding: theme.spacing(2),
      paddingBottom: theme.spacing(0.5),
    },
    sended: {
      marginLeft: "auto",
    },
    concatText: {
      padding: theme.spacing(0.5),
      paddingInline: theme.spacing(2),
    },
    userInfo: {
      padding: 0,
      paddingInline: theme.spacing(2),
      paddingBottom: theme.spacing(0.5),
    },
    spaceImage: {
      marginLeft: "40px",
    },
  })
);

const ChatBalloon: FC<ChatBalloonProps> = ({ style, message, contatUser }) => {
  const chatStyle = ChatBalloonStyle();
  const { user } = useContext(AuthContext);
  const sended = message.user.id === user?.id;

  const typographyClass: string[] = [chatStyle.message];
  if (sended) typographyClass.push(chatStyle.sended);
  else if (contatUser) typographyClass.push(chatStyle.spaceImage);
  if (contatUser) typographyClass.push(chatStyle.concatText);
  else typographyClass.push(chatStyle.userInfo);

  return (
    <div className={chatStyle.root} style={style}>
      {!sended && !contatUser && <Avatar src={message.user.avatarUrl} />}
      <div>
        {!sended && !contatUser && (
          <Typography variant="subtitle1">{message.user.fullName}</Typography>
        )}
        <Typography className={typographyClass.join(" ")} variant="body2">
          {message.text}
        </Typography>
      </div>
    </div>
  );
};

export default ChatBalloon;
