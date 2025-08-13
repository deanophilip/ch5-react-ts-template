import { Suspense } from "react";
import { useOutletContext } from "react-router-dom";
import { CustomRouterProps } from "../../routes/routerInterface";

const InfoPage = () => {
  const context  = useOutletContext<CustomRouterProps>();
  context.CrComLib.publishEvent('string', 'InterfaceDetails[0].ActivePage_Set', 'info');
  context.CrComLib.publishEvent('string', '1', 'info');
  console.log("Info Page Rendered");

  return (
    <Suspense fallback={null}>
      <div>Info Page</div>

    </Suspense>
  );
};

export default InfoPage;