export default function Gist({ index, className }: { index: any; className: any; }) {

	//const gistDescription = `\u0020${index?.description}`;
	const gistID = `\u0020${index?.id}`;
	const gistOwner = `\u0020${index?.owner.login}`;
	const gistCreatedAt = `\u0020${index?.created_at}`;

	return (
		<div className={`${className}`}>
			<b>ID:</b>{gistID}<br/>
			{/* <b>Description:</b>{gistDescription}<br/> */}
			<b>Owner:</b>{gistOwner}<br/>
			<b>Created At:</b>{gistCreatedAt}
		</div>
	);
};
