import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Firebase from "../Firebase/firebase";

import {
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  Navbar,
  Nav,
  NavItem
} from "reactstrap";

const NavigationBar = ({ isLoggedIn, currentUser, doSetCurrentUser }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logoutUser = async () => {
    try {
      await Firebase.doSignOut();
      doSetCurrentUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const toggle = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <Navbar>
        <Nav tabs>
          <NavItem>
            <NavLink className="nav-link" exact to="/">
              HomeBrew Inc.
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" exact to="/modules">
              Modules
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" exact to="/races">
              Races
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" exact to="/classes">
              Classes
            </NavLink>
          </NavItem>
          {isLoggedIn && (
            <Dropdown nav isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle nav caret>
                Create
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Select</DropdownItem>
                <DropdownItem>
                  <NavItem>
                    <NavLink className="nav-link" exact to="/createmodule">
                      Create Module
                    </NavLink>
                  </NavItem>
                </DropdownItem>
                <DropdownItem>
                  <NavItem>
                    <NavLink className="nav-link" exact to="/createrace">
                      Create Race
                    </NavLink>
                  </NavItem>
                </DropdownItem>
                <DropdownItem>
                  <NavItem>
                    <NavLink className="nav-link" exact to="/createclass">
                      Create Class
                    </NavLink>
                  </NavItem>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </Nav>
        {isLoggedIn ? (
          <Nav>
            <span
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={logoutUser}
            >
              Logout
            </span>
          </Nav>
        ) : (
          <Nav>
            <NavLink className="nav-link" exact to="/login">
              Login
            </NavLink>
            <NavLink className="nav-link" exact to="/signup">
              Signup
            </NavLink>
          </Nav>
        )}
      </Navbar>
    </div>
  );
};

export default NavigationBar;

// const NavigationBar = ({ isLoggedIn, currentUser, doSetCurrentUser }) => {
//   const [collapsed, setCollapsed] = useState(true);

//   const toggleNavbar = () => setCollapsed(!collapsed);

//   return (
//     <div style={{ backgroundColor: "chocolate" }}>
//       <Navbar color="faded" light>
//         <NavbarBrand href="/" className="mr-auto">
//           HomeBrew Inc.
//         </NavbarBrand>
//         <NavbarToggler onClick={toggleNavbar} className="mr-2" />
//         <Collapse isOpen={!collapsed} navbar>
//           <Nav navbar>
//             {!isLoggedIn ? (
//               <>
//                 <NavItem>
//                   <NavLink exact to="/login">
//                     Login
//                   </NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink exact to="/signup">
//                     Signup
//                   </NavLink>
//                 </NavItem>
//               </>
//             ) : (
//               <>
//                 <NavItem>
//                   <NavLink exact to="/profile">
//                     Profile
//                   </NavLink>
//                 </NavItem>
//                 <NavItem>
//                   <NavLink exact to="/signout">
//                     Signout
//                   </NavLink>
//                 </NavItem>
//               </>
//             )}
//             <NavItem>
//               <NavLink exact to="/modules">
//                 Modules
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink exact to="/races">
//                 Races
//               </NavLink>
//             </NavItem>
//             <NavItem>
//               <NavLink exact to="/classes">
//                 Classes
//               </NavLink>
//             </NavItem>
//           </Nav>
//         </Collapse>
//       </Navbar>
//     </div>
//   );
// };

// export default NavigationBar;
