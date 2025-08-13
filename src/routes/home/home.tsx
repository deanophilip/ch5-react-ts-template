import { Suspense } from "react";
import { useOutletContext } from "react-router-dom";
//import CrestronCH5 from "../../lib/ch5";
import { CustomRouterProps } from "../../routes/routerInterface";

const HomePage = () => {
  const context  = useOutletContext<CustomRouterProps>();
  context.CrComLib.publishEvent('string', 'InterfaceDetails[0].ActivePage_Set', 'home');
  context.CrComLib.publishEvent('string', '1', 'home');
  console.log("Home Page Rendered");

  return (
    <Suspense fallback={null}>
      <div>Home Page</div>

    </Suspense>
  );
};

export default HomePage;