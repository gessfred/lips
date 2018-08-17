import React from 'react'

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

export default Documentation
