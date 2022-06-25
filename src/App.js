import React, { useState, useRef, useCallback } from "react"
import { CssBaseline, AppBar, Typography, Toolbar, Link } from "@mui/material"
import SearchQueries from "./components/SearchBox"
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

const TopHeader = () => {
  return (
    <>
      <AppBar position="sticky" sx={AppBarStyles.appbar}>
        <Toolbar sx={AppBarStyles.toolbar}>
          <Typography variant="h5" sx={AppBarStyles.title}>
            <Link
              href="https://github.com/abhishek7997/react-search"
              color="inherit"
              variant="h5"
              underline="hover"
              target="_blank"
              rel="noreferrer"
            >
              Photos Finder
            </Link>{" "}
            - by{" "}
            <Link
              href="https://github.com/abhishek7997/"
              color="inherit"
              variant="h5"
              underline="hover"
              target="_blank"
              rel="noreferrer"
            >
              M.Abhishek
            </Link>
          </Typography>
          <SearchQueries />
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
