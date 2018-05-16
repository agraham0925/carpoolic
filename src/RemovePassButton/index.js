import React from 'react'

const remPass = async (reState,e) => {
	const id = e.currentTarget.id.split('_')
	const userId = id[0];
	const rideId = id[1];
	console.log(rideId,userId,"remove passenger");
	const responseJSON = await fetch('http://localhost:9292/rides/'+rideId+'/removeuser/'+userId,{
		credentials: 'include'
	});

	const response = await responseJSON.json();

	reState(response);
}

function RemovePassButton({userId, rideId, reState}) {
	return (
		<button id={userId+"_"+rideId} onClick={remPass.bind(null,reState)}>X</button>
	);
}

export default RemovePassButton;