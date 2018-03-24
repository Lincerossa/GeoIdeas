import React from 'react'
import { Field } from 'redux-form'

const Form = ({ handleSubmit, fields }) => {
  console.log("this priops", handleSubmit)
  return (
    <form onSubmit={handleSubmit}>
      {
        fields &&
        fields.map(({ name, label, component = "input", type = "text", value, placeholder }) => (
          <div>
            <label htmlFor={name}>{label}</label>
            <Field name={name} component={component} type={type} placeholder={placeholder} value={value} />
          </div>
        ))
      }
      <button type="submit">Submit</button>
    </form>
  )
}

export default Form

