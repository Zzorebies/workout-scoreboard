import React, { useState } from 'react';

import styled from 'styled-components';
import { Box } from '@material-ui/core';

import { WorkoutInputDialog } from './components/WorkoutInputDialog';

// Placeholder
const StyledButton = styled.button`
  border: none;
  border-radius: 5px;
  background-color: salmon;
`;

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <WorkoutInputDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />

      <StyledButton onClick={() => setIsDialogOpen(true)}>
        Open Dialog
      </StyledButton>
    </Box>
  );
}

export default App;
