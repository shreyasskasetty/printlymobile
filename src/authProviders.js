import React from "react";
//import { Apple as AppleIcon } from "@material-ui/icons";
import {GitHub as GithubIcon} from "@material-ui/icons";
//import {Facebook as FacebookBoxIcon} from "@material-ui/icons"
import { Icon } from '@iconify/react';
import googleCircleFilled from '@iconify/icons-ant-design/google-circle-filled';


const authProviders = [
  // {
  //   providerId: "apple.com",
  //   color: "#000000",
  //   icon: <AppleIcon />,
  //   name: "Apple"
  // },
  // {
  //   providerId: "facebook.com",
  //   color: "#3c5a99",
  //   icon: <FacebookBoxIcon />,
  //   name: "Facebook"
  // },
  {
    providerId: "github.com",
    color: "#24292e",
    icon: <GithubIcon/>,
    name: "GitHub"
  },
  {
    providerId: "google.com",
    color: "#4285f4",
    icon: <Icon icon={googleCircleFilled} />,
    name: "Google"
  }
];

export default authProviders;


