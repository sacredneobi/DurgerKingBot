import { useState, useEffect } from "react";
import { Badge } from "@mui/material";

const keyFrame = {
  "0%": {
    transform: "scale(1.2)",
  },
  "50%": {
    transform: "scale(1.6)",
  },
  "100%": {
    transform: "scale(1.2)",
  },
};

const animationBadge = (swipe) => {
  const def = {
    borderRadius: 14,
    marginRight: 1,
    top: 4,
    "& span": {
      backgroundColor: "#f8a917",
      color: "#fff",
      fontWeight: "700",
    },
    alignSelf: "flex-end",
    animation: "0.2s ease 0.5s running both",
  };
  if (swipe) {
    return { ...def, animation: def.animation + " ripple" };
  }
  return { ...def, animation: def.animation + " ripple2" };
};

const Default = (props) => {
  const { counter } = props;

  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (counter !== count && (counter !== 1 || count > counter)) {
      setShow((prev) => !prev);
      setCount(counter);
    }
  }, [counter]);

  const def = { badgeContent: counter };

  return (
    <>
      <Badge
        {...def}
        sx={{
          ...animationBadge(show),
          "@keyframes ripple": keyFrame,
          "@keyframes ripple2": keyFrame,
        }}
      />
      {props.children}
    </>
  );
};

export default Default;
