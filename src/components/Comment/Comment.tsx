export default function Comment({ index }: { index: any; }) {
	return (
		<>
			<div className="overflow-wrap-break-word bg-color-cadetblue container-padding-radius-10">
				<b>id:</b>&nbsp;{index?.id}
				<br/>
				<b>name:</b>&nbsp;{index?.name}
				<br/>
				<b>email:</b>&nbsp;{index?.email}
				<br/>
				<b>comment:</b>&nbsp;{index?.body}
			</div>
		</>
	);
};

//[
//	{
//		"postId": 1,
//		"id": 1,
//		"name": "id labore ex et quam laborum",
//		"email": "Eliseo@gardner.biz",
//		"body": "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium"
//	}
//]
