import React from 'react'
import styled from 'styled-components'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"

const Link = styled.a`
	color: #1d72aa !important;
  text-decoration: underline;
`

export const ItemDisplay = ({ item }) =>
    item.link ? <Link
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon="external-link-alt" /> {item.name}
    </Link> : item.name
