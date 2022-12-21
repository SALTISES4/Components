import { h } from "preact";

import Box from "@mui/material/Box";

import PersonAddIcon from "@mui/icons-material/PersonAdd";

import SvgIcon from "@mui/material/SvgIcon";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import GroupsIcon from "@mui/icons-material/Groups";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

const style = {
  position: "absolute",
  width: "130px",
  boxShadow: "0px 0px 4px rgb(0,0,0.05)",
  borderRadius: "10px",
  backgroundColor: "background.paper",
  boxSizing: "border-box",
  top: "55px",
};

const typographyStyle = {
  sx: {
    fontSize: "12px",
    lineHeight: "16px",
    color: "secondary4.main",
  },
};

export const NavigationDropdown = (props) => {
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
    <Box sx={style}>
      <List>
        {choices.map((choice) => (
          <ListItem disablePadding key={choice.title}>
            <ListItemButton color="red">
              <ListItemIcon>
                <SvgIcon
                  sx={{
                    color: "secondary4.main",
                    fontSize: "16px",
                  }}
                  component={choice.icon}
                />
              </ListItemIcon>
              <ListItemText
                primary={choice.title}
                primaryTypographyProps={typographyStyle}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
