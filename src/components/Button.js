import React from 'react'

export default function Button({onClick}) {
	return (
		<div>
			<button className="sm-button" onClick={() => onClick()}>Show more</button>
		</div>
	)
}
