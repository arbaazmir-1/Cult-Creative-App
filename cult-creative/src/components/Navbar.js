import React from "react";
import {
  Flex,
  Box,
  Spacer,
  Heading,
  Button,
  ButtonGroup,
  Show,
  Hide,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { listJobs } from "../actions/jobActions";

const Navbar = () => {
  const dispatch = useDispatch();

  const GetList = () => {
    dispatch(listJobs());
  };

  return (
    <>
      <Flex justifyContent="space-between">
        <Box p="4">
          <Heading size="md" onClick={GetList} style={{ cursor: "pointer" }}>
            Cult Solutions
          </Heading>
        </Box>
        <Spacer />
        <Show above="md">
          <Box p="4">
            <ButtonGroup spacing="4">
              <Link>Home</Link>
              <Link>About</Link>
              <Link>Contact</Link>
              <Link>Profile</Link>
            </ButtonGroup>
          </Box>
        </Show>
        <Hide above="md">
          <Box p="4">
            <Menu>
              <MenuButton as={Button}>Menu</MenuButton>
              <MenuList>
                <MenuItem>Home</MenuItem>
                <MenuItem>About</MenuItem>
                <MenuItem>Contact</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Hide>
      </Flex>
    </>
  );
};

export default Navbar;
