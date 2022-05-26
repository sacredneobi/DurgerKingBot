import { useTelegramWebApp, useIsTelegramWebAppReady } from "react-telegram-webapp";

const Default = () => {
  const isReady = useIsTelegramWebAppReady();
  const tel = useTelegramWebApp();
  if (isReady) {
    tel.MainButton.show().onClick(() => tel.close());
  }

  const handleOnClick = () => {
    console.log(tel.initData);
    tel.MainButton.isVisible ? tel.MainButton.hide() : tel.MainButton.show();
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
