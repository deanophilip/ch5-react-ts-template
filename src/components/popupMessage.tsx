import classes from '../assets/css/footer.module.scss';

export interface PopupMessageActionProps {
  label: string;
  className?: string;
  action: () => void;
}

export interface PopupMessageProps {
  className?: string;
  popupType: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  actions: PopupMessageActionProps[];
  CrComLib: typeof import("@crestron/ch5-crcomlib/build_bundles/umd/@types/index");
}

const popupMessage = (props: PopupMessageProps) => {



  return (
    <div className={`${classes.popupMessage} ${classes[props.popupType]} ${props.className}`}>
      <div className={classes.popupContent}>
        <h2 className={classes.popupTitle}>{props.title}</h2>
        <p className={classes.popupMessageBody}>{props.message}</p>
        <div className={classes.popupActions}>
          {props.actions.map((action, index) => (
            <button key={index} className={`${classes.popupActionBtn}`} onClick={action.action}>{action.label}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default popupMessage;