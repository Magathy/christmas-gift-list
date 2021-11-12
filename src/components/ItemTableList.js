import { ItemDisplay } from './ItemDisplay'
import React from 'react'

export const ItemTableList = ({ items, removeItem, isToSomeone }) => (
  <table className="table is-striped is-fullwidth">
    <tbody>
      {items.map((item) => (
        <tr key={item.uid}>
          <td>
            <ItemDisplay item={item} isToSomeone={isToSomeone} />
          </td>
          <td>
            <button
              onClick={() => removeItem(item)}
              className="button is-danger is-outlined is-rounded is-small"
            >
              <span className="icon is-small">❌</span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)
