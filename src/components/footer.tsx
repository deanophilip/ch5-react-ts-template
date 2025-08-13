import { CustomRouterProps } from 'src/routes/routerInterface';
import classes from '../assets/css/footer.module.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = (context: CustomRouterProps) => {

  const [systemPower_State, setSystemPowerState] = useState(false);
  const [systemPower_StateChanging, setSystemPowerChange] = useState(false);
  const [powerButtonText, setPowerText] = useState(systemPower_State?'System is On':'System is Off');

  useEffect(() => {
    // only used to unsubscribe from the join when the component unmounts
    const SystemPower = context.CrComLib.subscribeState('b', 'GeneralControls.PowerStatus', (value: boolean) => setSystemPowerState(value));
 
    return () => {
      // Unsubscribe from join when component unmounts
      context.CrComLib.unsubscribeState('b', 'GeneralControls.PowerStatus', SystemPower);
    }
  }, []);

  const pages = [
    { name: 'Home Page', path: '/' },
    { name: 'Info Page', path: '/info' }
  ];

  const handleMouseEnter = () => {
    setPowerText('Press to Power ' + (systemPower_State ? 'Off' : 'On'));
  };
  const handleMouseLeave = () => {
    setPowerText('System is ' + (systemPower_State ? 'On' : 'Off'));
  };

  const SystemPowerToggle = () => {
    if (systemPower_StateChanging) return; // Prevent multiple clicks while changing state
    if (!systemPower_State) {
      setSystemPowerChange(true);
      context.CrComLib.publishEvent('b', 'GeneralControls.PowerOn_Set', 1);
      context.CrComLib.publishEvent('b', 'GeneralControls.PowerOn_Set', 0);
    }
    else{
      //openPowerDownConfirmationModal(setSystemPowerChange);
    }
  }

  return (
    <span className={`${classes.footer} ${context.className}`}>
      <div className={`container ${classes.footer_grid}`}>
        <div className={classes.powerCol}>
          <button id="systemPower_Button" className={classes.powerButton} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => SystemPowerToggle()}>{powerButtonText}</button>
        </div>
        <div className={classes.routerCol}>
          <ul className={classes.routerList}>
            {pages.map((page, index) => (
              <Link key={index} to={page.path} className={classes.routerListItem}>
                {page.name}
              </Link>
            ))}
          </ul>
        </div>
        <div className={classes.warningCol}>
          Warning
        </div>
      </div>
    </span>
  );
}

export default Footer;