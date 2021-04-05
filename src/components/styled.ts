import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

export const Display = styled.div`
display: 'flex',
flexDirection: 'row'
`

export const Root = styled(Card) `
flexGrow: 1,
textAlign: 'center',
marginBottom: '20px',
`

export const CardGrid = styled(Grid) `
padding: theme.spacing(1)
`
