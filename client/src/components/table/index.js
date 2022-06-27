import * as React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Pagination,
} from "@mui/material";
import Box from "../box";
import Icon from "../icon";

export default (props) => {
  const { header, details, items, countPage, page, usePage } = props;

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
      <Box sx={{ overflow: "auto", flexGrow: 1 }}>
        {Array.isArray(items)
          ? items.map((item, index) => (
              <Accordion
                key={index}
                expanded={expanded === index}
                onChange={handleChange(index)}
                TransitionProps={{ unmountOnExit: true }}
              >
                <AccordionSummary
                  expandIcon={<Icon textIcon="expand_more" />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  {typeof header === "function" ? header(item) : null}
                </AccordionSummary>
                <AccordionDetails>
                  {typeof details === "function" ? details(item) : null}
                </AccordionDetails>
              </Accordion>
            ))
          : null}
      </Box>
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
          onChange={(event, page) => {
            if (typeof usePage === "function") {
              usePage(page);
            }
          }}
        />
      </Box>
    </Box>
  );
};
