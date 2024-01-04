const updateOnlineStatus = () => {
    document.getElementById('status').innerHTML = navigator.onLine ? 'online' : 'offline'
  }
  
  window.addEventListener('online', updateOnlineStatus)
  window.addEventListener('offline', updateOnlineStatus)
  
  updateOnlineStatus()

const setButton = document.getElementById('btn')
const titleInput = document.getElementById('title')

//Sending to main JS
setButton.addEventListener('click', () => {
  window.electronAPI.setTitle("set")
})

//Receiving from Main js

window.electronAPI.handleMainMessage((event, value) => {

    console.log("received", value)

    document.getElementById('output').innerHTML = JSON.stringify(value)
  })