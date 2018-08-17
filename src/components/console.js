import React from 'react'
const {evalAll} = require('../core/interpreter')
const {environment, math, collections} = require('../core/environment')

const globe = math.union(collections)
console.log(globe.dump())

class Console extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			content: ['nothing']
		}
	}

	update(content) {
		this.setState({content: evalAll(content, globe)})
	}

	render() {
		//write line number
		return (
			<div className='console'>
				{console.log(this.state.content)}
				{
					this.state.content.map((x, i) => <div>{(i + 1) + ': '+  x}</div>)
				}
			</div>
		)
	}
}

export default Console
