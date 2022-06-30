import { memo, useState, useCallback } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Pagination,
  Checkbox,
} from "@mui/material";
import Box from "../box";
import Icon from "../icon";
import { areEqualObject } from "@utils/areRender";

const Row = memo((props) => {
  const { item, expanded, onChange, header, details, showCheck } = props;

  const handleOnChange = (event, isExpanded) => {
    onChange(isExpanded ? item.id : false);
  };

  const handledOnCheck = (event) => {
    // console.log(event.target.checked);
    item.checked = event.target.checked;
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
            checked={item.checked}
          />
        ) : null}
        {typeof header === "function" ? header(item) : null}
      </AccordionSummary>
      <AccordionDetails>
        {typeof details === "function" ? details(item) : null}
      </AccordionDetails>
    </Accordion>
  );
}, areEqualObject);

const Rows = (props) => {
  const { items, ...other } = props;

  const [expanded, setExpanded] = useState(false);

  const handleChange = useCallback((expanded) => {
    setExpanded(expanded);
  }, []);

  return (
    <Box sx={{ overflow: "auto", flexGrow: 1 }}>
      {Array.isArray(items)
        ? items.map((item, index) => (
            <Row
              key={index}
              {...other}
              item={item}
              onChange={handleChange}
              expanded={expanded === item.id}
            />
          ))
        : null}
    </Box>
  );
};

export default (props) => {
  const {
    itemsRender = {},
    items,
    countPage,
    page,
    usePage,
    showCheck,
  } = props;
  const { header, details } = itemsRender;

  const handleOnChange = useCallback((event, page) => {
    if (typeof usePage === "function") {
      usePage(page);
    }
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
        padding: 0.5,
        boxShadow:
          "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;",
      }}
    >
      <Rows
        items={items}
        header={header}
        details={details}
        showCheck={showCheck}
      />
      <Box
        sx={{
          margin: 1,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography>Количество выделенных элементов (100)</Typography>
        </Box>
        <Pagination
          count={countPage}
          variant="outlined"
          shape="rounded"
          page={page}
          onChange={handleOnChange}
        />
      </Box>
    </Box>
  );
};
