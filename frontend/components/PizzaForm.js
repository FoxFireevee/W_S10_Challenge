import React, { useReducer } from 'react'
import { useCreatePizzaOrderMutation } from '../state/pizzaApi'

const CHANGE_INPUT = 'CHANGE_INPUT'
const CHANGE_SIZE = 'CHANGE_SIZE'
const CHANGE_TOPPING_SELECTION = 'CHANGE_TOPPING_SELECTION'
const RESET_FORM = 'RESET_FORM'

const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name, value } = action.payload
      return { ...state, [name]: value}
    }
    case CHANGE_SIZE: {
      const { name, value } = action.payload
      return { ...state, [name]: value}
    }
    case CHANGE_TOPPING_SELECTION: {
      return { ...state, [action.id]: !state[action.id]}
    }
    case RESET_FORM:
      return { 
        fullName: '',
        size: '',
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
      }
    default: 
      return state
    }
  }


export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState)
  const [createPizzaOrder, { error: creationError, isLoading: creatingPizzaOrder }] = useCreatePizzaOrderMutation()
  const onChangeName = ({ target: { name, value } }) => {
    dispatch({ type: CHANGE_INPUT, payload: { name, value } })
  }
  const onChangeSize = ({ target: { name, value } }) => {
    dispatch({ type: CHANGE_SIZE, payload: { name, value } })
  }
  const onChangeTopping = (id) => {
    dispatch({ type: CHANGE_TOPPING_SELECTION, id })
  }
  const resetForm = () => {
    dispatch({ type: RESET_FORM })
  }
  const onNewOrder = (evt) => {
    evt.preventDefault()
    console.log(state)
    createPizzaOrder(state)
      .unwrap()
      .then(data => {
        console.log(data)
        resetForm()
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <form onSubmit={onNewOrder}>
      <h2>Pizza Form</h2>
      {creatingPizzaOrder && <div className='pending'>Order in progress...</div>}
      {creationError && <div className='failure'>Order failed: fullName is required</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            onChange={onChangeName}
            value={state.fullName}
            placeholder="Type full name"
            type="text"
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" onChange={onChangeSize}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input 
            data-testid="checkPepperoni" 
            checked={state[1]}
            onChange={() => onChangeTopping(1)}
            name="1" 
            type="checkbox" />
          Pepperoni<br /></label>
        <label>
          <input 
            data-testid="checkGreenpeppers" 
            checked={state[2]}
            onChange={() => onChangeTopping(2)}
            name="2" 
            type="checkbox" />
          Green Peppers<br /></label>
        <label>
          <input 
            data-testid="checkPineapple" 
            checked={state[3]}
            onChange={() => onChangeTopping(3)}
            name="3" 
            type="checkbox" />
          Pineapple<br /></label>
        <label>
          <input 
            data-testid="checkMushrooms" 
            checked={state[4]}
            onChange={() => onChangeTopping(4)}
            name="4" 
            type="checkbox" />
          Mushrooms<br /></label>
        <label>
          <input 
            data-testid="checkHam" 
            checked={state[5]}
            onChange={() => onChangeTopping(5)}
            name="5" 
            type="checkbox" />
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
