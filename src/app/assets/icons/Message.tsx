import * as React from 'react';
import { SVGProps } from 'react';

const MessageIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M3 4H25V18H11L7 24V18H3V4Z" stroke="#006341" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default MessageIcon;
