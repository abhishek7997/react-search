import { useState, useEffect } from "react"
import axios from "axios"

const url = `${process.env.REACT_APP_BASE_URL}?key=${process.env.REACT_APP_API_KEY}`

export const fetchData = async (search, pageNumber) => {
  let newurl = url
  if (search) newurl = `${url}&q=${search}&page=${pageNumber}`
  return fetch(newurl)
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log("Fetcherr", err))
}

export default function useImageSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [photos, setPhotos] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setPhotos([])
  }, [query])

  //let newurl = url
  //if (query) newurl = `${url}&q=${query}&page=${pageNumber}`
  useEffect(() => {
    setLoading(true)
    setError(false)
    let cancel
    axios({
      method: "GET",
      url: url,
      params: { q: query, page: pageNumber },
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPhotos((prevPhotos) => {
          return [...prevPhotos, ...res.data.hits]
        })
        setHasMore(res.data.totalHits > 0)
        setLoading(false)
        console.log(res.data)
      })
      .catch((e) => {
        if (axios.isCancel(e)) return
        setError(true)
      })
    return () => cancel()
  }, [query, pageNumber])
  return { loading, error, photos, hasMore }
}
