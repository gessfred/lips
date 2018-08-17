import React from 'react'
const {evalAll} = require('../core/interpreter')
const {globalEnv} = require('../core/environment')

class Console extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			content: ['nothing']
		}
	}

	update(content) {
		console.log('updating...' + evalAll(content, globalEnv))
		this.setState({content: evalAll(content, globalEnv)})
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
