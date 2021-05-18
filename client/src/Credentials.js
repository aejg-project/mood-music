const Credentials = () => {

  return {
    ClientId: process.env.REACT_APP_CLIENTID,
    ClientSecret: process.env.REACT_APP_CLIENTSECRET
  }
}

export { Credentials };