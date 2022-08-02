const root = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
};

const buttonInvisible = {
  fontSize: 29,
  margin: (theme) => theme.spacing(1, 0, 1, 2),
};

const buttonContainer = {
  margin: (theme) => theme.spacing(1, 1, 1, 1),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const buttonIcon = {
  fontSize: 29,
  color: "var(--tg-theme-button-text-color, #fff)",
  borderRadius: 1,
  border: "1px solid rgba(0, 0, 0, 0.23)",
  backgroundColor: "#f8a917",
};

const pagination = {
  flexGrow: 1,
};

export { root, buttonInvisible, buttonContainer, buttonIcon, pagination };
