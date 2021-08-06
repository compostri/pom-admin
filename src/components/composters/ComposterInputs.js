import React, { useState, Fragment } from 'react'
import {
  FormDataConsumer,
  required,
  BooleanInput,
  DateInput,
  ImageField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin'
import { useForm } from 'react-final-form'

import MediasSelectDialog from '../medias/MediasSelectDialog'
import { enumBroyat, enumStatus } from '../Enums'
import MapInput from '../MapInput'

const MediaDialog = ({ setImage }) => {
  const form = useForm()

  return (
    <FormDataConsumer>
      {() => (
        <Fragment>
          <MediasSelectDialog
            onSelected={(img) => {
              setImage(img)
              form.change('image', img.id)
            }}
          />
        </Fragment>
      )}
    </FormDataConsumer>
  )
}

const ComposterInputs = ({ hasList, hasEdit, hasShow, hasCreate, ...rest }) => {
  const [image, setImage] = useState(null)

  return (
    <SimpleForm {...rest} redirect="show">
      <TextInput source="name" validate={required()} />
      <ReferenceField source="image[@id]" reference="media_objects" allowEmpty>
        <ImageField source="contentUrl" style={{ display: image ? 'none' : 'block' }} />
      </ReferenceField>
      {image && (
        <span
          style={{
            backgroundImage: `url(${image.contentUrl})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            height: '10rem',
            display: 'block',
            margin: '0.5rem',
          }}
        />
      )}
      <MediaDialog setImage={setImage} />
      <SelectInput source="status" choices={enumStatus} />
      <NumberInput source="serialNumber" />
      <TextInput source="plateNumber" />
      <DateInput source="DateMiseEnRoute" />
      <DateInput source="DateInauguration" />
      <DateInput source="DateInstallation" />
      <ReferenceInput source="categorie" reference="categories" allowEmpty format={(c) => (c instanceof Object ? c['@id'] : c)}>
        <SelectInput optionText="name" optionValue="@id" />
      </ReferenceInput>
      <TextInput source="permanencesDescription" />
      <BooleanInput source="acceptNewMembers" />
      <TextInput source="description" multiline />
      <TextInput source="publicDescription" multiline />
      <ReferenceInput source="financeur" reference="financeurs" allowEmpty format={(c) => (c instanceof Object ? c['@id'] : c)}>
        <SelectInput optionText="name" optionValue="@id" />
      </ReferenceInput>
      <ReferenceInput source="financeurSuivi" reference="financeurs" allowEmpty format={(c) => (c instanceof Object ? c['@id'] : c)}>
        <SelectInput optionText="name" optionValue="@id" />
      </ReferenceInput>
      <ReferenceInput source="commune" reference="communes" allowEmpty format={(c) => (c instanceof Object ? c['@id'] : c)}>
        <SelectInput optionText="name" optionValue="@id" />
      </ReferenceInput>
      <ReferenceInput source="pole" reference="poles" allowEmpty format={(c) => (c instanceof Object ? c['@id'] : c)}>
        <SelectInput optionText="name" optionValue="@id" />
      </ReferenceInput>
      <ReferenceInput source="quartier" reference="quartiers" allowEmpty format={(c) => (c instanceof Object ? c['@id'] : c)}>
        <SelectInput optionText="name" optionValue="@id" />
      </ReferenceInput>
      <TextInput source="address" validate={required()} />
      <ReferenceInput source="mc" reference="users" filter={{ roles: 'ROLE_ADMIN' }} format={(c) => (c instanceof Object ? c['@id'] : c)}>
        <SelectInput optionText="username" optionValue="@id" />
      </ReferenceInput>
      <ReferenceInput source="equipement" reference="equipements" format={(c) => (c instanceof Object ? c['@id'] : c)}>
        <SelectInput optionText={(record) => `${record.type} ${record.capacite}`} optionValue="@id" />
      </ReferenceInput>
      <TextInput source="openingProcedures" />
      <ReferenceInput source="approvisionnementBroyat" reference="approvisionnement_broyats" allowEmpty format={(c) => (c instanceof Object ? c['@id'] : c)}>
        <SelectInput source="name" optionValue="@id" />
      </ReferenceInput>
      <SelectInput source="broyatLevel" choices={enumBroyat} defaultValue={enumBroyat[0].id} />
      <NumberInput source="nbFoyersPotentiels" />
      <NumberInput source="nbInscrit" />
      <NumberInput source="nbDeposant" />
      <BooleanInput source="signaletiqueRond" />
      <BooleanInput source="signaletiquePanneau" />
      <BooleanInput source="hasCroc" />
      <BooleanInput source="hasCadenas" />
      <BooleanInput source="hasFourche" />
      <BooleanInput source="hasThermometre" />
      <BooleanInput source="hasPeson" />
      <NumberInput source="lat" />
      <NumberInput source="lng" />
      <MapInput />
    </SimpleForm>
  )
}
export default ComposterInputs
