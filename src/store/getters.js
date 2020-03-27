const getters = {
  device: state => state.app.device,
  name: state => state.user.name,
  nav: state => state.nav.homeNav,
  emailList: state => state.emailList
}
export default getters
