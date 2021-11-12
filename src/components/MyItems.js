import React from 'react'
import { dbRefs, useDatabase } from '../hooks/useDatabase'
import { unchoseItem } from './OtherLists'
import { ItemTableList } from './ItemTableList'

export const MyItems = ({ user }) => {
  const { updateEntity: updateItem, entitiesArray } = useDatabase(dbRefs.items)

  const myList = entitiesArray.filter(
    (item) => item.taken && item.taken.userName === user.name
  )

  const removeItem = (item) =>
    updateItem({
      uid: item.uid,
      value: unchoseItem(item),
    })

  return myList.length ? (
    <ItemTableList items={myList} removeItem={removeItem} isToSomeone />
  ) : (
    <h3 className="title is-3">Pas encore de cadeaux choisis</h3>
  )
}
