import React from "react"
import { useState, useContext } from "react"
import { TextFieldContext } from "../App"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"

const TextFieldStyle = { backgroundColor: "white", width: "32rem" }

export default function CountrySelect() {
  // this is for storing previous search strings
  const [queries, setQueries] = useState([])

  let { photos, setPhotos, search, setSearch, pageNumber, setPageNumber } =
    useContext(TextFieldContext)

  function handleChange(e) {
    window.scrollTo(0, 0)
    setPageNumber(1)
    setSearch(e.target.value)
  }

  function handleKeyDown(e) {
    if (e.key == "Enter") {
      setSearch(e.target.value)
      setQueries((prevQueries) => {
        return [...new Set([...prevQueries, e.target.value])]
      })
    }
  }

  return (
    <>
      <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={queries}
        renderInput={(params) => (
          <TextField
            label="Search for images"
            variant="filled"
            sx={TextFieldStyle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: "search",
            }}
          />
        )}
      />
      {/* <TextField
        id="filled-basic"
        label="Search for images"
        variant="filled"
        sx={TextFieldStyle}
        onChange={handleChange}
      /> */}
    </>
  )
}
