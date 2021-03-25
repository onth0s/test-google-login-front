import axios from 'axios';
import joinURL from 'url-join';

const SERVER_URL = 'http://localhost:8080';

export const getUserData = async (credentials) => {
	try {
		const { data: userData } = await axios({
			method: 'POST',
			url: joinURL(SERVER_URL, 'login'),
			data: credentials,
		});
		
		return userData.data;
	} catch(err) {
		console.log('Axios Error retrieving user data: ');
		console.log(err);
	}
}

export const addText = async (credentials, text) =>  {
	try {
		await axios({
			method: 'POST',
			url: joinURL(SERVER_URL, 'push-arr'),
			data: {
				email: credentials,
				text
			}
		});
	} catch(err) {
		console.log('Axios Error: ');
		console.log(err);
	}
}

export const clearUserData = async (credentials) => {
	try {
		await axios({
			method: 'DELETE',
			url: joinURL(SERVER_URL, '/clear-all'),
			data: credentials
		})
	} catch(err) {
		console.log(`Axios Error clearing user data: `);
		console.log(err);
	}
}

export const deleteOne = async (credentials, index) => {
	try {
		await axios({
			method: 'delete',
			url: joinURL(SERVER_URL, 'clear-one'),
			data: {
				email: credentials,
				index
			}
		});
	} catch (err) {
		console.log('Axios Delete Error');
		console.log(err);
	}
}
