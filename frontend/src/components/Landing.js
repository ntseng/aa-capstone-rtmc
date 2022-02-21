import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default function Landing() {
	const sessionUser = useSelector(state => state.session.user);

	if (sessionUser) return <Redirect to="/app/all" />;
	return (<></>)
}
