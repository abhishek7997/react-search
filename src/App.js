import React, { useState, useRef, useCallback } from "react"
import { CssBaseline, AppBar, Typography, Toolbar } from "@mui/material"
import CountrySelect from "./components/SearchBox"
import PhotosGrid from "./components/PhotosGrid"
import useImageSearch from "./utils/GetImages"

export const PhotosContext = React.createContext()
export const TextFieldContext = React.createContext()
export const PageNumber = React.createContext(1)

const AppBarStyles = {
  appbar: {
    background: "#2c3e50",
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
  const [search, setSearch] = useState("")
  const [pageNumber, setPageNumber] = useState(1)
  const { photos, hasMore, loading, error } = useImageSearch(search, pageNumber)

  const observer = useRef()
  const lastImageElementRef = useCallback(
    (node) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  return (
    <>
      <PhotosContext.Provider value={{ photos, lastImageElementRef }}>
        <TextFieldContext.Provider
          value={{
            photos,
            search,
            setSearch,
            pageNumber,
            setPageNumber,
          }}
        >
          <CssBaseline />
          <TopHeader />
          <PhotosGrid />
          <div>{loading && "Loading..."}</div>
          <div>{error && "Error!!"}</div>
        </TextFieldContext.Provider>
      </PhotosContext.Provider>
    </>
  )
}
