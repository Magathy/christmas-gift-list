import React, { useState } from 'react'
import { Form, Field } from 'react-final-form'
import { dbRefs, useDatabase } from '../hooks/useDatabase'
import styled from 'styled-components'
import { ItemDisplay } from './ItemDisplay'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  margin-bottom: 30px;
`

export const MyList = ({ user }) => {
  const [hasLink, setHasLink] = useState(false)
  const {
    addEntity: addItem,
    removeEntity: removeItem,
    entitiesArray,
  } = useDatabase(dbRefs.items)

  const myItems = entitiesArray.filter(({ userId }) => userId === user.uid)

  const onSubmit = ({ itemName, itemLink }) => {
    const isLinkValid = hasLink && itemLink && itemLink.includes('http')
    const addAction = addItem({
      userId: user.uid,
      userName: user.name,
      name: itemName,
      link: isLinkValid ? itemLink : null
    })
    setHasLink(false)
    return addAction
  }

  const toggleLink = () => {
    setHasLink((current) => !current)
  }

  return (
    <>
      <h3 className="title is-3">Ajouter un élément</h3>
      <Container>
        <Form
          onSubmit={onSubmit}
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
                  <div className="control">
                    <a
                      className={`button ${hasLink ? 'is-danger' : 'is-info'}`}
                      onClick={toggleLink}
                    >
                      {hasLink ? (
                        <span>
                          <FontAwesomeIcon icon="minus" />
                          {' '}Lien
                        </span>
                      ) : (
                        <span>
                          <FontAwesomeIcon icon="plus" />
                          {' '}Lien
                        </span>
                      )}
                    </a>
                  </div>
                </div>
                {hasLink && (
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
                )}
                <div>
                  <button
                    type="submit"
                    className="button is-success"
                    disabled={!values.itemName && values.itemName !== ''}
                  >
                    Ajouter à la liste
                  </button>
                </div>
              </FieldsContainer>
            </form>
          )}
        />
      </Container>
      <h3 className="title is-3">Mes éléments</h3>
      {myItems.length > 0 ? (
        <table className="table is-striped is-fullwidth">
          <tbody>
            {myItems.map((item) => (
              <tr key={item.uid}>
                <td>
                  <ItemDisplay item={item} />
                </td>
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
