import * as React from 'react';
import { SVGProps } from 'react';

const UpArrowIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M26 19L19 12M19 12L12 19M19 12V26M36.5 19C36.5 28.665 28.665 36.5 19 36.5C9.33502 36.5 1.5 28.665 1.5 19C1.5 9.33502 9.33502 1.5 19 1.5C28.665 1.5 36.5 9.33502 36.5 19Z" stroke="#006341" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default UpArrowIcon;