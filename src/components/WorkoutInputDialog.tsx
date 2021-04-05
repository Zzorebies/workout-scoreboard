import React, { useCallback, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { WorkoutTypes } from '../domain/workout';
import { addWorkout } from '../services/workoutService';

interface WorkoutInputDialogProps {
  isDialogOpen: boolean;
  handleClose: () => void;
}

interface WorkoutCheckboxOption {
  name: WorkoutTypes;
  label: string;
}

type CheckboxSelection = {
  [key in WorkoutTypes]: boolean;
};

const workoutOptions: WorkoutCheckboxOption[] = [
  {
    name: WorkoutTypes.HomeWorkout,
    label: 'Home Workout (min 20 mins)'
  },
  {
    name: WorkoutTypes.Walking,
    label: 'Walking (min 3k steps)'
  },
  {
    name: WorkoutTypes.Stretching,
    label: 'Stretching (min 10 mins)'
  },
  {
    name: WorkoutTypes.ExtraPoint,
    label: 'Extra Point'
  }
];

const initialWorkoutSelection = workoutOptions.reduce<CheckboxSelection>(
  (acc, current) => ({ ...acc, [current.name]: false }),
  {} as CheckboxSelection
);

export const WorkoutInputDialog: React.FC<WorkoutInputDialogProps> = ({
  isDialogOpen, handleClose
}) => {
  const [workoutDate, setWorkoutDate] = useState<Date | null>(new Date());

  const [workoutSelection, setWorkoutSelection] = useState<CheckboxSelection>(
    initialWorkoutSelection
  );

  const handleWorkoutSelection = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWorkoutSelection({
      ...workoutSelection,
      [event.target.name]: event.target.checked
    });
  };

  const selectedWorkoutTypes = Object.entries(workoutSelection)
    .filter(([, checked]) => checked)
    // TODO: Would be good to find a way to remove the as keyword here
    .map(([workoutType]) => workoutType as WorkoutTypes);

  const onSubmit = useCallback(async () => {
    if (workoutDate) {
      await addWorkout({
        // TODO: Populate user detail from actual user after implementing authentication
        user: {
          userId: 'Test user 1',
          groupName: 'Namaste'
        },
        workoutSession: {
          types: selectedWorkoutTypes,
          date: workoutDate
        }
      });

      setWorkoutSelection(initialWorkoutSelection);
      // TODO: Remove this - only for test purpose
      window.confirm('Workout submitted');
    }
  }, [selectedWorkoutTypes, workoutDate]);

  return (
    <Dialog open={isDialogOpen}>
      <DialogContent>
        <Box display="flex" flexDirection="column">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Workout Date"
              value={workoutDate}
              onChange={setWorkoutDate}
              KeyboardButtonProps={{
                'aria-label': 'Change date'
              }}
            />
          </MuiPickersUtilsProvider>
          {workoutOptions.map(({ name, label }) => (
            <FormControlLabel
              key={label}
              control={
                <Checkbox
                  color="primary"
                  checked={workoutSelection[name]}
                  onChange={handleWorkoutSelection}
                  name={name}
                />
              }
              label={label}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClose}>Close</Button>
        <Button variant="contained" color="primary" onClick={onSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
