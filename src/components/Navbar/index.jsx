import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Firebase from "../Firebase/firebase";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";

const NavigationBar = ({ isLoggedIn, currentUser, doSetCurrentUser }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div style={{ backgroundColor: "chocolate" }}>
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">
          HomeBrew Inc.
        </NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            {!isLoggedIn ? (
              <>
                <NavItem>
                  <NavLink exact to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink exact to="/signup">
                    Signup
                  </NavLink>
                </NavItem>
              </>
            ) : (
              <>
                <NavItem>
                  <NavLink exact to="/profile">
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink exact to="/signout">
                    Signout
                  </NavLink>
                </NavItem>
              </>
            )}
            <NavItem>
              <NavLink exact to="/modules">
                Modules
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/races">
                Races
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink exact to="/classes">
                Classes
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
