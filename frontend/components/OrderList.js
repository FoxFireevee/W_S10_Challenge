import React, { useState } from 'react'
import { useGetPizzaOrdersQuery } from '../state/pizzaApi'

export default function OrderList() {
  const [currentSize, setCurrentSize] = useState('All')
  const { data: orders } = useGetPizzaOrdersQuery()
  console.log(orders)

  // PROBLEM: Test for filtering the sizes isn't passing despite being able to work the logic on the webpage smoothly
  // Possible Solution could be that because I am using useState I could be coding in a way the tests aren't expecting despite the logic working. I wonder if I am supposed to use an initalState and a reducer to solve this?
  const filterSize = currentSize === 'All' ? orders : orders?.filter(order => order.size === currentSize)

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filterSize?.map((order, index) => {
            return (
              <li key={index}>
                <div>
                  {/* {If there are toppings it works just fine but even one order that has no toppings in the array, it freaks out with the length error. So half solved? I read about and added in the ?. before the length to catch if it a length of 0 or not to try to save it. No avail though.} */}
                  {order.customer} ordered a size {order.size} with {(order.toppings?.length || 0)} {order.toppings?.length === 1 ? 'topping' : 'toppings'} 
                  {/* {Log throws error but returns desired result still} */}
                  {/* {console.log('order test', order.toppings.length)} */}
                </div>
              </li>
            )
          })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            // Original code line below for filtering the buttons (default only handled All) but I worked the logic instead using filterSize above
            // let className = `button-filter${size === `All` ? ' active' : ''}`
            return <button
              onClick={() => setCurrentSize(size)}
              data-testid={`filterBtn${size}`}
              className={`button-filter ${currentSize === size ? 'active' : ''}`}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
