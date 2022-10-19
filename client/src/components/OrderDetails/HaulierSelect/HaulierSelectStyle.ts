import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    autocomplete: {
        width: '100%',
        },
    listbox: {
        width: 475,
        margin: 0,
        padding: 5,
        zIndex: 1,
        position: 'absolute',
        left:'20%',
        listStyle: 'none',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        maxHeight: 200,
        border: 'none',
        boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;",
        '& li[data-focus="true"]': {
            backgroundColor: '#4a8df6',
            color: 'white',
            cursor: 'pointer',
        },
        '& li:active': {
            backgroundColor: '#2977f5',
            color: 'white',
        },
    },
    listItem: {
        "&:hover, &:focus": {
            backgroundColor: '#4a8df6',
            color: 'white',
            cursor: 'pointer',
        },
        '&:active': {
            backgroundColor: '#2977f5',
            color: 'white',
        },
    }
}));