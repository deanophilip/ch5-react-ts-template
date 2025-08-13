import { CustomRouterProps } from 'src/routes/routerInterface';
import '../assets/css/header.css' // Your CSS
import { useState, useEffect } from 'react';

const Header = (context: CustomRouterProps) => {

  const [buildingName_State, setBuildingName] = useState("Example Elementary School");
  const [systemName_State, setSystemName] = useState("Example AV System");
  const [systemTime_State, setSystemTime] = useState("12:34 AM");
  const [systemDate_State, setSystemDate] = useState("January 1, 2025");
  console.log("Header Rendered");

  useEffect(() => {
    // Listen for All_Control_Systems_Online_fb Reserve Join.
    // only used to unsubscribe from the join when the component unmounts
    const buildingName = context.CrComLib.subscribeState('s', 'SystemDetails.SiteName', (value: string) => setBuildingName(value), (error) => console.error("Error subscribing to SystemDetails.SiteName:", error ));
    const systemName = context.CrComLib.subscribeState('s', 'SystemDetails.SystemLocation', (value: string) => setSystemName(value), (error) => console.error("Error subscribing to SystemDetails.SystemLocation:", error ));
    const systemTime = context.CrComLib.subscribeState('s', 'SystemDetails.SystemTime', (value: string) => setSystemTime(value), (error) => console.error("Error subscribing to SystemDetails.SystemTime:", error ));
    const systemDate = context.CrComLib.subscribeState('s', 'SystemDetails.SystemDate', (value: string) => setSystemDate(value), (error) => console.error("Error subscribing to SystemDetails.SystemDate:", error ));
    return () => {
      // Unsubscribe from join when component unmounts
      context.CrComLib.unsubscribeState('s', 'SystemDetails.SiteName', buildingName);
      context.CrComLib.unsubscribeState('s', 'SystemDetails.SystemLocation', systemName);
      context.CrComLib.unsubscribeState('s', 'SystemDetails.SystemTime', systemTime);
      context.CrComLib.unsubscribeState('s', 'SystemDetails.SystemDate', systemDate);
    }
  }, []);



  return (
    <span className="header">
      <div className='container flex flex-row items-center justify-between '>
        <ch5-button className="h-[100%]" type="info" stretch="both" color="#808080" shape="oval" iconClass="material-icons md-alarm_on" iconUrl='' iconPosition="first"></ch5-button>
        <div className="flex flex-col items-center text">
          <div className="text-2xl font-bold">{buildingName_State}</div>
          <div className="text-md">{systemName_State}</div>
        </div>
        <div className="flex flex-col items-center text">
          <div className="text-3xl font-bold">{systemTime_State}</div>
          <div className="text-sm">{systemDate_State}</div>
        </div>
      </div>
    </span>
  );
}

export default Header;