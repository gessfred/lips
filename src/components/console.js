import React from 'react'
const {evalAll} = require('../core/interpreter')
const {environment, globalEnv} = require('../core/environment')

class Console extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			content: ['nothing']
		}
	}

	update(content) {
		this.setState({content: evalAll(content, globalEnv)})
	}

	render() {
		//write line number
		return (
			<div className='console'>
				{this.state.content.map((x, i) => <div>{(i + 1) + ': '+  x}</div>)}
			</div>
		)
	}
}

export default Console
