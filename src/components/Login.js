import React from 'react'

export const Login = ({ login, errorMessage }) => {
  return (
    <>
      <h1 className="title">Connecte-toi avec ton compte Gmail</h1>
      {errorMessage && <h3 className="subtitle">{errorMessage}</h3>}
      <button className="button is-large" onClick={login}>
        Connexion
      </button>
    </>
  )
}
