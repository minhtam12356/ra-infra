## RA Infra

### Installation

Install through git

### Usage

Refer IApplication type for more information!

```javascript
<Ra
  urls={{
    base: '<your_api_endpoint>',
    auth: '<sign_in_path>', // Default is login
  }}
  resources={[
    { name: 'users', list: ListGuesser },
    { name: 'posts', list: ListGuesser },
  ]}
  requireAuth
  // Rest of parameters are same to React Admin
/>
```

### Configuration

**React app - Create React App**

```
Config nothing
Note: There are warning from this lib, please just ignore it!
```

**React app - Vite**

```javascript
export default defineConfig({
  ...
  // Add these lines to your vite.config.ts
  define: {
    process: {
      env: {},
    },
  },
});
```

### Usage

#### Providers

```javascript
const listLanguages = [
  { locale: 'en', name: 'English' },
  //...
];

const i18n = {
  en: {...},
  fr: {...},
  //...
};


const dataProvider = getDataProvider({
  baseUrl: 'YOUR_BASE_URL',
  authPath: 'YOUR-ENDPOINT', //api for login
});

//---------------------------------------------------
const authProvider = getAuthProvider({
  dataProvider,
  authPath: 'YOUR-ENDPOINT', //api for login
});

//---------------------------------------------------
const i18nProvider = getI18nProvider({
  i18n,
  listLanguages,
});

 <Admin
   requireAuth
   i18nProvider={i18nProvider}
   dataProvider={dataProvider}
   authProvider={authProvider}
   {...rest}
 >
 </Admin>

```
