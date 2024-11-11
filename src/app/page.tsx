'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [jsonData, setJsonData] = useState(String)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3001/api/Monkey")
      const data = await response.json()
      console.log(data)
      setJsonData(data)
    }

    fetchData()
  })

  return (
    <div>
      {jsonData ? JSON.stringify(jsonData): "Loading..."}
    </div>
  )
}