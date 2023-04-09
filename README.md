## RA Infra

### Installation

Install through git

### Usage

Refer IApplication type for more information!

```
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

```
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
