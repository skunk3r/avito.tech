import React from 'react'
import Comments from './Comments.js'

export default function Modal({info, props, closeModal, send}) {
	const src = info[props.img.id] ? 
		info[props.img.id].url ? info[props.img.id].url :
		props.img.url : props.img.url

	function fetchComment() {
		const comment = document.body.querySelector('#input-comment').value || 'empy'

		fetch(`https://boiling-refuge-66454.herokuapp.com/images/${props.img.id}/comments`, {
			method: 'post', 
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({name: 'test', comment: comment})
		})
		/*.then(r => console.log(r))*/
		.catch(err => console.log(err))
	}

	return (
		<div className="modal">
			<div className="modal-body">
				<div className="modal-img">
					<img src={src} alt="pic" />
				</div>
				
				<Comments props={info} id={props.img.id} />

				<div className="close-button-wrapper">
					<button className="close-button" onClick={closeModal}>
						<img src="img/Close-button.png" alt="pic" />
					</button>
				</div>
				<form>
					<input 
						type="text" name="comment" 
						id="input-comment" 
						placeholder="Ваш комментарий" />
					<button className="send-button" 
						onClick={(e) => {
							e.preventDefault()
							fetchComment()
							send(props.img.id, document.body.querySelector('#input-comment').value)
							document.body.querySelector('#input-comment').value = ''
						}}>

						Отправить
					</button>
				</form>
			</div>
		</div>
	)
}
