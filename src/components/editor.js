import React from 'react'

const {sanitize} = require('../core/parser')

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
				autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false"
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

export default Editor
