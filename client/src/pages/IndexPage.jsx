import { useEffect } from "react"

const IndexPage = () => {

  useEffect(() => {
    document.title = 'StayScape | Home'
  }, [])

  return (
    <div>
      <h1>Index page</h1>
    </div>
  )
}

export default IndexPage