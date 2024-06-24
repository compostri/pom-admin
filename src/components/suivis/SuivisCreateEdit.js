import React from 'react'
import { required, AutocompleteInput, Create, DateInput, Edit, ReferenceInput, SimpleForm, TextInput, SelectInput } from 'react-admin'
import { parse } from 'query-string'

const noteChoices = [
  { id: 0, name: '0' },
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
]
const SuivisInputs = ({ hasList, hasEdit, hasShow, hasCreate, ...rest }) => {
  const { composter } = parse(rest.location.search)

  return (
    <SimpleForm {...rest} redirect={composter ? `/composters/${encodeURIComponent(composter)}/show/1` : 'show'} defaultValue={{ date: new Date(), composter }}>
      <DateInput source="date" validate={required()} />
      <TextInput source="description" validate={required()} multiline />
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
      <SelectInput source="animation" choices={noteChoices} />
      <SelectInput source="environnement" choices={noteChoices} />
      <SelectInput source="technique" choices={noteChoices} />
      <SelectInput source="autonomie" choices={noteChoices} />
    </SimpleForm>
  )
}

const SuivisCreate = (props) => (
  <Create {...props}>
    <SuivisInputs {...props} />
  </Create>
)

const SuivisEdit = (props) => {
  const transform = (data) => ({
    ...data,
    composter: data.composter instanceof Object ? data.composter['@id'] : data.composter,
  })
  return (
    <Edit {...props} transform={transform}>
      <SuivisInputs {...props} />
    </Edit>
  )
}

export { SuivisCreate, SuivisEdit }
