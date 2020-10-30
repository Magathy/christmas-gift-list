import React from 'react'
import { Form, Field } from 'react-final-form'
import { dbRefs, useDatabase } from '../hooks/useDatabase'
import styled from 'styled-components'
import {ItemDisplay} from "./ItemDisplay";

const Container = styled.div`
  margin-bottom: 30px;
`

export const MyList = ({ user }) => {
  const {
    addEntity: addItem,
    removeEntity: removeItem,
    entitiesArray,
  } = useDatabase(dbRefs.items)

  const myItems = entitiesArray.filter(({ userId }) => userId === user.uid)

  const onSubmit = ({ itemName }) =>
    addItem({
      userId: user.uid,
      userName: user.name,
      name: itemName,
    })

  return (
    <>
      <h1 className="title is-1">Ma liste</h1>
      <Container>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, form, values }) => (
            <form
              onSubmit={(event) => handleSubmit(event).then(() => form.reset())}
            >
              <div className="field has-addons">
                <div className="control is-expanded">
                  <Field name="itemName">
                    {({ input }) => (
                      <input
                        className="input is-success"
                        type="text"
                        placeholder="Element à ajouter"
                        {...input}
                      />
                    )}
                  </Field>
                </div>
                <div className="control">
                  <button
                    type="submit"
                    className="button is-success"
                    disabled={!values.itemName && values.itemName !== ''}
                  >
                    Ajouter à la liste
                  </button>
                </div>
              </div>
            </form>
          )}
        />
      </Container>
      {myItems.length > 0 ? (
        <table className="table is-striped is-fullwidth">
          <tbody>
            {myItems.map((item) => (
              <tr key={item.uid}>
                <td><ItemDisplay item={item} /></td>
                <td>
                  <button
                    onClick={() => removeItem(item.uid)}
                    className="button is-danger is-outlined is-rounded is-small"
                  >
                    <span className="icon is-small">❌</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>Ajoute des éléments à ta liste</div>
      )}
    </>
  )
}
