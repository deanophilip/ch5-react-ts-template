// Uncomment the below line if you are using CH5 components.
// import '@crestron/ch5-theme/output/themes/light-theme.css' // Crestron CSS. @crestron/ch5-theme/output/themes shows the other themes that can be used.
import './assets/css/App.css' // Your CSS
import { useState, useEffect, useMemo } from 'react';
import useWebXPanel from './hooks/useWebXPanel';
import '@crestron/ch5-theme/output/themes/light-theme.css'

// Initialize eruda for panel/app debugging capabilities (in dev mode only)
if (import.meta.env.VITE_APP_ENV === 'development') {
  import('eruda').then(({ default: eruda }) => {
    eruda.init();
  });
}

function TestApp() {
  const [connectedToCS_State, setConnectedToCS] = useState(false);
  const [digitalState1, setDigitalState1] = useState(false);
  const [digitalState2, setDigitalState2] = useState(false);
  const [digitalState3, setDigitalState3] = useState(false);
  const [digitalState4, setDigitalState4] = useState(false);
  const [analogState, setAnalogState] = useState(0);
  const [serialState, setSerialState] = useState("");
  const [digitalContractState, setDigitalContractState] = useState(false);
  const [analogContractState, setAnalogContractState] = useState(0);
  const [serialContractState, setSerialContractState] = useState("");

  const webXPanelConfig = useMemo(() => ({
    ipId: '0xC0',
    host: 'LDHP-CP4',
    roomId: '',
    authToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsIlNvdXJjZSI6IkNvbnRyb2wgU3lzdGVtIn0.eyJleHAiOjE3NTQzMzY3MDAsInVzZXJuYW1lIjoiT2ZmbGluZVRva2VuIiwiT3B0aW9uYWwiOiIxODQwNDU0NzI5In0.EecAQ-wPzyG8ANTqJrOCDjMyYdjXCzWuQL8MowxTvNM'
  }), []); // Dependencies array is empty, so this object is created only once

  useWebXPanel(webXPanelConfig);

  useEffect(() => {
    // Listen for digital, analog, and serial joins 1 from the control system.
    // d1Id, a1Id, and s1Id are the subscription IDs for each join, they are 
    // only used to unsubscribe from the join when the component unmounts

    const connectedToCS = window.CrComLib.subscribeState('b', 'Csig.All_Control_Systems_Online_fb', (value: boolean) => setConnectedToCS(value));
    const d1Id = window.CrComLib.subscribeState('b', '1', (value: boolean) => setDigitalState1(value));
    const d2Id = window.CrComLib.subscribeState('b', '2', (value: boolean) => setDigitalState2(value));
    const d3Id = window.CrComLib.subscribeState('b', '3', (value: boolean) => setDigitalState3(value));
    const d4Id = window.CrComLib.subscribeState('b', '4', (value: boolean) => setDigitalState4(value));
    const a1Id = window.CrComLib.subscribeState('n', '1', (value: number) => setAnalogState(value));
    const s1Id = window.CrComLib.subscribeState('s', '1', (value: string) => setSerialState(value));

    // Contracts
    const dc1Id = window.CrComLib.subscribeState('b', 'HomePage.DigitalState', (value: boolean) => setDigitalContractState(value));
    const ac1Id = window.CrComLib.subscribeState('n', 'HomePage.AnalogState', (value: number) => setAnalogContractState(value));
    const sc1Id = window.CrComLib.subscribeState('s', 'HomePage.StringState', (value: string) => setSerialContractState(value));

    return () => {
      // Unsubscribe from digital, analog, and serial joins 1 when component unmounts
      window.CrComLib.unsubscribeState('b', 'Csig.All_Control_Systems_Online_fb', connectedToCS);
      window.CrComLib.unsubscribeState('b', '1', d1Id);
      window.CrComLib.unsubscribeState('b', '2', d2Id);
      window.CrComLib.unsubscribeState('b', '3', d3Id);
      window.CrComLib.unsubscribeState('b', '4', d4Id);
      window.CrComLib.unsubscribeState('n', '1', a1Id);
      window.CrComLib.unsubscribeState('s', '1', s1Id);

      // Contracts
      window.CrComLib.unsubscribeState('b', 'HomePage.DigitalState', dc1Id);
      window.CrComLib.unsubscribeState('n', 'HomePage.AnalogState', ac1Id);
      window.CrComLib.unsubscribeState('s', 'HomePage.StringState', sc1Id);
    }
  }, []);

  // Send digital, analog, and serial 1 joins to the control system
  const sendDigital1 = (value: boolean) => window.CrComLib.publishEvent('b', '1', value);
  const sendDigital2 = (value: boolean) => window.CrComLib.publishEvent('b', '2', value);
  const sendDigital3 = (value: boolean) => window.CrComLib.publishEvent('b', '3', value);
  const sendDigital4 = (value: boolean) => window.CrComLib.publishEvent('b', '4', value);
  const sendAnalog = (value: number) => window.CrComLib.publishEvent('n', '1', value);
  const sendSerial = (value: string) => window.CrComLib.publishEvent('s', '1', value);

  // Contracts
  const sendDigitalContract = (value: boolean) => window.CrComLib.publishEvent('b', 'HomePage.DigitalEvent', value);
  const sendAnalogContract = (value: number) => window.CrComLib.publishEvent('n', 'HomePage.AnalogEvent', value);
  const sendSerialContract = (value: string) => window.CrComLib.publishEvent('s', 'HomePage.StringEvent', value);

  return (
    <>
      {/* Joins */}
      <p style={{ color: 'white' }} id="currentConnectionStatus">Control System: {connectedToCS_State?"Online":"Offline"}</p>
      <p style={{ color: 'white' }}>Joins</p>
      <div className="controlGroupWrapper">
        <div className="controlGroup">
          <button id="sendDigital1Button" className="btn" onClick={() => sendDigital1(!digitalState1)}>Toggle Digital</button>
          <button id="sendDigital2Button" className="btn" onClick={() => sendDigital2(!digitalState2)}>Toggle Digital</button>
          <button id="sendDigital3Button" className="btn" onClick={() => sendDigital3(!digitalState3)}>Toggle Digital</button>
          <button id="sendDigital4Button" className="btn" onClick={() => sendDigital4(!digitalState4)}>Toggle Digital</button>
          <p id="currentDigital1Value">{digitalState1.toString()}</p>
          <p id="currentDigital2Value">{digitalState2.toString()}</p>
          <p id="currentDigital3Value">{digitalState3.toString()}</p>
          <p id="currentDigital4Value">{digitalState4.toString()}</p>
        </div>
        <div className="controlGroup">
            <p id="currentAnalogValue">{analogState}</p>
            <input type="range" min="0" max="65535" value={analogState} placeholder="32767" id="analogSlider" onChange={(e) => sendAnalog(Number(e.target.value))} />
        </div>
        <div className="controlGroup">
            <input type="text" name="Data" id="currentSerialValue" placeholder="Placeholder" value={serialState} onChange={(e) => sendSerial(e.target.value)} />
            <p id="currentSerialValue">{serialState}</p>
        </div>
      </div>
      {/* Contracts */}
      <p style={{ color: 'white' }}>Contracts</p>
      <div className="controlGroupWrapper">
        <div className="controlGroup">
          <button id="sendDigitalButton" className="btn" onClick={() => sendDigitalContract(!digitalContractState)}>Toggle Digital</button>
          <p id="currentDigitalValue">{digitalContractState.toString()}</p>
        </div>
        <div className="controlGroup">
            <p id="currentAnalogValue">{analogContractState}</p>
            <input type="range" min="0" max="65535" value={analogContractState} placeholder="32767" id="analogSlider" onChange={(e) => sendAnalogContract(Number(e.target.value))} />
        </div>
        <div className="controlGroup">
            <input type="text" name="Data" id="currentSerialValue" placeholder="Placeholder" value={serialContractState} onChange={(e) => sendSerialContract(e.target.value)} />
        </div>
      </div>
    </>
  )
}

export default TestApp
