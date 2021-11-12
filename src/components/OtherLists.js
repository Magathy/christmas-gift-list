import React, { Fragment } from 'react'
import { dbRefs, useDatabase } from '../hooks/useDatabase'
import { groupBy, sortBy, prop, dissoc, pipe } from 'ramda'
import { ItemDisplay } from './ItemDisplay'

export const unchoseItem = (item) => pipe(dissoc('uid'), dissoc('taken'))(item)

export const OtherLists = ({ user }) => {
  const { updateEntity: updateItem, entitiesArray } = useDatabase(dbRefs.items)

  const lists = dissoc(
    user.name,
    Object.entries(
      groupBy(prop('userName'), sortBy(prop('userName'), entitiesArray))
    ).reduce((acc, [key, value]) => {
      return { ...acc, [key]: sortBy(prop('name'), value) }
    }, {})
  )

  const choseItem = (item) => {
    const newItem = dissoc('uid', item)
    return { ...newItem, taken: { userUid: user.uid, userName: user.name } }
  }

  return (
    <>
      <br />
      {Object.entries(lists).map(([key, values]) => (
        <Fragment key={key}>
          <h3 className="subtitle">Liste de {key}</h3>
          <table className="table is-fullwidth">
            <tbody>
              {values.map((item) => (
                <tr key={item.uid}>
                  <td>
                    <ItemDisplay item={item} hasTag />
                  </td>
                  <td>
                    {item.taken ? (
                      item.taken.userUid === user.uid ? (
                        <button
                          onClick={() =>
                            updateItem({
                              uid: item.uid,
                              value: unchoseItem(item),
                            })
                          }
                          className="button is-danger is-small"
                        >
                          Annuler le choix
                        </button>
                      ) : (
                        <span className="tag is-danger is-light">
                          Choisi par {item.taken.userName}
                        </span>
                      )
                    ) : (
                      <button
                        onClick={() =>
                          updateItem({
                            uid: item.uid,
                            value: choseItem(item),
                          })
                        }
                        className="button is-success is-small"
                      >
                        Choisir
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      ))}
    </>
  )
}
