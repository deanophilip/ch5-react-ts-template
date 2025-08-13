import React from 'react';
import { Outlet } from 'react-router-dom';
import classes from './MainLayout.module.scss';
import CsConnectionStatus from '../../../components/connectionStatus';

/**
 * The main layout, based on Habanero with a header, footer and content area with volume on the right side.
 * Uses CSS grid
 * @param param0 
 * @returns 
 */
export const MainLayout = ({header, footer, comlib, volume, showVolume}: MainLayoutProps) => {
  return (
    <div className={`${classes.vp}`}>
      <div className={classes.header}>{header}</div>
      <div className={classes.grid}>
        <Outlet context={{ CrComLib: comlib }}/>
        {showVolume && <div className={`${classes.volume}`}>{volume}</div>}
      </div>
      <div className={classes.footer}>{footer}</div>
      <CsConnectionStatus CrComLib={window.CrComLib} />
    </div>
    );
}

interface MainLayoutProps {
  header: React.ReactNode;
  footer: React.ReactNode;
  comlib: typeof import("@crestron/ch5-crcomlib/build_bundles/umd/@types/index");
  volume: React.ReactNode;
  showVolume?: boolean;
}