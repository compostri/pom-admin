import React from 'react'
import {
  Datagrid,
    downloadCSV,
  EditButton,
  ShowButton,
  List,
  SelectField,
  TextField,
  ReferenceField,
  Filter,
  ReferenceInput,
  SelectInput,
  TextInput,
  BooleanInput,
  SimpleList,
} from 'react-admin'
import { useMediaQuery } from '@material-ui/core'
import jsonExport from 'jsonexport/dist';

import { enumBroyat, enumStatus } from '../Enums'

const createdDateFilter = () => {
  const currentYear = new Date().getFullYear()
  let dateListe = []
  for (let year = 2007; year <= currentYear; year++) {
    dateListe.push({ id: year, name: year })
  }
  return dateListe
}

const ComposterFilter = (props) => (
  <Filter {...props}>
    <TextInput source="name" alwaysOn />
    <ReferenceInput source="commune" reference="communes" alwaysOn>
      <SelectInput optionText="name" optionValue="id" helperText="" />
    </ReferenceInput>
    <TextInput source="serialNumber" />
    <SelectInput source="status" helperText="" choices={enumStatus} />
    <ReferenceInput source="quartier" reference="quartiers">
      <SelectInput optionText="name" optionValue="id" helperText="" />
    </ReferenceInput>
    <ReferenceInput source="pole" reference="poles">
      <SelectInput optionText="name" optionValue="id" helperText="" />
    </ReferenceInput>
    <ReferenceInput source="categorie" reference="categories">
      <SelectInput optionText="name" optionValue="id" helperText="" />
    </ReferenceInput>
    <ReferenceInput source="financeur" reference="financeurs">
      <SelectInput optionText="name" optionValue="id" helperText="" />
    </ReferenceInput>
    <ReferenceInput source="financeurSuivi" reference="financeurs">
      <SelectInput optionText="name" optionValue="id" helperText="" />
    </ReferenceInput>
    <ReferenceInput source="mc" reference="users" filter={{ roles: 'ROLE_ADMIN' }} format={(c) => (c instanceof Object ? c['@id'] : c)}>
      <SelectInput optionText="username" optionValue="@id" helperText="" />
    </ReferenceInput>
    <ReferenceInput source="contacts" reference="contacts">
      <SelectInput optionText="firstName" optionValue="id" helperText="" />
    </ReferenceInput>
    <ReferenceInput source="equipement" reference="equipements">
      <SelectInput
        optionText={(record) => (
          <span>
            {record.type} {record.capacite}
          </span>
        )}
        optionValue="id"
        helperText=""
      />
    </ReferenceInput>
    <SelectInput source="broyatLevel" choices={enumBroyat} helperText="" />
    <SelectInput label="Date de mise en route" source="DateMiseEnRoute" choices={createdDateFilter()} helperText="" />
    <BooleanInput source="acceptNewMembers" defaultValue={true} />
  </Filter>
)

const exporter = posts => {
    const postsForExport = posts.map(post => {
        const { quartier, commune, equipement, approvisionnementBroyat, categorie, image, financeur, pole, mc,financeurSuivi, ...postForExport } = post; // omit backlinks and author
        postForExport.quartier_name = quartier ? quartier.name : '';
        postForExport.commune_name = commune ? commune.name : '';
        postForExport.equipement_type = equipement ? `${equipement.type} - ${equipement.capacite}` : '';
        postForExport.approvisionnementBroyat_name = approvisionnementBroyat ? approvisionnementBroyat.name : '';
        postForExport.categorie_name = categorie ? categorie.name : '';
        postForExport.financeur_name = financeur ? financeur.name : '';
        postForExport.financeurSuivi_name = financeurSuivi ? financeurSuivi.name : '';
        postForExport.pole_name = pole ? pole.name : '';
        postForExport.mc_name = mc ? `${mc.username} - ${mc.email}` : '';
        return postForExport;
    });
    jsonExport(postsForExport, {
        textDelimiter: '"',
        forceTextDelimiter: true,
        headers: ['@id', 'rid', 'name', 'slug', 'quartier_name', 'commune_name', 'equipement_type', 'approvisionnementBroyat_name', 'categorie_name', 'financeur_name','financeurSuivi_name', 'pole_name', 'mc_name'] // order fields in the export
    }, (err, csv) => {
        downloadCSV(csv, 'composteurs'); // download as 'posts.csv` file
    });
};

const ComposterList = (props) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  return (
    <List {...props} filters={<ComposterFilter />} sort={{ field: 'serialNumber', order: 'DESC' }} perPage={25} exporter={exporter}>
      {isSmall ? (
        <SimpleList
          linkType="show"
          primaryText={(record) => record.name}
          secondaryText={(record) => record.commune?.name}
          tertiaryText={(record) => record.status}
        />
      ) : (
        <Datagrid>
          <TextField source="serialNumber" />
          <TextField source="name" sortable={false} />
          <ReferenceField source="commune[@id]" reference="communes" link={false} allowEmpty sortable={false}>
            <TextField source="name" />
          </ReferenceField>
          <ReferenceField source="quartier[@id]" reference="quartiers" link={false} allowEmpty sortable={false}>
            <TextField source="name" />
          </ReferenceField>
          <SelectField source="status" choices={enumStatus} addLabel />
          <ShowButton />
          <EditButton />
        </Datagrid>
      )}
    </List>
  )
}

export default ComposterList
