let $ = document
let locationKey = $.querySelector('#location')
let title = $.querySelector('title')

let keyCodeElem = $.getElementById('keyCode')
let keyElem = $.getElementById('key')
let locationElem = $.getElementById('location')
let whichElem = $.getElementById('which')
let codeElem = $.getElementById('code')

document.body.addEventListener('keydown', function (event) {
	
    event.preventDefault()

	starter.style.display = 'none'
	heading.style.display = 'flex'
	ascii.style.display = 'flex'
	infos.style.display = 'flex'

    let eventKeyCode = event.keyCode
    let eventKey = event.key
    let eventLocation = event.location
    let eventWWhich = event.which
    let eventCode = event.code

    keyCodeElem.innerHTML = eventKeyCode
    keyElem.innerHTML = eventKey
    locationElem.innerHTML = eventLocation
    whichElem.innerHTML = eventWWhich
    codeElem.innerHTML = eventCode
})