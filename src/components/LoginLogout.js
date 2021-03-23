import GoogleLogin from 'react-google-login';
import { Button } from '@material-ui/core';

import { getUserData } from '../services/serverQueries.js';

const LoginLogout = ({
	userInfo, setUserInfo,
	setDataList
}) => {
	const handleLogin = async ({ profileObj, tokenObj }) => {
		setUserInfo({
			name: profileObj.name,
			email: profileObj.email,
			img: profileObj.imageUrl
		});
		setDataList([]);
		 
		const userData = await getUserData({
			token: tokenObj.id_token,
			user: {
				firstName: profileObj.givenName,
				lastName: profileObj.familyName,
				email: profileObj.email
			}
		});
		setDataList(userData);
	}
	const handleLoginError = (err) => {
		console.log('Login Error:');
		console.log(err);
	}
	const handleLogout = () => {
		// TODO remove JWT Refresh Token from the database  
	
		setUserInfo({});
		setDataList([]);
	}

	return (<div className="login-logout">
		<GoogleLogin className="google-login"
			clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
			buttonText="Log in with Google"
			onSuccess={handleLogin}
			onFailure={handleLoginError}
			cookiePolicy={'single_host_origin'}
		></GoogleLogin>

		{userInfo.name && <div className="logout">
			<Button onClick={handleLogout}>Logout</Button>
		</div>}
	</div>);
}

export default LoginLogout;
