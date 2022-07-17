import React from "react";

const Default = (props) => {
  const { children, ...other } = props;

  return children
    .filter((item) => item !== null)
    .map((item, index) => {
      if (item?.type) {
        return <item.type key={index} {...other} {...item.props} />;
      }
      if (item) {
        return React.cloneElement(item, {
          key: index,
          ...other,
          ...item?.props,
        });
      }
      return null;
    });
};

export default Default;
