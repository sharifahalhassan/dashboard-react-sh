import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Loader from "./Loader"

export default function NavigationLoader() {
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true)

    // وقت بسيط عشان الانتقال يكون ناعم
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 400)

    return () => clearTimeout(timeout)
  }, [location.pathname])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <Loader size="lg" color="light" />
    </div>
  )
}
