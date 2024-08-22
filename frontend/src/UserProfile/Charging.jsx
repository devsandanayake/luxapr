import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Charging() {

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const value = queryParams.get('adCode')
   
  return (
    <div></div>
  )
}
