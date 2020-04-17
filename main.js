let 
	canv   = document.getElementById('canvas1'),
	ctx    = canv.getContext('2d'),
	coords = []
	isMouseDown = false
canv.width = window.innerWidth;
canv.height = window.innerHeight;
//code
canv.addEventListener('mousedown', function() {
	isMouseDown = true
})

canv.addEventListener('mouseup', function() {
	isMouseDown = false
	ctx.beginPath()
	coords.push('mouseup')
})
ctx.lineWidth = 5 * 2
canv.addEventListener('mousemove', function(e) {
	if (isMouseDown) {
		coords.push([e.clientX, e.clientY])
		ctx.lineTo(e.clientX, e.clientY)
		ctx.stroke()

		ctx.beginPath()
		ctx.arc(e.clientX, e.clientY, 5, 0, Math.PI * 2)
		ctx.fill()

		ctx.beginPath()
		ctx.moveTo(e.clientX, e.clientY)
	}
})
function save() {
	localStorage.setItem('coords', JSON.stringify(coords))
}
function clear() {
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canv.width, canv.height);
	ctx.beginPath();
	ctx.fillStyle = 'black';
}
function replay() {
	let
		timer = setInterval(function() {
			if(!coords.length) {
				clearInterval(timer)
				ctx.beginPath()
				return
			}
			let
				crd = coords.shift()
				e = {
					clientX: crd["0"],
					clientY: crd["1"]
				}
			
			ctx.lineTo(e.clientX, e.clientY)
			ctx.stroke()

			ctx.beginPath()
			ctx.arc(e.clientX, e.clientY, 5, 0, Math.PI * 2)
			ctx.fill()

			ctx.beginPath()
			ctx.moveTo(e.clientX, e.clientY)
		}, 10)
}
document.addEventListener('keydown', function(e) {
	
	if( e.keyCode == 83 ) {
		//save
		save()
		console.log('Saved')
	}
	if( e.keyCode == 13 ) {
		//replay
		console.log('Replaying...')
		coords = JSON.parse(localStorage.getItem('coords'))
		clear()
		replay()
	}
	if( e.keyCode == 67 ) {
		clear();
		console.log('Cleared')
	}
})