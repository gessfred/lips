import React from 'react'
import Link from 'gatsby-link'
import './index.css'
import logoFont from '../resources/VAG Rounded Bold.ttf'
import Sandbox from '../components/sandbox.js'
import Documentation from '../components/doc.js'


const Icon = (props) => (
	<button className='icon'>
			<div className='logo'>()</div>
			<div className='logotext'>lips</div>
	</button>
)

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
