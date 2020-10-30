import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { Spinner } from '../components/Spinner'
import { Login } from '../components/Login'
import { dbRefs, useDatabase } from '../hooks/useDatabase'
import { toLower } from 'ramda'
import { MyList } from '../components/MyList'
import { OtherLists } from '../components/OtherLists'
import classNames from 'classnames'
import { MyItems } from '../components/MyItems'

const navOptions = {
  myList: 'myList',
  otherLists: 'otherLists',
  myItems: 'myItems',
}

export const HomeScreen = () => {
  const { authObserver, login, logOut } = useAuth()
  const { entitiesArray } = useDatabase(dbRefs.users)
  const [isLogged, setIsLogged] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [currentNav, setCurrentNav] = useState(navOptions.myList)

  const getAuthData = (user) => {
    const isAuthorized = entitiesArray
      .map(({ email: dataEmail }) => toLower(dataEmail))
      .includes(toLower(user.email))
    const foundUser = entitiesArray.find(({ email }) => email === user.email)
    return { isAuthorized, foundUser }
  }

  useEffect(() => {
    authObserver((user) => {
      if (user && user.email && entitiesArray.length) {
        const { isAuthorized, foundUser } = getAuthData(user)
        if (isAuthorized) {
          setIsLogged(true)
          setErrorMessage(null)
          if (!currentUser && foundUser) {
            setCurrentUser(foundUser)
          }
        } else {
          setIsLogged(false)
          setCurrentUser(null)
          setErrorMessage(
            `L'adresse ${user.email} n'est pas autorisée, essaye avec une autre.`
          )
        }
      } else {
        setIsLogged(null)
        setCurrentUser(null)
        setErrorMessage(null)
      }
    })
  })

  return (
    <>
      <section className="hero is-danger is-fullheight">
        <div className="hero-head">
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            <div className="navbar-brand">
              {isLogged && (
                <a
                  role="button"
                  className="navbar-burger burger"
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarBasicExample"
                >
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                  <span aria-hidden="true"></span>
                </a>
              )}
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
              {isLogged && (
                <div className="navbar-start">
                  <a
                    className={classNames('navbar-item', {
                      'is-active': currentNav === navOptions.myList,
                    })}
                    onClick={() => setCurrentNav(navOptions.myList)}
                  >
                    Ma liste d'idées
                  </a>
                  <a
                    className={classNames('navbar-item', {
                      'is-active': currentNav === navOptions.otherLists,
                    })}
                    onClick={() => setCurrentNav(navOptions.otherLists)}
                  >
                    Listes des autres
                  </a>
                  <a
                    className={classNames('navbar-item', {
                      'is-active': currentNav === navOptions.myItems,
                    })}
                    onClick={() => setCurrentNav(navOptions.myItems)}
                  >
                    Les cadeaux à offrir
                  </a>
                </div>
              )}

              {isLogged && (
                <div className="navbar-end">
                  <div className="navbar-item">
                    <div className="buttons">
                      <a className="button is-light" onClick={logOut}>
                        Se déconnecter
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>
        </div>

        <div className="hero-body">
          <div className="container has-text-centered">
            {isLogged === null && !entitiesArray.length ? (
              <Spinner />
            ) : isLogged ? (
              currentNav === navOptions.myList ? (
                <MyList user={currentUser} />
              ) : currentNav === navOptions.otherLists ? (
                <OtherLists user={currentUser} />
              ) : (
                <MyItems user={currentUser} />
              )
            ) : (
              <Login login={login} errorMessage={errorMessage} />
            )}
          </div>
        </div>
      </section>
    </>
  )
}
