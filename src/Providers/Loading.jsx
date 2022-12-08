import { createContext } from "react"
import { useContext } from "react"
import { useState } from "react"
import './loading.css'

const LoadingContext = createContext(false)

export function useLoadingContext() {
  return useContext(LoadingContext)
}

export function LoadingComponentProvider({ children }) {
  const [loading, setLoading] = useState(false)

  return (
    <LoadingContext.Provider value={[loading, setLoading]}>
      {
        loading ? (
          <div className="loading">
            <div className='uil-ring-css' >
              <div></div>
            </div>
          </div>
        ): null
      }
      {children}
    </LoadingContext.Provider>
  )

}