import { useState } from 'react';

import { TextField, Button, Menu, MenuItem, Divider } from '@material-ui/core';

import { addText, deleteOne, clearUserData } from '../services/serverQueries.js';

const Data = ({
	userInfo,
	inputValue, setInputValue,
	dataList, setDataList
}) => {
	const [anchorEl, setAnchorEl] = useState(null);
	
	const handleClick = (e) => setAnchorEl(e.currentTarget);
	const handleClose = () => setAnchorEl(null);
	
	const handleSubmit = async (e) => {
		e.preventDefault();

		setInputValue('');

		if (!(inputValue.trim() === '')) {
			// const arr = dataList;
			// arr.unshift(inputValue);
			// TODO since when does this work???

			dataList.unshift(inputValue.trim());

			await addText(userInfo.email, inputValue.trim());
		}

		const input = document.querySelector(".material-input input");
		input.focus();
	}
	const handleDeleteOne = async (i) => {
		let arr = dataList;
		arr.splice(i, 1);

		await deleteOne(userInfo.email, i);

		setDataList([...arr]);
	}
	const handleClearAll = async () => {
		handleClose();
		
		await clearUserData({
			email: userInfo.email
		});

		setDataList([]);
	}

	return (<div className="user-info">
		<h2>
			Data
			{userInfo.name && <>
			<Button className="data-menu" 
				aria-controls="simple-menu" 
				aria-haspopup="true" 
				onClick={handleClick}>
			⋮</Button>

			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleClearAll}>
					<i className="fas fa-trash-alt"/>
					Clear All
				</MenuItem>
				<Divider />
				
				<MenuItem onClick={() => {
					handleClose();
				}}>
					<i className="fas fa-file-upload"/>
					Import JSON
				</MenuItem>

				<MenuItem onClick={() => {
					handleClose();
				}}>
					<i className="fas fa-file-download"/>
					Export JSON
				</MenuItem>
			</Menu></>}
		</h2>

		{userInfo.name && <>
		<form onSubmit={handleSubmit}>
			<TextField className="material-input"
				id="standard-basic"
				label="Some Text"
				autoComplete="off"
				spellCheck={false}
				value={inputValue}
				autoFocus={true}
				onChange={e => setInputValue(e.target.value)}
			/>

			<Button type="submit">ADD</Button>
		</form>

			{/* TODO Hacer que se copie el texto de un elemento de la lista cuanto se mantenga pulsado sobre este*/}
			{/* COPY ICON
			<i className="far fa-copy"></i> */}

			{/* TODO También puedo hacer que se queden seleccionados cuando pulsas sobre ellos y que se deseleccionen cuando pulsas enn cualquier otro sitio o como una opción de menú superior. Así se podrá implementar el 'borrar seleccionado' */}
			{dataList[0] && <div className="data-list">
				<ul>
					{dataList.map((val, i) => (
						<li key={i}>
							<p>{val}</p>
							
							<i className="far fa-times-circle"
								onClick={() => handleDeleteOne(i)}
							/>
						</li>
					))}
				</ul>
			</div>}
		</>}
	</div>);
}

export default Data;
