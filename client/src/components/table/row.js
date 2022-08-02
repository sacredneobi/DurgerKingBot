import { memo } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Checkbox,
} from "@mui/material";
import Icon from "../icon";
import { isFunc, areEqualObject } from "@utils";

const Default = memo((props) => {
  const {
    item,
    expanded,
    onChange,
    header,
    details,
    showCheck,
    onSelect,
    selected,
  } = props;

  const handleOnChange = (event, isExpanded) => {
    onChange(isExpanded ? item.id : false);
  };

  const handledOnCheck = (event) => {
    const checked = event.target.checked;
    onSelect(item, checked);
    event.stopPropagation();
  };

  return (
    <Accordion
      expanded={expanded}
      onChange={handleOnChange}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary expandIcon={<Icon textIcon="expand_more" />}>
        {showCheck ? (
          <Checkbox
            sx={{ padding: 0 }}
            onClick={handledOnCheck}
            checked={selected}
          />
        ) : null}
        {isFunc(header, item)}
      </AccordionSummary>
      <AccordionDetails>
        {isFunc(details, { ...item, expanded })}
      </AccordionDetails>
    </Accordion>
  );
}, areEqualObject);

export default Default;
