import React, {Fragment} from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Nav,
	Navbar,
	NavbarBrand,
	NavItem,
	NavLink,
	UncontrolledDropdown
} from 'reactstrap';

const Toolbar = ({user, logout}) => {
	return (
		<Navbar color="dark" dark>
			<NavbarBrand tag={RouterNavLink} to="/">Artists</NavbarBrand>

			<Nav className="ml-auto">
				{
					user ?

						<Fragment>
							<NavItem>
								<NavLink tag={RouterNavLink} to="/track_history" exact>TrackHistory</NavLink>
							</NavItem>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									Hello, {user.username}!
								</DropdownToggle>
								<DropdownMenu right>
									<DropdownItem>
										View profile
									</DropdownItem>
									<DropdownItem divider />
									<DropdownItem onClick={logout}>
										Logout
									</DropdownItem>
								</DropdownMenu>
							</UncontrolledDropdown>
						</Fragment>

						:
						<Fragment>
							<NavItem>
								<NavLink tag={RouterNavLink} to="/register" exact>Register</NavLink>
							</NavItem>
							<NavItem>
								<NavLink tag={RouterNavLink} to="/login" exact>Login</NavLink>
							</NavItem>
						</Fragment>
				}

			</Nav>
		</Navbar>
	);
};

export default Toolbar;
