import React, { useEffect, useState } from 'react';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {Display, Root, CardGrid } from './styled' 
import { firestore } from '../services/firebase';

interface WorkoutCardDetail {
  userId: string,
  workoutScore?: number
};

export default function WorkoutBoard() {
  const [userScore, setUserScore] = useState<WorkoutCardDetail|undefined>(); 
   
  useEffect(() => { 
    firestore
    .collection('workout')
    .get()
    .then((snapshot)=> {
    snapshot.docs.forEach(doc => {
      setUserScore({
        userId: doc.data().user.userId,
        workoutScore: (Object.values(doc.data().workoutSession.types))
        .map((value) => value === "homeWorkout" ? 3 : "extraPoint" ? 2 : 1)
        .reduce((a,b) => a + b , 0)
        })
      });
    });
  })

  return (
    <React.Fragment>
      <Display>
      {userScore ? (
      <CardGrid item xs={4}>
      <Root variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
        {userScore.userId}
        </Typography>
        <Divider />
        <Typography>
        {userScore.workoutScore}
        </Typography>
      </CardContent>
      </Root>
      </CardGrid>
      ) : "" }
  </Display>
  </React.Fragment>
  );
    };