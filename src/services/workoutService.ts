import { firestore as firestorm } from './firebase';
import { WorkoutTypes } from '../domain/workout';

interface WorkoutSession {
  types: WorkoutTypes[];
  date: Date;
}

interface User {
  userId: string;
  groupName: string;
}

interface WorkoutEntry {
  workoutSession: WorkoutSession;
  user: User;
}

export const addWorkout = async (workoutInput: WorkoutEntry) =>
  await firestorm.collection('workout').add(workoutInput);
