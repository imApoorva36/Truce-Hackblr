"use client"

import { useEffect, useState } from "react"

export default function Home() {
  let [ teams, setTeams ] = useState([])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/teams/")
    .then(res => res.json())
    .then(data => console.log(data))
  })

  return (
    <h1>Home page!</h1>
  );
}
