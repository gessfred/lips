import React from 'react'

const Code = (props) => (
	<div>
		<span className='syntax'>{props.kw}</span> <span>{props.args}</span>
	</div>
)

const Documentation = (props) => (
	<div className='documentation'>
		<h1 className='biglogo'>( )</h1>
		<h1 className='biglogotext'>lips</h1>
		<h3>(learn code)</h3>
		<h3>(hack code)</h3>
		<h3>(love code)</h3>
		<h1>Language reference</h1>
		<Code kw='quote' args='datum'/>
		<Code kw='if' args='expr then else'/>
		<Code kw='lambda' args='formals...'/>
		<Code kw='lambda' args='datum'/>
		<Code kw='val' args='datum' />
		<Code kw='case' args='daum' />
		<Code kw='begin' args='...'/>
	</div>
)

export default Documentation
