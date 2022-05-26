import { useTelegramWebApp, useIsTelegramWebAppReady } from "react-telegram-webapp";
import { sendMessagePost } from "./api";

const Default = () => {
  const isReady = useIsTelegramWebAppReady();
  const tel = useTelegramWebApp();
  if (isReady) {
    tel.MainButton.show().onClick(() => tel.close());
  }

  const handleOnClick = () => {
    sendMessagePost(tel.initDataUnsafe);
    // console.log(tel.initDataUnsafe);
    // tel.MainButton.isVisible ? tel.MainButton.hide() : tel.MainButton.show();
  };

  // console.log(tel, isReady);
  if (isReady)
    return (
      <>
        <button onClick={handleOnClick}>toggle main button</button>
        <br />
        <br />
        {JSON.stringify(tel.themeParams, null, 2)}
        <br />
        <br />
        {JSON.stringify(tel.initDataUnsafe, null, 2)}
      </>
    );

  return <div />;
};

export default Default;
