import { h } from "preact";

import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import saltise from "../theme";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import styled from "@emotion/styled";
import SvgIcon from "@mui/material/SvgIcon";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import Typography from "@mui/material/Typography";

//const theme = saltise;

const Item = styled("div")({
  color: saltise.palette.secondary4.main,
  textAlign: "center",
  padding: "7px",
});

export const HeaderDropdown = (props) => {
  const choices = [
    {
      title: "Question",
      icon: QuestionAnswerIcon,
    },
    {
      title: "Assigment",
      icon: AssignmentIcon,
    },
    {
      title: "Collection",
      icon: PlaylistAddIcon,
    },
    {
      title: "Group",
      icon: GroupsIcon,
    },
    {
      title: "Invite",
      icon: PersonAddIcon,
    },
  ];
  return (
    <Box
      position="absolute"
      sx={{
        width: "130px",
        boxShadow: "0px 0px 4px rgb(0,0,0.05)",
        borderRadius: "4px",
        backgroundColor: "background.paper",
        padding: "10px 17px",
        boxSizing: "border-box",
        marginTop: "32px",
      }}
    >
      <Stack>
        {choices.map((choice) => (
          <Box key={choice.title} display="flex" alignItems="center">
            <SvgIcon
              sx={{ color: "secondary4.main", fontSize: "16px" }}
              component={choice.icon}
            />
            <Item>
              <Typography fontSize="12px">{choice.title}</Typography>
            </Item>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
