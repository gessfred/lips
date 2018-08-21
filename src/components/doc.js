import React from 'react'

const Code = (props) => (
	<div>
		<span className='syntax'>{props.kw}</span> <span>{props.args}</span>
	</div>
)
//<Code kw='quote' args='datum'/>
//<Code kw='val' args='datum' />
const Documentation = (props) => (
	<div className='documentation'>
		<h1 className='biglogo'>( )</h1>
		<h1 className='biglogotext'>lips</h1>
		<div className='motto'>
			<h3>(learn code)</h3>
			<h3>(hack code)</h3>
			<h3>(love code)</h3>
		</div>
		<div className='reference'>
			<h1>Language reference</h1>

			<Code kw='if' args='expr then else'/>
			<Code kw='lambda' args='formals...'/>
			<Code kw='def' args='name expr'/>
			<Code kw='def' args='name args... expr'/>

			<Code kw='case' args='cond (vali expri)... (else expr)' />
		</div>
	</div>
)

export default Documentation
