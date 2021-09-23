import React from "react"
import { useState, useContext } from "react"
import { PhotosContext } from "../App"
import Modal from "@mui/material/Modal"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import Box from "@mui/material/Box"

const modalstyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

// All images are opening when clicking on any one image, must be fixed
const ModalImage = (props) => {
  const { image, open, onClose } = props

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalstyle}>
        <img src={image} alt=""></img>
      </Box>
    </Modal>
  )
}

const Photo = (props) => {
  const { lastImageElementRef } = useContext(PhotosContext)

  if (!props.photos) {
    return null
  }

  const { handleOpen } = props

  const items = props.photos.map((photo, idx) => {
    if (props.photos.length === idx + 1) {
      return (
        <ImageListItem key={photo.id} ref={lastImageElementRef}>
          <img
            src={photo.webformatURL}
            loading="lazy"
            alt={photo.title}
            onClick={() => handleOpen(photo.webformatURL)}
          />
        </ImageListItem>
      )
    } else {
      return (
        <ImageListItem key={photo.id}>
          <img
            src={photo.webformatURL}
            alt={photo.title}
            loading="lazy"
            onClick={() => handleOpen(photo.webformatURL)}
          />
        </ImageListItem>
      )
    }
  })
  return items
}

export default function PhotosGrid() {
  const { photos } = useContext(PhotosContext)

  const [open, setOpen] = useState(false)
  const [currentImg, setCurrentImg] = useState("")
  const handleOpen = (img) => {
    setCurrentImg(img)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <ImageList sx={{ width: "80vw" }} cols={3} gap={32}>
          <Photo photos={photos} open={open} handleOpen={handleOpen} />
        </ImageList>
      </Box>
      <ModalImage image={currentImg} open={open} onClose={handleClose} />
    </>
  )
}
