import React from 'react'

export default function Comments({props, id}) {
	const comments = props[id] ? props[id].comments ? props[id].comments : null : null

	return (
		<div className="comments">
			{
				comments ? comments.length > 0 ? comments.map(item => {
					let date = new Date(item.date)
					let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
					let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
					let year = date.getFullYear()
					
					return (
						<div className="comment" key={item.id}>
							<p className="comment-date">{`${day}.${month}.${year}`}</p>
							<p className="comment-text">{item.text}</p>
						</div>
					)}) : <p className="comment">Нет комментариев</p> : <p className="comment">Нет комментариев</p>
			}
		</div>
	)
}
