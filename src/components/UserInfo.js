const UserInfo = ({ userInfo }) => {
	return (
	<div className="user-info">
		<h2>User Info</h2>
		{userInfo.name && <div className="user-info-data">
			<p>Name</p>
			<p>{userInfo.name}</p>

			<p>Email</p>
			<p>{userInfo.email}</p>
		</div>}

		{userInfo.name && <img src={userInfo.img} alt="User Profile" />}
	</div>
	);
}

export default UserInfo;
