import React from 'react'
import GalleryItem from './GalleryItem.js'

export default function Gallery({props, openModal}) {
	
	return (
		<div id="gallery">
			<div id="gallery-inner">
				{props.map(item => <GalleryItem prop={item} openModal={openModal} key={item.id} />)}
			</div>
		</div>
	)
}
