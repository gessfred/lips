import React from 'react'
import Link from 'gatsby-link'
import './index.css'
const {evalAll} = require('../core/interpreter')
const {environment, globalEnv} = require('../core/environment')
const {sanitize} = require('../core/parser')
import logoFont from '../resources/VAG Rounded Bold.ttf'

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

					if(isAlphaNumeric(e)) {
						const update = sanitize(this.refs.editor.value, this.refs.editor.selectionStart)
						this.refs.editor.value = update.string
						this.props.onUpdate(this.refs.editor.value)
						this.refs.editor.setSelectionRange(update.caretPosition, update.caretPosition)
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
		this.setState({content: evalAll(content, globalEnv)})
	}

	render() {
		//write line number
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

class REPL extends React.Component {
	render() {
		return (
			<div className='replmain'>
				<Editor/>
			</div>
		)
	}
}

class App extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			tabs: [<Sandbox/>],
			activeTab: 0
		}
	}
//onClick={() => this.setState({activeTab: i})}
	tabButton(x, i) {
		return (
			<button
				className='topnavitem'
				onClick={() => this.setState({activeTab: i})}
			>
				{i + 1}
			</button>
		)
	}

	render() {
		return (
			<div className='root'>
		    <div className='topnav'>
					<Icon/>
					{this.state.tabs.map((x, i) => this.tabButton(x, i))}
					<button className='topnavitem' onClick={() => {
						const update = this.state.tabs.slice()
						update.push(<REPL/>)
						this.setState({tabs: update})
					}}>+</button>
		    </div>
		    {this.state.tabs[this.state.activeTab]}
		  </div>
		)
	}
}

export default App
