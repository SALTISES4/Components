import { h } from "preact";

import Box from "@mui/material/Box";
import { Stack } from "@mui/material";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

import SvgIcon from "@mui/material/SvgIcon";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import Typography from "@mui/material/Typography";

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
        borderRadius: "10px",
        backgroundColor: "background.paper",
        padding: "10px 0px",
        boxSizing: "border-box",
        marginTop: "32px",
      }}
    >
      <Stack>
        {choices.map((choice) => (
          <Box
            key={choice.title}
            display="flex"
            alignItems="center"
            padding="7px 17px"
            sx={{
              "&:hover": {
                backgroundColor: "#E9F5FF",
              },
            }}
          >
            <SvgIcon
              sx={{
                color: "secondary4.main",
                fontSize: "16px",
              }}
              component={choice.icon}
            />
            <Box color="secondary4.main" marginLeft="10px">
              <Typography fontSize="12px" lineHeight="16px">
                {choice.title}
              </Typography>
            </Box>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};
