import { SvgXml } from 'react-native-svg';
import React from "react";

let myAccountIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
<path data-name="user_inactove" d="M233.683 11.411a6.059 6.059 0 1 0-5.376 0 10.026 10.026 0 0 0-7.3 8 .506.506 0 0 0 1 .161 9.131 9.131 0 0 1 17.989 0 .5.5 0 0 0 .5.415.49.49 0 0 0 .085-.007.5.5 0 0 0 .414-.57 10.031 10.031 0 0 0-7.316-8M231 11.046a4.973 4.973 0 1 1 5.041-4.973A4.985 4.985 0 0 1 231 11.046" transform="translate(-221.005)" style="fill:#636e73"/>
</svg>`;
export function MyAccountIcon(){
    return <SvgXml xml={myAccountIcon} width={140} style={{flex:1, flexDirection: 'row'}}/>
}
