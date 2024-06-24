import React from 'react'
import {
  BooleanField,
  Button,
  Datagrid,
  DateField,
  EditButton,
  ImageField,
  ReferenceField,
  ReferenceManyField,
  SelectField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
  translate,
  Pagination,
} from 'react-admin'
import { Link } from 'react-router-dom'
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@material-ui/core'
import { Done, Clear, Add } from '@material-ui/icons'

import { enumBroyat, enumStatus } from '../Enums'
import MapField from '../MapField'
import NoteField from '../NoteField'

const AddNewLivraisonBroyatButton = ({ record }) => {
  return (
    <Button
      component={Link}
      to={{
        pathname: `/livraison_broyats/create?composter=${record['@id']}`,
      }}
      label="Ajouter une livraison"
      variant="outlined"
    >
      <Add />
    </Button>
  )
}

const AddNewSuivitButton = ({ record }) => {
  return (
    <Button
      component={Link}
      to={{
        pathname: `/suivis/create?composter=${record['@id']}`,
      }}
      label="Ajouter un suivi"
      variant="outlined"
    >
      <Add />
    </Button>
  )
}

const AddNewReparationsButton = ({ record }) => {
  return (
    <Button
      component={Link}
      to={{
        pathname: `/reparations/create?composter=${record['@id']}`,
      }}
      label="Ajouter une réparation"
      variant="outlined"
    >
      <Add />
    </Button>
  )
}

const FreqField = translate(({ translate, record, resource }) => {
  return (
    <div style={{ marginTop: 16 }}>
      <Typography variant="title">Fréquentation / Capacité</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{translate(`resources.${resource}.fields.nbFoyersPotentiels`)}</TableCell>
            <TableCell>{translate(`resources.${resource}.fields.nbInscrit`)}</TableCell>
            <TableCell>{translate(`resources.${resource}.fields.nbDeposant`)}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{record.nbFoyersPotentiels}</TableCell>
            <TableCell>{record.nbInscrit}</TableCell>
            <TableCell>{record.nbDeposant}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
})

const BooleanArrayField = translate(({ translate, record, resource, fields, title }) => {
  return (
    <div style={{ marginTop: 16 }}>
      <Typography variant="title">{title}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            {fields.map((f) => (
              <TableCell>{translate(`resources.${resource}.fields.${f}`)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {fields.map((f) => (
              <TableCell>{record[f] ? <Done /> : <Clear />}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
})
const EquipementField = ({ record = {} }) => <span>{record && `${record.type} ${record.capacite}`}</span>

const ComposterShow = (props) => {
  const { id } = props
  const slug = id.replace('/composters/', '')
  return (
    <Show {...props}>
      <TabbedShowLayout>
        <Tab label="Informations">
          <ReferenceField source="image[@id]" reference="media_objects" addLabel={false} allowEmpty>
            <ImageField source="contentUrl" />
          </ReferenceField>
          <TextField source="name" addLabel />
          <SelectField source="status" choices={enumStatus} addLabel />
          <TextField source="serialNumber" addLabel />
          <TextField source="plateNumber" addLabel />
          <DateField source="DateMiseEnRoute" addLabel />
          <DateField source="DateInauguration" addLabel />
          <DateField source="DateInstallation" addLabel />
          <ReferenceField source="categorie[@id]" reference="categories" allowEmpty link="show">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="permanencesDescription" addLabel />
          <BooleanField source="acceptNewMembers" addLabel />
          <TextField source="description" addLabel />
          <TextField source="publicDescription" addLabel />
          <ReferenceField source="commune[@id]" reference="communes" allowEmpty link="show">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField source="pole[@id]" reference="poles" allowEmpty link="show">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField source="quartier[@id]" reference="quartiers" allowEmpty link="show">
            <TextField source="name" />
          </ReferenceField>
          <TextField source="address" addLabel label="Adresse" />
          <MapField />
        </Tab>
        <Tab label="Suivi">
          <ReferenceField source="financeur[@id]" reference="financeurs" allowEmpty link="show">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField source="financeurSuivi[@id]" reference="financeurs" allowEmpty link="show">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField source="mc[@id]" reference="users" link="show">
            <TextField source="username" />
          </ReferenceField>
          <ReferenceField source="equipement[@id]" reference="equipements" allowEmpty link="show">
            <EquipementField source="type" />
          </ReferenceField>
          <TextField source="openingProcedures" addLabel />
          <SelectField source="broyatLevel" choices={enumBroyat} addLabel />
          <ReferenceManyField source="suivis" reference="suivis" filter={{ 'composter.slug': slug }} sort={{ field: 'date', order: 'DESC' }}>
            <Datagrid>
              <DateField source="date" />
              <TextField source="description" sortable={false} />
              <NoteField source="animation" sortable={false} />
              <NoteField source="environnement" sortable={false} />
              <NoteField source="technique" sortable={false} />
              <NoteField source="autonomie" sortable={false} />
              <EditButton />
            </Datagrid>
          </ReferenceManyField>
          <AddNewSuivitButton />
          <ReferenceField source="approvisionnementBroyat[@id]" allowEmpty reference="approvisionnement_broyats">
            <TextField source="name" />
          </ReferenceField>
          <ReferenceManyField
            source="livraisonBroyats"
            reference="livraison_broyats"
            filter={{ 'composter.slug': slug }}
            sort={{ field: 'date', order: 'DESC' }}
          >
            <Datagrid>
              <DateField source="date" />
              <TextField source="quantite" sortable={false} />
              <ReferenceField source="livreur[@id]" reference="approvisionnement_broyats" link={false} allowEmpty sortable={false}>
                <TextField source="name" />
              </ReferenceField>
              <EditButton />
            </Datagrid>
          </ReferenceManyField>
          <AddNewLivraisonBroyatButton />
          <ReferenceManyField source="reparations" reference="reparations" filter={{ 'composter.slug': slug }} sort={{ field: 'date', order: 'DESC' }}>
            <Datagrid>
              <DateField source="date" />
              <BooleanField source="done" sortable={false} />
              <TextField source="description" sortable={false} />
              <EditButton />
            </Datagrid>
          </ReferenceManyField>
          <AddNewReparationsButton />
          <FreqField />
          <BooleanArrayField fields={['signaletiqueRond', 'signaletiquePanneau']} title="Signalétique" />
          <BooleanArrayField fields={['hasCroc', 'hasCadenas', 'hasFourche', 'hasThermometre', 'hasPeson']} title="Outillage présent" />
        </Tab>
        <Tab label="Contact">
          <ReferenceManyField label="Utilisateurs" reference="user_composters" target="composter" source="rid" pagination={<Pagination />} perPage={5} sort={{ field: 'capability', order: 'DESC' }}>
            <Datagrid>
              <TextField source="user.username" />
              <TextField source="user.firstname" />
              <TextField source="user.lastname" />
              <TextField source="user.email" />
              <TextField source="user.phone" />
              <TextField source="user.role" />
              <TextField source="capability" sortable={false} />
              <EditButton />
            </Datagrid>
          </ReferenceManyField>
          <ReferenceManyField label="Contacts" reference="contacts" target="composters" source="slug">
            <Datagrid>
              <TextField source="firstName" />
              <TextField source="lastName" />
              <TextField source="phone" />
              <TextField source="email" />
              <TextField source="role" />
              <EditButton />
            </Datagrid>
          </ReferenceManyField>
        </Tab>
      </TabbedShowLayout>
    </Show>
  )
}

export default translate(ComposterShow)
