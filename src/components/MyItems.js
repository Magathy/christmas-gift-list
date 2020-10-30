import React, { Fragment } from 'react'
import { dbRefs, useDatabase } from '../hooks/useDatabase'
import { unchoseItem } from './OtherLists'

export const MyItems = ({ user }) => {
  const { updateEntity: updateItem, entitiesArray } = useDatabase(dbRefs.items)

  const myList = entitiesArray.filter(
    (item) => item.taken && item.taken.userName === user.name
  )

  return myList.length ? (
    <>
      <h3 className="title is-3">Les cadeaux que j'ai choisi d'offrir</h3>
      <table className="table is-fullwidth">
        <tbody>
          {myList.map((item) => (
            <tr>
              <td>Pour {item.userName}</td>
              <td>{item.name}</td>
              <td>
                <button
                  onClick={() =>
                    updateItem({
                      uid: item.uid,
                      value: unchoseItem(item),
                    })
                  }
                  className="button is-danger is-small"
                >
                  Annuler mon choix
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
