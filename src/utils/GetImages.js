const url = `${process.env.REACT_APP_BASE_URL}?key=${process.env.REACT_APP_API_KEY}`

export const fetchData = async (search, pageNumber) => {
  let newurl = url
  if (search) newurl = `${url}&q=${search}&page=${pageNumber}`
  return fetch(newurl)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log("Fetcherr", err))
}
