import { h } from "preact";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const AssigmentStudentCompleted = (props) => {
  const { assigment } = props;
  return (
    <Card>
      <Box display="flex" justifyContent="space-between">
        <Box>
          <Typography variant="h3">{assigment.title}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <CheckCircleIcon
            sx={{ fontSize: "24px", margin: "2px" }}
            color="success"
          />
          <Typography variant="h4" sx={{ padding: "0px 77px 0px 10px" }}>
            7/8
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};
