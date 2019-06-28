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
import config from '../../../config';

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
							<NavItem>
								<NavLink tag={RouterNavLink} to="/new_artist" exact>Add Artist</NavLink>
							</NavItem>
							<NavItem>
								<NavLink tag={RouterNavLink} to="/new_album" exact>Add Album</NavLink>
							</NavItem>
							<NavItem>
								<NavLink tag={RouterNavLink} to="/new_track" exact>Add Track</NavLink>
							</NavItem>
							<UncontrolledDropdown nav inNavbar>
								<DropdownToggle nav caret>
									{user.facebookId?
										<img className="avatar" src={'https://graph.facebook.com/' + user.facebookId + '/picture?type=large&width=720&height=720'} alt="avatar" width={40} height={40} /> :
										<img className="avatar" src={config.apiURL + '/uploads/defaultAvatar.jpeg'} alt="avatar" width={40} height={40}/>
									}
									Hello, {user.displayName || user.username}!
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
