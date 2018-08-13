import React from 'react'
import Link from 'gatsby-link'
import './index.css'

const Icon = (props) => (
	<button className='icon'>
		<div className='logo'>( )</div>
	</button>
)

class App extends React.Component {
	render() {
		return (
			<div>
		    <div className='topnav'>
					<Icon/>
		    </div>
		    <div>

		    </div>
		  </div>
		)
	}
}

export default App
