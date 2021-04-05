import React, { useCallback, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';

import { WorkoutTypes } from '../domain/workout';
import { addWorkout } from '../services/workoutService';

interface WorkoutInputDialogProps {
  isOpen: boolean;
  onClose: () => void;
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
  isOpen,
  onClose
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
          userId: 'Test user',
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

  const isDateInvalid = workoutDate?.toString() === 'Invalid Date';

  const isWorkoutNotSelected = !Object.values(workoutSelection).some(
    (checked) => checked
  );

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent>
        <Box display="flex" flexDirection="column">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              format="dd/MM/yyyy"
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
          <FormControl
            required
            error={isWorkoutNotSelected}
            component="fieldset"
          >
            <FormGroup>
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
              <FormHelperText>Select at least 1 workout</FormHelperText>
            </FormGroup>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={onSubmit}
          disabled={isDateInvalid || isWorkoutNotSelected}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};
