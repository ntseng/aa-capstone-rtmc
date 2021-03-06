import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../store/session';
import "./css/ProfileButton.css";

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout()).then(() => {
			history.push("/");
		});
	};

	return (
		<>
			<button id="profile-button"
				onClick={openMenu}
			>
				<i className="fa-solid fa-user-circle" />
			</button>
			{showMenu && (
				<div className="profile-dropdown">
					<div id="profile-container">
						<img id="avatar-img" src={user.avatarURL} alt="user avatar" />
						<span>
							<div>{user.username}</div>
							<div>{user.email}</div>
						</span>
					</div>
					<hr />
					<div>
						<button id="sign-out-button"
							onClick={logout}>Sign Out</button>
					</div>
				</div>
			)}
		</>
	);
}

export default ProfileButton;
