import { useState, useEffect } from "react";
import { Badge } from "@mui/material";
import { styled } from "@mui/material/styles";

const keyFrame = {
  "0%": {
    transform: "scale(.8)",
  },
  "100%": {
    transform: "scale(1.4)",
  },
};

const styleBadge = { height: 28, borderRadius: 14, fontSize: 18 };

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    ...styleBadge,
    animation: "1.0s ease 1s reverse both ripple",
  },
  "@keyframes ripple": keyFrame,
}));

const StyledBadge2 = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    ...styleBadge,
    animation: "1.0s ease 1s reverse both ripple2",
  },
  "@keyframes ripple2": keyFrame,
}));

const Default = (props) => {
  const { counter } = props;

  const [count, setCount] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (counter !== count) {
      setShow((prev) => !prev);
      setCount(counter);
    }
  }, [counter]);

  const def = { badgeContent: counter, color: "primary" };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {counter ? (
        show ? (
          <StyledBadge {...def} />
        ) : (
          <StyledBadge2 {...def} />
        )
      ) : null}
      {props.children}
    </div>
  );
};

export default Default;
