import {combineReducers} from "@reduxjs/toolkit";

const initialState = {
  counter: 0
}

export function counter(state: any = initialState, action: { type: 'INCREMENT' | 'DECREMENT', state: any }) {
  console.log(action,'court!')
  if (typeof state === 'undefined') {
    state = 0 // 상태가 undefined이면 기본값으로 초기화합니다.
  }
  if (action.type === 'INCREMENT') {
    console.log('INCREMENT',state)
    return state.counter + 1
  } else if (action.type === 'DECREMENT') {
    return state.counter - 1

  } else {
    return state.counter // 정해놓지 않은 액션인 경우
  }
}

const initialState2 = {
  counter2: 0
}

export function counter2(state: any=initialState2, action: { type: 'INCREMENT' | 'DECREMENT', state: any }) {
  if (typeof state === 'undefined') {
    state = 0 // 상태가 undefined이면 기본값으로 초기화합니다.
  }
  if (action.type === 'INCREMENT') {
    console.log('cnt2 INCREMENT',state)
    return state.counter2 + 1
  } else if (action.type === 'DECREMENT') {
    return state.counter2 - 1
  } else {
    return state.counter2 // 정해놓지 않은 액션인 경우
  }
}


// 상태
export function customCreateStore(reducer: any) {

  let currentState: any
  let handler: Function[] = []
  let currentReducer = reducer

  console.log('currentReducer',currentReducer)

  const getState = () => currentState

  const dispatch = (action: any) => {
    console.log(action)
    for (const h of handler) {
      if (typeof h === 'function') h()
    }
    const [reducer, actions] = action.type.split('.')
    // console.log(reducer, actions, currentReducer[reducer](currentState, actions))
    currentState = {
      ...currentReducer,
      [reducer]: currentReducer[reducer](currentState, {...action,type:actions})
    }
    console.log(currentState)
    return action
  }
  const subscribe = (listener: Function) => {
    handler.push(listener)
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}


export default {}