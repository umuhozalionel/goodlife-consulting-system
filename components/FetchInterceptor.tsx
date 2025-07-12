"use client"
import { useEffect } from "react"

export default function FetchInterceptor() {
  useEffect(() => {
    const originalFetch = window.fetch.bind(window)

    window.fetch = async (...args) => {
      const [resource] = args
      if (
        typeof resource === "string" &&
        resource.includes("/api/role?uid=THE_UID")
      ) {
        console.warn("🕵️‍♂️ Detected bad /api/role call:", resource)
        console.trace("Stack trace for bad fetch:")
      }
      return originalFetch(...args)
    }

    // cleanup on unmount
    return () => {
      window.fetch = originalFetch
    }
  }, [])

  return null
}