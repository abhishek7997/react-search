import React, { useState, useEffect, useRef, useCallback } from "react"
import { CssBaseline, AppBar, Typography, Toolbar } from "@mui/material"
import CountrySelect from "./components/SearchBox"
import PhotosGrid from "./components/PhotosGrid"
import { fetchData } from "./utils/GetImages"

export const PhotosContext = React.createContext()
export const TextFieldContext = React.createContext()
export const PageNumber = React.createContext(1)

const AppBarStyles = {
  appbar: {
    background: "gray",
    py: 2,
  },
  toolbar: {
    flexDirection: "column",
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    mb: 2,
  },
}

function TopHeader() {
  return (
    <>
      <AppBar position="static" sx={AppBarStyles.appbar}>
        <Toolbar sx={AppBarStyles.toolbar}>
          <Typography variant="h6" sx={AppBarStyles.title}>
            Search Photos
          </Typography>
          <CountrySelect />
        </Toolbar>
      </AppBar>
      <AppBar position="fixed" sx={AppBarStyles.appbar}>
        <Toolbar sx={AppBarStyles.toolbar}>
          <Typography variant="h6" sx={AppBarStyles.title}>
            Search Photos
          </Typography>
          <CountrySelect />
        </Toolbar>
      </AppBar>
    </>
  )
}

export default function CenteredTextAppBar() {
  const [photos, setPhotos] = useState([])
  const [search, setSearch] = useState("")
  const [pageNumber, setPageNumber] = useState(1)

  useEffect(async () => {
    const items = await fetchData(search, pageNumber)
    setPhotos((prevItems) => {
      if (!prevItems) return [...prevItems, ...items.hits]
      return [...items.hits]
    })
    // console.log(items)
  }, [])

  useEffect(async () => {
    // setPageNumber(1)
    const items = await fetchData(search, pageNumber)
    // setHasMore(items.totalHits > pageNumber)
    setPhotos((prevItems) => {
      if (!prevItems) return [...prevItems, ...items.hits]
      return [...items.hits]
    })
  }, [search, pageNumber])

  return (
    <>
      <PhotosContext.Provider value={{ photos }}>
        <TextFieldContext.Provider
          value={{
            photos,
            setPhotos,
            search,
            setSearch,
            pageNumber,
            setPageNumber,
          }}
        >
          <CssBaseline />
          <TopHeader />
          <PhotosGrid />
        </TextFieldContext.Provider>
      </PhotosContext.Provider>
    </>
  )
}
