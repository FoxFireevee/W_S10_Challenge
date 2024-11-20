import React, { useState } from 'react'
import { useGetPizzaOrdersQuery } from '../state/pizzaApi'

export default function OrderList() {
  const [currentSize, setCurrentSize] = useState('All')
  const { data: orders } = useGetPizzaOrdersQuery()
  console.log(orders)

  const filterSize = currentSize === 'All' ? orders : orders?.filter(order => order.size === currentSize)
  
  // console.log(filterSize('S'))

  // const filteredOrders = () => filterSize(currentSize)
  // console.log(filteredOrders())
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          filterSize?.map((order, index) => {
            return (
              <li key={index}>
                <div>
                  {/* {order.customer} ordered a size {order.size} with {order.toppings.length} {order.toppings.length === 1 ? 'topping' : 'toppings'}  */}
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
