import React, {useState} from 'react';
import { WorkoutInputDialog } from './components/WorkoutInputDialog';
import WorkoutBoard from './components/WorkoutBoard';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import {StyledButton} from './styles'

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const handleClose = () => setIsDialogOpen(false);
  return (
    <>
    <WorkoutBoard />
    <StyledButton >
      <Fab color="secondary" aria-label="add" onClick={()=>setIsDialogOpen(true)}>
        <AddIcon />
      </Fab>
      </StyledButton>
      <WorkoutInputDialog handleClose={handleClose} isDialogOpen={isDialogOpen} />

    </>
  );
}

export default App;
