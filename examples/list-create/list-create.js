import {LEOList, LEOObject} from 'leo'

let Constellation = new LEOList([
	{ name: 'Polaris', declination: 'N 89°' },
	{ name: 'Kochab', declination: 'N 74°' }
])

Constellation.on('add', (obj) => {
	console.log('Added obj', obj)
})

Constellation.on('change', (obj) => {
	console.log('changed obj', obj)
})

Constellation.push({ name: 'Schedar', declination: 'N 56°' })
Constellation.push({ name: 'Alkaid', declination: 'N 49°' })

Constellation.map(item => { item.name = 'foo' })




