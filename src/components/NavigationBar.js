import React, { useState } from "react";
import { Card, Button, Alert, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import Profile from "./Profile";

export default function NavigationBar() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }


  return (
    <div className="admin-panel-container">
      <Navbar fixed="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Travel Now</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home"  onClick={() => history.push('/') } >Home</Nav.Link>
            <NavDropdown title="Vehicles" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1"  onClick={() => history.push('/update-profile') }>
                All Vehicles
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Available Vehicles
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">
                Add Vehicle
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Tour Guides" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                All Tour Guides
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Available Tour Guides
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">
                Add Tour Guide
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Tours" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">All Tours</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2">New Tour</NavDropdown.Item>

              <NavDropdown.Item href="#action/3.3">
                New Point of Interest
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#home">Rent Requests</Nav.Link>
            <NavDropdown title="Settings" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.2" href="/UpdateProfile">
                Profile
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#deets" onClick={handleLogout}>
              Log Out{" "}
            </Nav.Link>

            <Nav.Link eventKey={2} href="#memes">
              |
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}