import { useContext } from "react"
import DevTrackContext from "./devTrackStore"

export function useDevTrack() {
  const context = useContext(DevTrackContext)

  if (!context) {
    throw new Error(
      "useDevTrack must be used inside DevTrackProvider"
    )
  }

  return context
}