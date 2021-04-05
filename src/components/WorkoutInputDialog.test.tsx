import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WorkoutInputDialog } from './WorkoutInputDialog';
import { addWorkout } from '../services/workoutService';

jest.mock('../services/workoutService');

fdescribe('WorkoutInputDialog', () => {
  let handleClose: jest.MockedFunction<() => void>;

  beforeEach(() => {
    handleClose = jest.fn();
    window.confirm = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderWorkoutInputDialog = () => {
    const utils = render(<WorkoutInputDialog isOpen onClose={handleClose} />);

    const dialog = utils.getByRole('dialog');

    const dateTextInput = utils.getByLabelText(/workout date/i);

    const homeWorkoutCheckbox = utils.getByRole('checkbox', {
      name: /home workout/i
    });

    const walkingCheckbox = utils.getByRole('checkbox', {
      name: /walking/i
    });

    const stretchingCheckbox = utils.getByRole('checkbox', {
      name: /stretching/i
    });

    const extraPointCheckbox = utils.getByRole('checkbox', {
      name: /extra point/i
    });

    const closeButton = utils.getByRole('button', { name: /close/i });
    const submitButton = utils.getByRole('button', {
      name: /submit/i
    });

    return {
      ...utils,
      dialog,
      dateTextInput,
      homeWorkoutCheckbox,
      walkingCheckbox,
      stretchingCheckbox,
      extraPointCheckbox,
      closeButton,
      submitButton
    };
  };

  it('is displayed when isOpen is true', async () => {
    const {
      dialog,
      dateTextInput,
      homeWorkoutCheckbox,
      walkingCheckbox,
      stretchingCheckbox,
      extraPointCheckbox,
      closeButton,
      submitButton
    } = renderWorkoutInputDialog();

    expect(dialog).toBeInTheDocument();
    expect(dateTextInput).toBeInTheDocument();
    expect(homeWorkoutCheckbox).toBeInTheDocument();
    expect(walkingCheckbox).toBeInTheDocument();
    expect(stretchingCheckbox).toBeInTheDocument();
    expect(extraPointCheckbox).toBeInTheDocument();
    expect(closeButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('is hidden when isOpen is false', () => {
    render(<WorkoutInputDialog isOpen={false} onClose={handleClose} />);

    const dialog = screen.queryByRole('dialog');

    expect(dialog).not.toBeInTheDocument();
  });

  it('calls onClose callback on close button click', async () => {
    const { closeButton } = renderWorkoutInputDialog();

    userEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalled();
  });

  it('adds workout and clear checkbox selection on submit', async () => {
    const {
      homeWorkoutCheckbox,
      walkingCheckbox,
      stretchingCheckbox,
      extraPointCheckbox,
      submitButton
    } = renderWorkoutInputDialog();

    userEvent.click(homeWorkoutCheckbox);
    userEvent.click(submitButton);

    expect(addWorkout).toHaveBeenCalled();

    const checkboxes = [
      homeWorkoutCheckbox,
      walkingCheckbox,
      stretchingCheckbox,
      extraPointCheckbox
    ];

    await waitFor(() =>
      checkboxes.forEach((cb) => expect(cb).not.toBeChecked())
    );
  });

  it('disables submit button if no checkbox is selected', () => {
    const {
      homeWorkoutCheckbox,
      walkingCheckbox,
      stretchingCheckbox,
      extraPointCheckbox,
      submitButton
    } = renderWorkoutInputDialog();

    const checkboxes = [
      homeWorkoutCheckbox,
      walkingCheckbox,
      stretchingCheckbox,
      extraPointCheckbox
    ];

    checkboxes.forEach((checkbox) => expect(checkbox).not.toBeChecked());
    expect(submitButton).toBeDisabled();

    userEvent.click(homeWorkoutCheckbox);

    expect(homeWorkoutCheckbox).toBeChecked();
    expect(submitButton).toBeEnabled();

    userEvent.click(homeWorkoutCheckbox);

    expect(homeWorkoutCheckbox).not.toBeChecked();
    expect(submitButton).toBeDisabled();
  });

  it('disables submit button if date is invalid', async () => {
    const {
      dateTextInput,
      homeWorkoutCheckbox,
      submitButton
    } = renderWorkoutInputDialog();

    userEvent.click(homeWorkoutCheckbox);

    expect(homeWorkoutCheckbox).toBeChecked();
    expect(submitButton).toBeEnabled();

    userEvent.clear(dateTextInput);

    await (() => expect(submitButton).toBeDisabled());

    userEvent.type(dateTextInput, '05042021');

    await (() => expect(submitButton).toBeEnabled());
  });
});
