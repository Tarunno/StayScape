import { useEffect, useState } from "react"

const Message = ({message}) => {

  const [localMessage, setLocalMessage] = useState(message)
  
  useEffect(() => {
    setLocalMessage(message)
  }, [message])

  return (
    <div className={localMessage.type}>
      <p>{localMessage.payload}</p>
    </div>
  )
}

export default Message