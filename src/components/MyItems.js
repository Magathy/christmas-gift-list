import React, { Fragment } from 'react'
import { dbRefs, useDatabase } from '../hooks/useDatabase'
import { unchoseItem } from './OtherLists'
import {ItemDisplay} from "./ItemDisplay"

export const MyItems = ({ user }) => {
  const { updateEntity: updateItem, entitiesArray } = useDatabase(dbRefs.items)

  const myList = entitiesArray.filter(
    (item) => item.taken && item.taken.userName === user.name
  )

  return myList.length ? (
    <>
      <table className="table is-fullwidth">
        <tbody>
          {myList.map((item) => (
            <tr>
              <td>Pour {item.userName}</td>
              <td><ItemDisplay item={item} /></td>
              <td>
                <button
                    onClick={() =>
                        updateItem({
                          uid: item.uid,
                          value: unchoseItem(item),
                        })
                    }
                    className="button is-danger is-outlined is-rounded is-small"
                >
                  <span className="icon is-small">❌</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <h3 className="title is-3">Pas encore de cadeaux choisis</h3>
  )
}
