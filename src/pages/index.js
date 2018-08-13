import React from 'react'
import Link from 'gatsby-link'
import './index.css'
const {evaluate} = require('../core/interpreter')

const Icon = (props) => (
	<button className='icon'>
		<div className='logo'>( )</div>
		<div className='logotext'>lips</div>
	</button>
)

class Editor extends React.Component {
	render() {
		return (
			<textarea className='editor' ref='editor' onChange={() => this.props.onUpdate(this.refs.editor.value)}/>
		)
	}
}

class Console extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			content: 'nothing'
		}
	}

	update(content) {
		this.setState({content: content})
	}

	render() {
		return (
			<div className='console'>
				{this.state.content}
			</div>
		)
	}
}

class App extends React.Component {
	render() {
		return (
			<div className='root'>
		    <div className='topnav'>
					<Icon/>

		    </div>
		    <div className='main'>
					<Editor onUpdate={(update) => this.console.update(update)}/>
					<Console ref={(console) => this.console = console}/>
		    </div>
		  </div>
		)
	}
}

export default App
