import { CustomRouterProps } from 'src/routes/routerInterface';
import classes from '../assets/css/powerDownConfirmation.module.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PowerDownConfirmation = (context: CustomRouterProps) => {

  const [systemPower_State, setSystemPowerToggle] = useState(false);

  useEffect(() => {
    // only used to unsubscribe from the join when the component unmounts
    const SystemPower = context.CrComLib.subscribeState('b', 'GeneralControls.PowerStatus', (value: boolean) => setSystemPowerToggle(value));
 
    return () => {
      // Unsubscribe from join when component unmounts
      context.CrComLib.unsubscribeState('b', 'GeneralControls.PowerStatus', SystemPower);
    }
  }, []);

  const pages = [
    { name: 'Home Page', path: '/' },
    { name: 'Info Page', path: '/info' }
  ];

  const setSystemPowerOff_Set = () => {
    context.CrComLib.publishEvent('b', 'GeneralControls.PowerOffConfirm_Set', 1)
    context.CrComLib.publishEvent('b', 'GeneralControls.PowerOffConfirm_Set', 0)
  };


  return (
    <span className={`${classes.footer} ${context.className}`}>
      <div className={`container ${classes.footer_grid}`}>
        <div className={classes.powerCol}>
          <button id="systemPower_Button" className="btn" onClick={() => setSystemPowerOff_Set()}>Power Button</button>
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

export default PowerDownConfirmation;