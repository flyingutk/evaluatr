import { SvgXml } from 'react-native-svg';
import React from "react";

let homeLogo_active = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="19.999" viewBox="0 0 20 19.999">
  <path id="home_active" d="M12.947,1.219a4.171,4.171,0,0,0-5.893,0L.732,7.545A2.486,2.486,0,0,0,0,9.313V17.5A2.5,2.5,0,0,0,2.5,20h5V15.053a2.5,2.5,0,1,1,5,0V20h5A2.5,2.5,0,0,0,20,17.5V9.313a2.483,2.483,0,0,0-.733-1.768Z" transform="translate(0 0)" fill="#963cbd"/>
</svg>`;
export function HomeIcon(){
    return <SvgXml xml={homeLogo_active} width={140} style={{flex:1, flexDirection: 'row'}}/>
}
