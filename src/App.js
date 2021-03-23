import { useState } from 'react';

import LoginLogout from './components/LoginLogout.js';
import UserInfo    from './components/UserInfo.js';
import Data        from './components/Data.js';
import Credits     from './components/Credits.js';

function App() {
	const [userInfo, setUserInfo] = useState({});

	const [inputValue, setInputValue] = useState('');
	const [dataList, setDataList] = useState([]);

	return (
		<div className="container">
			<LoginLogout
				userInfo={userInfo} setUserInfo={setUserInfo}
				setDataList={setDataList} />

			<UserInfo userInfo={userInfo} />

			<Data
				userInfo={userInfo}
				inputValue={inputValue} setInputValue={setInputValue}
				dataList={dataList}     setDataList={setDataList} />

			<Credits />
		</div>
	);
}

export default App;
