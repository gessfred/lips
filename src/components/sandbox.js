import React from 'react'
import Editor from '../components/editor.js'
import Console from '../components/console.js'

class Sandbox extends React.Component {
	render() {
		return (
			<div className='main'>
				<Editor onUpdate={(update) => this.console.update(update)}/>
				<Console ref={(console) => this.console = console}/>
			</div>
		)
	}
}

export default Sandbox
