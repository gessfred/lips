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

/**/

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

const Documentation = (props) => (
	<div className='documentation'>
		<h1 className='biglogo'>( )</h1>
		<h1 className='biglogotext'>Lips</h1>
		<h2>(learn code)</h2>
		<h2>(grow code)</h2>
		<h2>(enjoy code)</h2>
		<h1>Language reference</h1>
<h2><b class="syntax">quote</b> <i>datum</i></h2>
<h2><b class="syntax">if</b> <i>expr then else</i></h2>
<h2><b class="syntax">lambda</b> <i>formals ...</i></h2>
<h2><b class="syntax">def</b> <i>datum</i></h2>
<h2><b class="syntax">val</b> <i>datum</i></h2>
<h2><b class="syntax">case</b> <i>datum</i></h2>
<h2><b class="syntax">cond</b> <i>datum</i></h2>
<h2><b class="syntax">begin</b> <i>...</i></h2>
	</div>
)
/**


<h2><b class="syntax">quote</b> <i>datum</i></h2>
<h2><b class="syntax">if</b> <i>expr then else</i></h2>
<h2><b class="syntax">lambda</b> <i>formals ...</i></h2>
<h2><b class="syntax">def</b> <i>datum</i></h2>
<h2><b class="syntax">val</b> <i>datum</i></h2>
<h2><b class="syntax">case</b> <i>datum</i></h2>
<h2><b class="syntax">cond</b> <i>datum</i></h2>
<h2><b class="syntax">begin</b> <i>...</i></h2>
*/
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
		const active = i == this.state.activeTab
		const idx = this.state.activeTab
		return (
			<button
				className={active ? 'topnavitemdeletable' : 'topnavitem'}
				onClick={active ? () => this.setState({tabs: this.state.tabs.slice(idx, idx), activeTab: 0}) : () => this.setState({activeTab: i})}
			>
				{active ? 'x' : i + 1}
			</button>
		)
	}
//either save texts or keep all tabs in rotations :(
	render() {
		return (
			<div className='root'>
		    <div className='topnav'>
					<Icon/>
					{this.state.tabs.map((x, i) => this.tabButton(x, i))}
					<button className='topnavitem' onClick={() => {
						const update = this.state.tabs.slice()
						update.push(<Sandbox/>)
						this.setState({tabs: update})
					}}>+</button>
		    </div>
				{(this.state.tabs.length != 0) ? this.state.tabs.map((function(x, i) {
					return (
						<div className={i == this.state.activeTab ? '' : 'inactivetab'}>
							{x}
						</div>
					)
				}).bind(this))
				: <Documentation />
			}
		  </div>
		)
	}
}

export default App
