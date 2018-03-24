import React from 'react'
import { Field, reduxForm } from 'redux-form'




let Form = ({ handleSubmit, fields}) => {
  return (
    <form onSubmit={handleSubmit}>
      {
        fields &&
        fields.map(({name, label, component="input", type="text", value, placeholder}) => (
          <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name} component={component} type={type} placeholder={placeholder} value={value}/>
          </div>
        ))
      }
      <button type="submit">Submit</button>
    </form>
  )
}

Form = reduxForm({
  // a unique name for the form
  form: 'markerGenerator'
})(Form)

export default Form