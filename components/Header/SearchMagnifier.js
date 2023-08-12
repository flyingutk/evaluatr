import { SvgXml } from 'react-native-svg';
import React, { useEffect, useState } from "react";

let searchMagnifier = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="14.998" viewBox="0 0 15 14.998">
<path id="search" d="M16.768,15.712l-2.781-2.76a6.744,6.744,0,1,0-1.042,1.043l2.758,2.76a.745.745,0,0,0,1.064-1.043ZM8.741,13.995a5.25,5.25,0,1,1,5.247-5.25,5.248,5.248,0,0,1-5.247,5.25Z" transform="translate(-1.979 -1.979)" fill="#636e73"/>
</svg>`;
export function SearchMagnifier(){
    return <SvgXml xml={searchMagnifier} width={20} style={{flex:1, flexDirection: 'row'}}/>
}
