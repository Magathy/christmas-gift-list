import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Link = styled.a`
  color: #1d72aa !important;
  text-decoration: underline;
`

const TextContent = styled.span`
  word-break: break-word;
`

const LinkText = ({ link, name }) => (
  <Link href={link} target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon icon="external-link-alt" /> {name}
  </Link>
)

export const ItemDisplay = ({ item, isToSomeone, hasTag }) => {
  const match = item.name.match(
    /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/
  )
  // In case the user didn't use the link feature
  const automaticLink = match?.[0]
  const automaticName = item.name.replace(automaticLink, '')

  return (
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
      <TextContent>
        {item.link ? (
          <LinkText link={item.link} name={item.name} />
        ) : automaticLink ? (
          <LinkText link={automaticLink} name={automaticName} />
        ) : (
          item.name
        )}
      </TextContent>
    </>
  )
}
