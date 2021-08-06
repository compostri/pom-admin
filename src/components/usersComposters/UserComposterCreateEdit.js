import React, { useCallback } from 'react'
import {
  required,
  AutocompleteInput,
  Create,
  Edit,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  BooleanInput,
  FormDataConsumer,
  SaveButton,
  Toolbar,
} from 'react-admin'
import { Box } from '@material-ui/core'
import { useForm } from 'react-final-form'
import { enumDroits } from '../Enums'

const CreatUserToolBar = ({ handleSubmitWithRedirect, ...props }) => {
  const form = useForm()

  const handleClick = useCallback(() => {
    const newUserState = form.getFieldState('newUser')
    if (newUserState.value) {
      form.batch(() => {
        form.change('user.roles', 'ROLE_USER')
        form.change('user.userConfirmedAccountURL', `${process.env.REACT_APP_FRONTEND_ENTRYPOINT}/confirmation`)
        form.change('user.plainPassword', Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
      })
    }

    handleSubmitWithRedirect('list')
  }, [form, handleSubmitWithRedirect])

  return (
    <Toolbar>
      <SaveButton {...props} handleSubmitWithRedirect={handleClick} />
    </Toolbar>
  )
}

const NewUserInput = () => {
  return (
    <Box display="flex" flexDirection="column" pl={2} borderLeft={2} maxWidth={260}>
      <TextInput source="user.username" label="resources.users.fields.username" validate={required()} />
      <TextInput source="user.email" label="resources.users.fields.email" validate={required()} />
      <TextInput source="user.firstname" label="resources.users.fields.firstname" />
      <TextInput source="user.lastname" label="resources.users.fields.lastname" />
      <TextInput source="user.phone" label="resources.users.fields.phone" />
      <BooleanInput source="user.isSubscribeToCompostriNewsletter" label="resources.users.fields.isSubscribeToCompostriNewsletter" />
    </Box>
  )
}

const UserComposterCreate = (props) => {
  return (
    <Create {...props}>
      <SimpleForm redirect="list" toolbar={<CreatUserToolBar />} defaultValue={{ user: { isSubscribeToCompostriNewsletter: false } }}>
        <BooleanInput source="newUser" label="Créer un nouvel utilisateur" defaultValue={true} />
        <FormDataConsumer>
          {({ formData }) =>
            formData.newUser ? (
              <NewUserInput />
            ) : (
              <ReferenceInput source="user" reference="users" validate={required()} filterToQuery={(email) => ({ email })}>
                <AutocompleteInput optionValue="@id" optionText="email" />
              </ReferenceInput>
            )
          }
        </FormDataConsumer>

        <SelectInput source="capability" choices={enumDroits} defaultValue={enumDroits[0].id} validate={required()} />
        <ReferenceInput
          source="composter"
          reference="composters"
          alwaysOn
          filterToQuery={(name) => ({ name })}
          validate={required()}
          format={(c) => (c instanceof Object ? c['@id'] : c)}
        >
          <AutocompleteInput optionValue="@id" />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  )
}

const UserComposterEdit = (props) => (
  <Edit {...props}>
    <SimpleForm redirect="show">
      <ReferenceField source="user[@id]" reference="users">
        <TextField source="username" />
      </ReferenceField>
      <ReferenceInput
        source="composter"
        reference="composters"
        alwaysOn
        filterToQuery={(name) => ({ name })}
        format={(c) => (c instanceof Object ? c['@id'] : c)}
      >
        <AutocompleteInput optionValue="@id" />
      </ReferenceInput>
      <SelectInput source="capability" choices={enumDroits} />
    </SimpleForm>
  </Edit>
)

export { UserComposterCreate, UserComposterEdit }
