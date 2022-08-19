export type Message = string

export type Severity =  'success' | 'info' | 'warning' | 'error'
interface Snackbar {
  open: boolean,
  message?: Message,
  severity?: Severity
}
export interface Payload {
  message: Message,
  severity: Severity
}

interface SnackbarAction {
  type: 'ON' | 'OFF'
  payload?:Payload
}
const initialState:Snackbar =
  {
    open:false,
  }


export function snackbarReducer(state: unknown=initialState, action:SnackbarAction):Snackbar {
  switch (action.type) {
    case "ON":
      return {open: true, ...action.payload}
    case "OFF":
      return {open: false}
    default:
      throw new Error()
  }
}

export function createSnackbar(reducer: any) {

  let currentState: any = initialState
  let handler: Function[] = []
  let currentReducer = reducer
  let listeners: Function[] = []


  const getState = () => currentState

  const dispatch = (action: SnackbarAction): SnackbarAction => {
    for (const h of handler) {
      if (typeof h === 'function') h()
    }
    // const [reducer, actions] = action.type.split('.')
    // console.log(reducer, actions, currentReducer[reducer](currentState, actions))
    currentState = reducer(currentState, action)
    for (const r of listeners) {
      if(typeof r === 'function') {
        r(currentState)
      }
    }

    return action
  }
  const subscribe = (listener: Function) => {
    handler.push(listener)

  }
  const setListener = (listener: Function) => {
    listeners.push(listener)
  }

  const resetListener = () => {
    listeners = []
  }

  return {
    getState,
    dispatch,
    subscribe,
    setListener,
    resetListener
  }
}


