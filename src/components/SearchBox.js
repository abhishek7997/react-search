import React from "react"
import { useState, useEffect, useContext } from "react"
import { TextFieldContext } from "../App"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"
import Container from "@mui/material/Container"
import Button from "@mui/material/Button"

const TextFieldStyle = { backgroundColor: "white", width: "32rem" }

export default function CountrySelect() {
  // this is for storing previous user input search strings
  const [queries, setQueries] = useState([])
  let { setSearch, setPageNumber } = useContext(TextFieldContext)

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("queries")) ?? []
    setQueries(data)
  }, [])

  function handleChange(e) {
    e.preventDefault()
    window.scrollTo(0, 0)
    setPageNumber(1)
    setSearch(e.target.value)
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      setSearch(e.target.value)
      setQueries((prevQueries) => {
        let items = [...new Set([...prevQueries, e.target.value])]
        localStorage.setItem("queries", JSON.stringify(items))
        return items
      })
    }
  }

  function clearAll() {
    localStorage.removeItem("queries")
    setQueries([])
  }

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Autocomplete
          sx={{ display: "inline-block" }}
          freeSolo
          disablePortal
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
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
        <Button
          sx={{
            ml: "18px",
            backgroundColor: "#34495e",
            "&:hover": {
              backgroundColor: "#7f8c8d",
            },
          }}
          variant="contained"
          onClick={clearAll}
        >
          Clear All
        </Button>
      </Container>
    </>
  )
}
