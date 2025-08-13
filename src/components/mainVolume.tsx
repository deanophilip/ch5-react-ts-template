import '../assets/css/mainVolume.css' // Your CSS
import { useState, useEffect } from 'react';
import { CustomRouterProps } from 'src/routes/routerInterface';

const MainVolume = (context: CustomRouterProps) => {

  const [mainVolume_State, setMainVolume] = useState<number>();
  const [mainVolumeMute_State, setMainVolumeMute] = useState(false);

  useEffect(() => {
    // Listen for All_Control_Systems_Online_fb Reserve Join.
    // only used to unsubscribe from the join when the component unmounts
    const mainVolume = context.CrComLib.subscribeState('n', 'GeneralControls.MainVolume', (value: number) => setMainVolume(value));
    const mainVolumeMute = context.CrComLib.subscribeState('b', 'GeneralControls.MainVolumeMute', (value: boolean) => setMainVolumeMute(value));

    return () => {
      // Unsubscribe from join when component unmounts
      context.CrComLib.unsubscribeState('n', 'GeneralControls.MainVolume', mainVolume);
      context.CrComLib.unsubscribeState('b', 'GeneralControls.MainVolumeMute', mainVolumeMute);
    }
  }, []);

  const setMainVolume_Set = (value: number) => context.CrComLib.publishEvent('n', 'GeneralControls.MainVolume_Set', value);
  const setMainVolumeMuteToggle_Set = () => {
    context.CrComLib.publishEvent('b', 'GeneralControls.MainVolumeMuteToggle_Set', 1);
    context.CrComLib.publishEvent('b', 'GeneralControls.MainVolumeMuteToggle_Set', 0);
  }
  const setMainVolumeUp_Set = (value:boolean) => {
    context.CrComLib.publishEvent('b', 'GeneralControls.MainVolumeMuteToggle_Set', value);
  }

  const setMainVolumeDown_Set = (value:boolean) => {
    context.CrComLib.publishEvent('b', 'GeneralControls.MainVolumeDown_Set', value);
  }

  return (
    <div className="volumeContainer">
      <button id="mainVolumeUp_Button" className="btn" onClick={() => setMainVolumeUp_Set(true)} /*onRelease={} */>Up</button>
      <input className="vertical-slider" type="range" min="0" max="65535" value={mainVolume_State} placeholder="0" id="analogSlider" onChange={(e) => setMainVolume_Set(Number(e.target.value))} />
      <p id="currentAnalogValue">{mainVolume_State?Math.round((mainVolume_State/65535)*100) + "%":"0%"}</p>
      <button id="mainVolumeDown_Button" className="btn" onClick={() => setMainVolumeDown_Set(true)} /*onRelease={} */>Down</button>
      <button id="mainVolumeMute_Button" className="btn" onClick={() => setMainVolumeMuteToggle_Set}>Mute</button>
    </div>
  );
}

export default MainVolume;