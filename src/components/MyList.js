import React from 'react'
import { Form, Field } from 'react-final-form'
import { dbRefs, useDatabase } from '../hooks/useDatabase'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sortBy, prop, filter, pipe } from 'ramda'
import { ItemTableList } from './ItemTableList'

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  margin-bottom: 30px;
`

const Element = styled.div`
  margin-top: 12px;
`

export const MyList = ({ user }) => {
  const {
    addEntity: addItem,
    removeEntity: removeItem,
    entitiesArray,
  } = useDatabase(dbRefs.items)

  const handleRemoveItem = (item) => removeItem(item.uid)

  const { entitiesArray: usersList } = useDatabase(dbRefs.users)
  const otherUsersList = pipe(
    filter(({ uid }) => uid !== user?.uid),
    sortBy(prop('name'))
  )(usersList)

  const myItems = entitiesArray.filter(
    ({ userId, addedByUid }) =>
      userId === user?.uid && (!addedByUid || addedByUid === user?.uid)
  )
  const otherPeopleItems = entitiesArray.filter(
    ({ addedByUid, userId }) => addedByUid === user?.uid && userId !== user?.uid
  )

  const onSubmit = ({ itemName, itemLink, targetListUserUid }) => {
    const targerUser = JSON.parse(targetListUserUid)
    const isLinkValid = itemLink && itemLink.includes('http')
    const addAction = addItem({
      userId: targerUser.uid,
      userName: targerUser.name,
      name: itemName,
      link: isLinkValid ? itemLink : null,
      addedByUid: user?.uid,
      addedByName: user?.name,
    })
    return addAction
  }

  return (
    <>
      <h3 className="title is-3">Ajouter un élément</h3>
      <Container>
        <Form
          onSubmit={onSubmit}
          initialValues={{ targetListUserUid: JSON.stringify(user) }}
          render={({ handleSubmit, form, values }) => (
            <form
              onSubmit={(event) => handleSubmit(event).then(() => form.reset())}
            >
              <FieldsContainer>
                <div className="field has-addons">
                  <div className="control is-expanded">
                    <Field name="itemName">
                      {({ input }) => (
                        <input
                          className="input"
                          type="text"
                          placeholder="Element à ajouter"
                          {...input}
                        />
                      )}
                    </Field>
                  </div>
                </div>
                <div className="field has-addons">
                  <p className="control">
                    <a className="button is-static">
                      <FontAwesomeIcon icon="link" />
                    </a>
                  </p>
                  <p className="control is-expanded">
                    <Field name="itemLink">
                      {({ input }) => (
                        <input
                          className="input"
                          type="text"
                          placeholder="Lien vers l'élément"
                          {...input}
                        />
                      )}
                    </Field>
                  </p>
                </div>
              </FieldsContainer>
              <Element className="field">
                <label htmlFor="target" className="label has-text-white">
                  Ajouter à :
                </label>
                <div className="select is-expanded">
                  <Field
                    name="targetListUserUid"
                    component="select"
                    id="target"
                  >
                    <option value={JSON.stringify(user)}>Ma liste</option>
                    {otherUsersList.map((otherUser) => (
                      <option
                        key={otherUser.uid}
                        value={JSON.stringify(otherUser)}
                      >{`Liste de ${otherUser.name}`}</option>
                    ))}
                  </Field>
                </div>
              </Element>
              <Element>
                <button
                  type="submit"
                  className="button is-success"
                  disabled={!values.itemName && values.itemName !== ''}
                >
                  Ajouter
                </button>
              </Element>
            </form>
          )}
        />
      </Container>
      <h3 className="title is-3">Mes éléments</h3>
      {myItems.length > 0 ? (
        <ItemTableList items={myItems} removeItem={handleRemoveItem} />
      ) : (
        <div>Ajoute des éléments à ta liste</div>
      )}
      {!!otherPeopleItems.length && (
        <>
          <h4 className="title is-4">Elements ajoutés chez les autres</h4>
          <ItemTableList
            items={otherPeopleItems}
            removeItem={handleRemoveItem}
            isToSomeone
          />
        </>
      )}
    </>
  )
}
