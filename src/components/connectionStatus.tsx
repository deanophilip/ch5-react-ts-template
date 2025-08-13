import '../assets/css/App.css' // Your CSS
import { useState, useEffect } from 'react';
import CrestronCH5 from "../lib/ch5";
import { CustomRouterProps } from 'src/routes/routerInterface';


const CsConnectionStatus = (context: CustomRouterProps) => {
  const [connectedToCS_State, setConnectedToCS] = useState<boolean|undefined>();
  console.log("CS State: " + connectedToCS_State);
  const [touchPanel_IP_State, setTouchPanel_IP] = useState("");
  const [controlSystem_IP_State, setControlSystem_IP] = useState("");
  useEffect(() => {
    // Listen for All_Control_Systems_Online_fb Reserve Join.
    // only used to unsubscribe from the join when the component unmounts
    const connectedToCS = context.CrComLib.subscribeState('b', CrestronCH5.ReservedJoin.Digital.State.Csig_All_Control_Systems_Online_fb, (value: boolean) => setConnectedToCS(value));
    console.log("CS State: " + connectedToCS_State);
    const touchPanel_IP = context.CrComLib.subscribeState('s', CrestronCH5.ReservedJoin.Serial.State.Csig_Ip_Address_fb, (value: string) => setTouchPanel_IP(value));
    const controlSystem_IP = context.CrComLib.subscribeState('s', "SystemDetails.ControlSystem_IP", (value: string) => setControlSystem_IP(value));
    return () => {
      // Unsubscribe from join when component unmounts
      context.CrComLib.unsubscribeState('b', 'Csig.All_Control_Systems_Online_fb', connectedToCS);
      context.CrComLib.unsubscribeState('s', CrestronCH5.ReservedJoin.Serial.State.Csig_Ip_Address_fb, touchPanel_IP);
      context.CrComLib.unsubscribeState('s', "SystemDetails.ControlSystem_IP", controlSystem_IP);
    }
  }, []);

  return (
    <div className={`connectionStatus ${(connectedToCS_State === undefined ? '' : connectedToCS_State) ? 'connected':'disconnected'} ${context.className}`}>
      <span className="status-text">
        {connectedToCS_State ? 'Connected to Control System' : 'Disconnected from Control System'}
        {touchPanel_IP_State ? 'Touch Panel IP: ' + touchPanel_IP_State : ''}
        {controlSystem_IP_State ? 'Control System IP: ' + controlSystem_IP_State : ''}
      </span>
    </div>
  )
}

export default CsConnectionStatus
