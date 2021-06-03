import React from 'react'

export default function GalleryItem({prop, openModal}) {
	
	return (
		<div className="img-wrapper">
			<img src={prop.url} alt="pic" onClick={() => openModal(prop)} />
		</div>
	)
}
