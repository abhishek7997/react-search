import React from "react"
import { useContext } from "react"
import { PhotosContext, TextFieldContext } from "../App"
import { makeStyles } from "@mui/styles"
import Modal from "@mui/material/Modal"
import ImageList from "@mui/material/ImageList"
import ImageListItem from "@mui/material/ImageListItem"
import Box from "@mui/material/Box"

const PhotoStyles = makeStyles({
  image: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "8px",
    margin: "8px",
  },
  modalstyle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
})

// All images are opening when clicking on any one image, must be fixed
const ModalImage = (props) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const classes = PhotoStyles()

  const { previewURL } = props
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={classes.modalstyle} style={{ width: "90vw" }}>
        <img src={previewURL}></img>
      </Box>
    </Modal>
  )
}

const Photo = (props) => {
  const { lastImageElementRef } = useContext(PhotosContext)

  if (!props.photos) {
    return null
  }

  function handleClick(e) {
    console.log("Image clicked!")
  }

  const items = props.photos.map(
    (photo, idx) => {
      if (props.photos.length === idx + 1) {
        return (
          <ImageListItem key={photo.id} ref={lastImageElementRef}>
            <img
              src={photo.webformatURL}
              loading="lazy"
              onClick={(e) => handleClick(e)}
            />
            <ModalImage previewURL={photo.previewURL} />
          </ImageListItem>
        )
      } else {
        return (
          <ImageListItem key={photo.id}>
            <img
              src={photo.webformatURL}
              loading="lazy"
              onClick={(e) => handleClick(e)}
            />
            <ModalImage previewURL={photo.previewURL} />
          </ImageListItem>
        )
      }
    }
    // <div key={photo.id} className={classes.image}>
    //   <img src={photo.previewURL}></img>
    //   <ModalImage previewURL={photo.webformatURL} />
    // </div>
  )
  return items
}

export default function PhotosGrid() {
  const { photos } = useContext(PhotosContext)
  // console.log(photos)

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <ImageList sx={{ width: "80vw" }} cols={3} gap={32}>
        <Photo photos={photos} />
      </ImageList>
    </Box>

    // <Box
    //   sx={{
    //     display: "grid",
    //     columnGap: 1,
    //     rowGap: 1,
    //     gridTemplateColumns: "repeat(3, 1fr)",
    //     width: "100vw",
    //   }}
    // >
    //   <Photo photos={photos} />
    // </Box>
  )
}
