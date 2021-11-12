import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Link = styled.a`
  color: #1d72aa !important;
  text-decoration: underline;
`

export const ItemDisplay = ({ item, isToSomeone, hasTag }) => (
  <>
    {isToSomeone ? (
      <span className="tag is-light">Pour {item.userName}</span>
    ) : (
      hasTag &&
      item.addedByName &&
      item.addedByUid !== item.userId && (
        <span className="tag is-light">
          {isToSomeone
            ? `Pour ${item.userName}`
            : `Ajouté par ${item.addedByName}`}
        </span>
      )
    )}
    <span>
      {item.link ? (
        <Link href={item.link} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon="external-link-alt" /> {item.name}
        </Link>
      ) : (
        item.name
      )}
    </span>
  </>
)
