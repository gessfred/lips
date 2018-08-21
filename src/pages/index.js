import React from 'react'
import Link from 'gatsby-link'
import './index.css'
import Sandbox from '../components/sandbox.js'
import Documentation from '../components/doc.js'

const Icon = (props) => (
	<button className='icon' onClick={props.onClick}>
			<div className='app'>
				<div className='logo'>( )</div>
				<div className='logotext'>lips</div>
			</div>
	</button>
)
const Close = (props) => (
	<svg width="24" height="24"  fill-rule="evenodd" clip-rule="evenodd"><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg>
)

const bulb = (props) => (
	<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 6.734c0 4.672-4.25 7.079-4.25 12.266h-5.5c0-5.187-4.25-7.594-4.25-12.266 0-4.343 3.498-6.734 6.996-6.734 3.502 0 7.004 2.394 7.004 6.734zm-4.75 13.266h-4.5c-.276 0-.5.224-.5.5s.224.5.5.5h4.5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm.25 2h-5l1.451 1.659c.19.216.464.341.753.341h.593c.288 0 .563-.125.752-.341l1.451-1.659z"/></svg>
)

//<div className='logotext'>lips</div>
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
		const active = i == this.state.activeTab
		const idx = this.state.activeTab
		return (
			<button
				className={active ? 'topnavitemdeletable' : 'topnavitem'}
				onClick={active ? (() => {
					const cpy = this.state.tabs.slice()
					cpy.splice(idx, 1)
					this.setState({tabs: cpy, activeTab: idx - 1})
				}) : () => this.setState({activeTab: i})}
			>
				{active ? <Close/> : i + 1}
			</button>
		)
	}
//either save texts or keep all tabs in rotations :(
	render() {
		return (
			<div className='root'>
		    <div className='topnav'>
					<Icon onClick={() => {
						/*const update = this.state.tabs.slice()
						update.push(<Documentation/>)*/
						this.setState({activeTab: -1})
					}}/>
					{this.state.tabs.map((x, i) => this.tabButton(x, i))}
					<button className='topnavitem' onClick={() => {
						const update = this.state.tabs.slice()
						update.push(<Sandbox/>)
						this.setState({tabs: update, activeTab: update.length - 1})
					}}>+</button>

					<button className='topnavitem'>
						<close/>
					</button>
		    </div>
				{(this.state.tabs.length != 0) ? this.state.tabs.map((function(x, i) {
					return (
						<div className={i == this.state.activeTab ? '' : 'inactivetab'}>
							{x}
						</div>
					)
				}).bind(this))
				: <div />
				}
				{(this.state.tabs.length == 0 || this.state.activeTab < 0) ? <Documentation/> : <div/>}
		  </div>
		)
	}
}
/*
<div className='bottomnav'>
	environment
</div>*/

export default App
