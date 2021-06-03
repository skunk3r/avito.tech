import React, {useState, useEffect} from 'react'
import Loader from './components/Loader.js'
import Gallery from './components/Gallery.js'
import Modal from './components/Modal.js'
import Button from './components/Button.js'

function App() {
  const [loading, setLoading] = useState(true)
  const [images, setImages] = useState([])
  const [modal, setModal] = useState({status: false})
  const [info, setInfo] = useState({})
  const [buttonStatus, setButtonStatus] = useState(true)

  function getNewImages() {
    let newImages = []
    let oldUrl = images[images.length-1].url
    let idIndex = oldUrl.indexOf('id/') + 3
    let newUrlStart = oldUrl.slice(0, idIndex)
    let newUrlEnd = oldUrl.slice(oldUrl.indexOf(`/`, idIndex))
    const obj = {}

    for (let i = 1; i < 7; i++) {
      newImages.push({
        id: 150 + i,
        url: newUrlStart + (150 + i) + newUrlEnd
      })
    }

    setImages(images.concat(newImages))
    setButtonStatus(false)
    
    newImages.forEach(item => {
      fetch(`https://boiling-refuge-66454.herokuapp.com/images/${item.id}`)
      .then(response => response.json())
      .then(json => obj[item.id] = {url: json.url, comments: json.comments})
      .catch(err => {
        console.log(err)
        addComment(info, item.id)
      })
    })
  }

  function getImages() {
    const obj = {}

    fetch('https://boiling-refuge-66454.herokuapp.com/images')
    .then(response => response.json())
    .then(json => {
      setImages(json)
      setLoading(false)
      return json
     }).then(json => {
      json.forEach(item => {
        fetch(`https://boiling-refuge-66454.herokuapp.com/images/${item.id}`)
        .then(response => response.json())
        .then(json => obj[json.id] = {url: json.url, comments: json.comments})
      })
    })
    .then(setInfo(obj))
    .catch(err => {
      console.log(err)
      setLoading(false)
    })
  }

  useEffect(() => getImages(), [])

  function sendComment(id, comment) {
    setInfo(addComment(info, id, comment))
  }

  function addComment(obj, id, comment) {
    let newObj = {}
    
    for (let key in obj) {
      newObj[key] = obj[key]
    }

    if (newObj[id]) newObj[id].comments.push({id:Date.now(), text:comment, date:Date.now()})
      else {
        newObj[id] = {
          url: '', comments: [{id:Date.now(), text:comment, date:Date.now()}]
        }
      }
    
    return newObj
  }

  function openModal(img) {
    setModal({status: true, img: img})
    document.body.classList.add('activated-modal')
  }

  function closeModal() {
    setModal({status: false, img: null})
    document.body.classList.remove('activated-modal')
  }

  return (
    <div className="wrapper">
      <header>Gallery App</header>

      {loading && <Loader />}

      {
        images.length > 0 ? <Gallery props={images} openModal={openModal} /> : 
        loading ? null : <p>error</p>
      }

      {
        modal.status && <Modal
        info={info} 
        props={modal} 
        closeModal={closeModal} 
        send={sendComment} />
      }

      {!loading && buttonStatus && <Button onClick={getNewImages}/>}

    </div>
  )
}

export default App;
