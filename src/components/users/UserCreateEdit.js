import React from 'react'
import { required, BooleanInput, Toolbar, SaveButton, Create, Edit, SimpleForm, TextInput, SelectArrayInput } from 'react-admin'
import { enumAdminRoleOnly, enumRoles } from '../Enums'

const initialValues = { enabled: true }

const UserInputs1 = [<TextInput source="username" validate={required()} />, <TextInput source="email" validate={required()} />]

const UserInputs2 = [<TextInput source="firstname" />, <TextInput source="lastname" />, <TextInput source="phone" />]

const UserCreate = props => (
  <Create {...props}>
    <SimpleForm redirect="list" defaultValue={initialValues}>
      {UserInputs1}
      <TextInput source="plainPassword" type="password" validate={required()} />
      {UserInputs2}
      <SelectArrayInput source="roles" choices={enumAdminRoleOnly} validate={required()} initialValue={['ROLE_ADMIN']} />
    </SimpleForm>
  </Create>
)

const EditUserToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
)

const UserEdit = props => (
  <Edit {...props}>
    <SimpleForm redirect="list" defaultValue={initialValues} toolbar={<EditUserToolbar />}>
      {UserInputs1}
      {UserInputs2}
      <SelectArrayInput source="roles" choices={enumRoles} validate={required()} />
      <BooleanInput source="enabled" />
    </SimpleForm>
  </Edit>
)

export { UserCreate, UserEdit }