import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const unityContextLocation = "public/Unity-WebGl-Build/Build";

const Gameprovider = () => {
  const unityProvider = useUnityContext({
    loaderUrl: `${unityContextLocation}/myunityapp.loader.js`,
    dataUrl: `${unityContextLocation}/myunityapp.data`,
    frameworkUrl: `${unityContextLocation}/myunityapp.framework.js.unityweb`,
    codeUrl: `${unityContextLocation}/myunityapp.wasm`,
  });

  return (
    <div>
      <Unity unityProvider={unityProvider}  />
    </div>
  );
};

export default Gameprovider;
