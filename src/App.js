import React from 'react'
import { HydraAdmin, ResourceGuesser } from '@api-platform/admin'
import { Route } from 'react-router-dom'
import polyglotI18nProvider from 'ra-i18n-polyglot'
import frenchMessages from 'ra-language-french'
import englishMessages from 'ra-language-english'
import { Room, Person, Archive, LocalShipping, Build, Pageview, Style, Contacts, Photo, PersonOutline, EuroSymbol, LocationCity } from '@material-ui/icons'

import SimpleNameList from './components/SimpleNameList'
import EquipementsList from './components/EquipementsList'
import Dashboard from './components/Dashboard'
import dataProvider from './components/DataProvider'
import Layout from './components/Layout'
import frenchResourcesTranslation from './i18n/fr'
import authProvider from './authProvider'
import compostriTheme from './theme'

import { ComposterCreate, ComposterList, ComposterShow, ComposterEdit } from './components/composters'
import { ContactList, ContactCreate, ContactEdit, ContactShow } from './components/contacts'
import { FinanceurCreate, FinanceurEdit, FinanceurShow } from './components/financeurs'
import { LivraisonBroyatsCreate, LivraisonBroyatsEdit, LivraisonBroyatsShow, LivraisonBroyatsList } from './components/livraisonBroyats'
import { MediasCreate, MediasList } from './components/medias'
import { ReparationList, ReparationEdit, ReparationCreate, ReparationShow } from './components/reparations'
import { SuivisList, SuivisShow, SuivisEdit, SuivisCreate } from './components/suivis'
import { UserCreate, UserEdit, UserList, UserShow } from './components/users'
import { UserComposterCreate, UserComposterShow, UserComposterEdit, UserComposterList } from './components/usersComposters'
import { ProfileEdit } from './components/profile'

const entrypoint = process.env.REACT_APP_API_ENTRYPOINT

const messages = {
  fr: { ...frenchMessages, ...frenchResourcesTranslation },
  en: { ...englishMessages },
}
const i18nProvider = polyglotI18nProvider((locale) => {
  return messages[locale]
}, 'fr')

const app = () => (
  <HydraAdmin
    dataProvider={dataProvider}
    authProvider={authProvider}
    entrypoint={entrypoint}
    layout={Layout}
    theme={compostriTheme}
    i18nProvider={i18nProvider}
    dashboard={Dashboard}
    customRoutes={[<Route key="profile" exact path="/mon-profile" component={ProfileEdit} />]}
  >
    <ResourceGuesser name="composters" create={ComposterCreate} edit={ComposterEdit} show={ComposterShow} list={ComposterList} icon={Archive} />
    <ResourceGuesser name="suivis" create={SuivisCreate} edit={SuivisEdit} show={SuivisShow} list={SuivisList} icon={Pageview} />
    <ResourceGuesser
      name="livraison_broyats"
      create={LivraisonBroyatsCreate}
      edit={LivraisonBroyatsEdit}
      show={LivraisonBroyatsShow}
      list={LivraisonBroyatsList}
      icon={LocalShipping}
    />
    <ResourceGuesser name="reparations" create={ReparationCreate} edit={ReparationEdit} show={ReparationShow} list={ReparationList} icon={Build} />
    <ResourceGuesser name="users" list={UserList} create={UserCreate} show={UserShow} edit={UserEdit} icon={Person} />
    <ResourceGuesser
      name="user_composters"
      create={UserComposterCreate}
      edit={UserComposterEdit}
      show={UserComposterShow}
      list={UserComposterList}
      icon={PersonOutline}
    />
    <ResourceGuesser name="contacts" create={ContactCreate} edit={ContactEdit} show={ContactShow} list={ContactList} icon={Contacts} />
    <ResourceGuesser name="media_objects" create={MediasCreate} list={MediasList} options={{ nextDivider: true }} icon={Photo} />
    <ResourceGuesser name="poles" list={SimpleNameList} icon={Room} />
    <ResourceGuesser name="quartiers" list={SimpleNameList} icon={Room} />
    <ResourceGuesser name="communes" list={SimpleNameList} icon={LocationCity} />
    <ResourceGuesser name="categories" list={SimpleNameList} icon={Style} />
    <ResourceGuesser name="equipements" list={EquipementsList} icon={Archive} />
    <ResourceGuesser name="approvisionnement_broyats" icon={LocalShipping} />
    <ResourceGuesser name="financeurs" create={FinanceurCreate} edit={FinanceurEdit} show={FinanceurShow} list={SimpleNameList} icon={EuroSymbol} />
  </HydraAdmin>
)

export default app
