import styled from '@mui/material/styles/styled';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const tooltipStyle = {
    backgroundColor: 'white',
    maxWidth: 220,
    border: '1px solid #dadde9',
};

const HtmlTooltip = styled(({ className, ...props }: any) =>
    <Tooltip {...props} classes={{ popper: className }} />)
    (() => ({
        [`& .${tooltipClasses.tooltip}`]: tooltipStyle,
    }));

export default HtmlTooltip;