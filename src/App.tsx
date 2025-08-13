//import IconLibrary from './lib/shared/Icons/IconLibrary';
//import { MobileControlProvider } from './lib/shared/MobileControlProvider/MobileControlProvider';
import { Routes, Route } from 'react-router-dom';
import { useMemo } from 'react';
import useWebXPanel from './hooks/useWebXPanel';
// Update the import path to the actual location of MainLayout
import { MainLayout } from './lib';
import { HomePage, InfoPage } from './routes';
import Header from './components/header';
import Footer from './components/footer';
import MainVolume from './components/mainVolume';

// Initialize eruda for panel/app debugging capabilities (in dev mode only)
if (import.meta.env.VITE_APP_ENV === 'development') {
  import('eruda').then(({ default: eruda }) => {
    eruda.init();
  });
}

function App() {

  const webXPanelConfig = useMemo(() => ({
    ipId: '0xC0',
    host: 'LDHP-CP4',
    roomId: '',
    authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsIlNvdXJjZSI6IkNvbnRyb2wgU3lzdGVtIn0.eyJleHAiOjE3NTQzMzY3MDAsInVzZXJuYW1lIjoiT2ZmbGluZVRva2VuIiwiT3B0aW9uYWwiOiIxODQwNDU0NzI5In0.EecAQ-wPzyG8ANTqJrOCDjMyYdjXCzWuQL8MowxTvNM'
  }), []); // Dependencies array is empty, so this object is created only once

  useWebXPanel(webXPanelConfig);


  return ( 
    //<MobileControlProvider>
      <>
        <Routes>
          <Route path="/" element={
            <MainLayout
              header={<Header CrComLib={window.CrComLib}/>}
              comlib={window.CrComLib}
              footer={<Footer CrComLib={window.CrComLib}/>}
              volume={<MainVolume CrComLib={window.CrComLib}/>}
              showVolume={true}
            />
          }>
            <Route index element={<HomePage />} /> {/* Renders at '/' */}
            <Route path="info" element={<InfoPage />} />
          </Route>
        </Routes>
      </>
    //</MobileControlProvider>
  )
}

export default App