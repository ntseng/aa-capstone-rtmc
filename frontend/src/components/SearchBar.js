import ProfileButton from "./ProfileButton";

export default function SearchBar({ user }) {
	return (<div>
		<div>
			<button>hamburger</button>
		</div>
		<div>
			<input type="text"></input>
		</div>
		<div>
			<ProfileButton user={user} />
		</div>
	</div>)
}
