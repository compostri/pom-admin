import React from 'react'
import {
  Datagrid,
  DateField,
  EditButton,
  List,
  ReferenceField,
  Filter,
  Show,
  ShowButton,
  SimpleShowLayout,
  TextField,
  TextInput,
  SelectInput,
  ReferenceInput,
  SimpleList,
} from 'react-admin'
import NoteField from '../NoteField'
import { useMediaQuery } from '@material-ui/core'

const SuiviFilter = (props) => (
  <Filter {...props}>
    <TextInput label="Composteurs" source="composter.name" alwaysOn />
    <ReferenceInput source="composter.pole" label="Poles" reference="poles">
      <SelectInput optionText="name" optionValue="id" helperText="" />
    </ReferenceInput>
    <ReferenceInput source="composter.commune" label="Communes" reference="communes">
      <SelectInput optionText="name" optionValue="id" helperText="" />
    </ReferenceInput>
  </Filter>
)

const SuivisFields = [
  <DateField source="date" addLabel />,
  <TextField source="description" addLabel sortable={false} />,
  <ReferenceField source="composter[@id]" label="Composteur" reference="composters" link="show" sortable={false}>
    <TextField source="name" />
  </ReferenceField>,
  <NoteField source="animation" addLabel sortable={false} />,
  <NoteField source="environnement" addLabel sortable={false} />,
  <NoteField source="technique" addLabel sortable={false} />,
  <NoteField source="autonomie" addLabel sortable={false} />,
]

const SuivisList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  return (
    <List {...props} filters={<SuiviFilter />} sort={{ field: 'date', order: 'DESC' }} perPage={25}>
      {isSmall ? (
        <SimpleList
          linkType="show"
          primaryText={(record) => record.composter.name}
          secondaryText={(record) => `Anim:${record.animation} Env:${record.environnement} Tech:${record.technique} Aut:${record.autonomie}`}
          tertiaryText={(record) => new Date(record.date).toLocaleDateString()}
        />
      ) : (
        <Datagrid>
          {SuivisFields}
          <ShowButton />
          <EditButton />
        </Datagrid>
      )}
    </List>
  )
}

const SuivisShow = (props) => (
  <Show {...props}>
    <SimpleShowLayout>{SuivisFields}</SimpleShowLayout>
  </Show>
)

export { SuivisList, SuivisShow }
