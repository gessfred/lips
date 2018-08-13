import React from 'react'
import Link from 'gatsby-link'
import './index.css'
const {evalAll} = require('../core/interpreter')
const {environment, arithmeticEnv} = require('../core/environment')

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
		this.setState({content: evalAll(content, arithmeticEnv)})
	}

	render() {
		return (
			<div className='console'>
				{this.state.content.map(x => <p>{x}</p>)}
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
