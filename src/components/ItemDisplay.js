import React from 'react'

export const ItemDisplay = ({ item }) =>
  item.name.includes('http') ? (
    <a
      href={item.name.split(' ').find((splitted) => splitted.includes('http'))}
      target="_blank"
      rel="noopener noreferrer"
    >
      Lien vers {item.name.split('://')[1].split('/')[0]}
    </a>
  ) : (
    item.name
  )
