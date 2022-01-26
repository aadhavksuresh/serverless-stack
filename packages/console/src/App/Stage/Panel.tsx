import {
  BsTerminalFill,
  BsFillLightningChargeFill,
  BsPeopleFill,
  BsStack,
  BsFillArchiveFill,
} from "react-icons/bs";
import { Logo, Stack } from "~/components";
import { styled } from "~/stitches.config";
import { NavLink, useParams } from "react-router-dom";
import { useConstructsByType } from "~/data/aws";
import { useState } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { useDarkMode } from "~/data/global";

const Menu = styled(Stack, {
  flexGrow: 1,
});

const MenuItem = styled(NavLink, {
  paddingLeft: "$md",
  display: "flex",
  height: 50,
  alignItems: "center",
  // borderLeft: "2px solid transparent",
  color: "$hiContrast",

  "&.active": {
    borderColor: "$highlight",
    color: "$highlight",
  },

  "& svg": {
    display: "block",
    width: "20px",
    height: "20px",
    flexShrink: 0,
  },
});

const MenuLabel = styled("div", {
  fontSize: "$sm",
  fontWeight: 600,
  marginLeft: "$md",
});

const LogoContainer = styled("div", {
  padding: "$md 0 $xl",
  display: "flex",
  alignItems: "start",
  justifyContent: "center",
  variants: {
    expand: {
      true: {},
    },
  },
});

const Footer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  padding: "$md",
  background: "$accent",
  position: "relative",
  borderTop: "1px solid $border",
});

const FooterStage = styled("div", {
  fontWeight: 600,
  padding: "0 $md",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  left: 0,
  height: "100%",
  width: 200,
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  overflow: "hidden",
  opacity: 0,
  fontSize: "$sm",
  pointerEvents: "none",
  transition: "200ms opacity",
});

const FooterArrow = styled(ArrowRightIcon, {
  display: "block",
  width: "20px",
  height: "20px",
  flexShrink: 0,
  cursor: "pointer",
  transition: "200ms transform",
});

const Root = styled("div", {
  background: "$loContrast",
  flexShrink: 0,
  borderRight: "1px solid $border",
  overflow: "hidden",
  width: 53,
  display: "flex",
  flexDirection: "column",
  transition: "200ms width",
  variants: {
    expand: {
      true: {
        width: 200,

        [`& ${FooterStage}`]: {
          opacity: 1,
          pointerEvents: "all",
        },
        [`& ${FooterArrow}`]: {
          transform: "rotate(-180deg)",
        },
      },
    },
  },
});

export function Panel() {
  const hasAuth = useConstructsByType("Auth")!.length > 0;
  const [expand, setExpand] = useState(false);
  const params = useParams<{
    stage: string;
    app: string;
  }>();
  const dm = useDarkMode();
  return (
    <Root expand={expand}>
      <Menu space="0">
        <MenuItem to="local">
          <BsTerminalFill />
          <MenuLabel>Local</MenuLabel>
        </MenuItem>
        <MenuItem to="stacks">
          <BsStack />
          <MenuLabel>Stacks</MenuLabel>
        </MenuItem>
        <MenuItem to="functions">
          <BsFillLightningChargeFill />
          <MenuLabel>Functions</MenuLabel>
        </MenuItem>
        {hasAuth && (
          <MenuItem to="cognito">
            <BsPeopleFill />
            <MenuLabel>Cognito</MenuLabel>
          </MenuItem>
        )}
        <MenuItem to="buckets">
          <BsFillArchiveFill />
          <MenuLabel>Buckets</MenuLabel>
        </MenuItem>
      </Menu>
      <Footer>
        <FooterStage onClick={() => dm.toggle()}>{params.stage}</FooterStage>
        <FooterArrow onClick={() => setExpand(!expand)} />
      </Footer>
    </Root>
  );
}
