import React from 'react';

const delUser = async (reState,e) => {
	const id = e.currentTarget.id
	await fetch('http://localhost:9292/users/' + id, {
	// 	credentials: 'include',
	method: "DELETE"
	});

	reState();
}

function DeleteUser({id, reState}) {
	return (
		<button id={id} onClick={delUser.bind(null,reState)}>Delete</button>
	);
}

export default DeleteUser;