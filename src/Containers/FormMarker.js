import { reduxForm } from 'redux-form'

import Form from '../Components/Form';


const FormContainer = reduxForm({
  // a unique name for the form
  form: 'markerGenerator'
})(Form)


export default FormContainer