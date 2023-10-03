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
      <ReferenceInput source="categorie[@id]" reference="categories" allowEmpty>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="permanencesDescription" />
      <BooleanInput source="acceptNewMembers" />
      <TextInput source="description" multiline />
      <TextInput source="publicDescription" multiline />
      <ReferenceInput source="financeur[@id]" reference="financeurs" allowEmpty>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="financeurSuivi[@id]" reference="financeurs" allowEmpty>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="commune[@id]" reference="communes" allowEmpty>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="pole[@id]" reference="poles" allowEmpty>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <ReferenceInput source="quartier[@id]" reference="quartiers" allowEmpty>
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="address" validate={required()} />
      <ReferenceInput source="mc[@id]" reference="users" filter={{ roles: 'ROLE_ADMIN' }}>
        <SelectInput optionText="username" />
      </ReferenceInput>
      <ReferenceInput source="equipement[@id]" reference="equipements">
        <SelectInput optionText={(record) => `${record.type} ${record.capacite}`} />
      </ReferenceInput>
      <TextInput source="openingProcedures" />
      <ReferenceInput source="approvisionnementBroyat[@id]" reference="approvisionnement_broyats" allowEmpty>
        <SelectInput source="name" />
      </ReferenceInput>
      <TextInput source="AlimentsAutorises" />
      <TextInput source="alimentsNonAutorises" />
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
      <NumberInput source="lat" />
      <NumberInput source="lng" />
      <MapInput />
    </SimpleForm>
  )
}
export default ComposterInputs
