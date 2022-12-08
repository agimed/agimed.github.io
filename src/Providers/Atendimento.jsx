import { useReducer, createContext, useContext } from "react";


export const AtendimentoContext = createContext(null)

export function useAtendimentoContext() {
  return useContext(AtendimentoContext)
}

const initialState = {
  phases: [
    null,
    null,
    null,
    null,
  ]
}
function reducerFunction(state, action) {
  const {type, step, payload} = action
  switch(type) {
    case 'set':
      state.phases[step] = payload
      return state
    case 'clear-in-front':
      for(let i=step;i<state.phases.length;i++) {
        state.phases[i] = null
      }
      return state
    case 'reset':
      return initialState
  }
}


export function ProviderAtendimento({children}) {
  const [state, dispatch] = useReducer(reducerFunction, initialState)
  return <AtendimentoContext.Provider value={[state, dispatch]}>
    {children}
  </AtendimentoContext.Provider>
}