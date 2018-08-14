import React from 'react'
import Link from 'gatsby-link'
import './index.css'
const {evalAll} = require('../core/interpreter')
const {environment, arithmeticEnv} = require('../core/environment')
const {sanitize} = require('../core/parser')

const Icon = (props) => (
	<button className='icon'>
		<div className='logo'>( )</div>
		<div className='logotext'>lips</div>
	</button>
)
const isAlphaNumeric = function(e) { // Alphanumeric only
  var k = e.keyCode
  return ((k>47 && k<58)||(k>64 && k<91)||(k>96 && k<123)||k==0)
}
class Editor extends React.Component {
	render() {
		return (
			<textarea
				className='editor'
				ref='editor'
				onKeyUp={(e) => {
					console.log(e)
					if(isAlphaNumeric(e)) {
						this.refs.editor.value = sanitize(this.refs.editor.value).string
						this.props.onUpdate(this.refs.editor.value)
					}
				}} //balance this.refs.editor
			/>
		)
	}
}

class Console extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			content: ['nothing']
		}
	}

	update(content) {
		this.setState({content: evalAll(content, arithmeticEnv)})
	}

	render() {
		return (
			<div className='console'>
				{this.state.content.map(x => <div>{x}</div>)}
			</div>
		)
	}
}

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

class App extends React.Component {
	render() {
		return (
			<div className='root'>
		    <div className='topnav'>
					<Icon/>
		    </div>
		    <Sandbox/>
		  </div>
		)
	}
}

export default App
