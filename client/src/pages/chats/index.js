import React, { useEffect } from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import useWebSocket from "react-use-websocket";
import "@chatui/core/es/styles/index.less";
import "@chatui/core/dist/index.css";
import "./chatui.css";

// const initialMessages = [
//   {
//     type: "text",
//     content: { text: "Первое сообщение" },
//     user: {
//       avatar: "//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg",
//     },
//   },
//   {
//     type: "image",
//     content: {
//       picUrl:
//         "",
//     },
//   },
// ];

// const defaultQuickReplies = [
//   {
//     icon: "message",
//     name: "test0",
//     isNew: true,
//     isHighlight: true,
//   },
// ];

const Default = () => {
  const { messages, appendMsg, deleteMsg } = useMessages([]);

  const { lastJsonMessage } = useWebSocket("ws://127.0.0.1:4000/test_ws", {
    shouldReconnect: (closeEvent) => {
      return true;
    },
    reconnectAttempts: 999999999,
    reconnectInterval: 3000,
  });

  useEffect(() => {
    if (lastJsonMessage !== null) {
      try {
        const data = lastJsonMessage;
        appendMsg({
          type: "text",
          content: { text: `${data.userName}\n${data.message}` },
          _id: data.id,
          position: "right",
        });
        // setTimeout(() => {
        //   deleteMsg(data.id);
        // }, 12000);
      } catch (e) {
        console.log(e);
      }
    }
  }, [lastJsonMessage]);

  // function handleSend(type, val) {
  //   if (type === "text" && val.trim()) {
  //     appendMsg({
  //       type: "text",
  //       content: { text: val },
  //       position: "right",
  //     });

  //     setTyping(true);

  //     setTimeout(() => {
  //       appendMsg({
  //         type: "text",
  //         content: { text: "Привет..." },
  //       });
  //     }, 1000);
  //   }
  // }

  // function handleQuickReplyClick(item) {
  //   handleSend("text", item.name);
  // }

  function renderMessageContent(msg) {
    const { type, content } = msg;

    switch (type) {
      case "text":
        return <Bubble content={content.text} />;
      case "image":
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  return (
    <Chat
      messages={messages}
      placeholder=""
      renderMessageContent={renderMessageContent}
      inputOptions={{ variant: "outline" }}
      // quickReplies={defaultQuickReplies}
      // onQuickReplyClick={handleQuickReplyClick}
      // onSend={handleSend}
      // rightAction={{
      //   className: "material-icons-round",
      //   label: "search",
      // }}
    />
  );
};

export default { name: "chats", component: Default };
