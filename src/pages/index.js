import React from 'react'
import Link from 'gatsby-link'
import './index.css'

const Icon = (props) => (
	<button className='icon'>
		<div className='logo'>( )</div>
		<div className='logotext'>lips</div>
	</button>
)

class Editor extends React.Component {
	render() {
		return (
			<textarea className='editor' ref='editor'/>
		)
	}
}

class Console extends React.Component {
	render() {
		return (
			<div className='console'>
				okokok
				textarea
				vsdnld
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
					<Editor />
					<Console />
		    </div>
		  </div>
		)
	}
}

export default App
