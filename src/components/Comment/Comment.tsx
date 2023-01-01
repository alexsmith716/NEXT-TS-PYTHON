export default function Comment({ index, className }: { index: any; className: any; }) {

	let commentId = `\u0020${index?.id}`;
	let commentName = `\u0020${index?.name}`;
	let commentEmail = `\u0020${index?.email}`;
	let commentBody = `\u0020${index?.body}`;

	return (
		<div className={`${className}`}>
			<b>id:</b>{commentId}<br/>
			<b>name:</b>{commentName}<br/>
			<b>email:</b>{commentEmail}<br/>
			<b>comment:</b>{commentBody}
		</div>
	);
};
