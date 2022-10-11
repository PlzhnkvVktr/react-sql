import axios from 'axios'
import React from 'react'

export const UserItem = ({firstName, middleName, lastName, id}) => {

  const remove = () => {
    console.log(id)
  }

  return (
    <div className='user__item'>
        <div>
          <p>{firstName}</p>
          <p>{middleName}</p>
          <p>{lastName}</p>
        </div>
        <button onClick={remove}>&times;</button>
    </div>
  )
}
