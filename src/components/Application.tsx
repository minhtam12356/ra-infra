import React from 'react';
import reactLogo from '@/assets/react.svg';
import viteLogo from '/vite.svg';
import '@/theme/App.css';
import { NetworkHelper } from '@/helpers/network.helper';

const networkHelper = new NetworkHelper({
  name: 'test',
  requestConfigs: {
    baseURL: 'https://develop.sm-erp-be.minimaltek.com/v1/api',
  },
});

const App: React.FC = () => {
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    networkHelper
      .post({
        url: '/auth/signIn',
        body: {
          identifier: {
            scheme: 'username',
            value: 'administrator',
          },
          credential: {
            scheme: 'basic',
            value: 'administrator',
          },
          framework: 'WEB',
        },
      })
      .then((rs) => {
        console.log(rs);
      });
  }, []);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
};

export default App;
