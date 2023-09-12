import * as React from 'react';
import './App.css';
import { Paper, Typography, Button, TextField } from '@mui/material';
import { ResultsList } from './components/ResultsList';
import { Result } from './model/Result';
import { computeResults, deleteResult, updateResult } from './services/apiService';

function App() {
  const [results, setResults] = React.useState<Result[]>([]);
  const [duration, setDuration] = React.useState(0);

  const handleOnClickSolve = async () => {
    const startTime = new Date().getTime();
    const response = await computeResults();
    const body = await response.json();
    setResults(body);
    setDuration(new Date().getTime() - startTime);
  };

  const handleOnClickDelete = async (id: number) => {
    const resultToDelete = results.find(it => it.id === id);
    if (resultToDelete) {
      await deleteResult(id);
      setResults([...results.filter(it => it.id !== id)]);
    }
  };

  const handleOnClickUpdate = async (id: number, resultToUpdate: Result) => {
    const resultToUpdateIndex = results.findIndex(it => it.id === id);

    if (resultToUpdate && resultToUpdateIndex !== -1) {
      const response = await updateResult(id, resultToUpdate);
      if (response.ok) {
        const body = await response.json();
        const newResults = [...results]
        newResults.splice(resultToUpdateIndex, 1, body);
        setResults(newResults);
      } else {
        // When response.status === 406 (not a solution), nothing happens and the previous value should be rolled back (buggy)
        setResults([...results]);
      }
    }
  }

  return (
    <Paper className="App" elevation={4} sx={{
      bgcolor: 'rgb(233, 233, 230)',
      padding: '3vh'
    }}>
      <Typography variant='h3'>Bao Loc maths puzzle. Can you solve it?</Typography>
      <Typography variant='h5'>Problem: Fill the empty squares with the digits from 1 to 9 without using twice the same digit.</Typography>
      <div><img src={require('./BaoLocPuzzle.jpg')} /></div>
      <Typography variant='h5' sx={{ marginBottom: '12px' }}>If you can't solve it by your own, hit the 'Solve it!' button to get all the solutions.</Typography>

      <Button variant="contained" onClick={handleOnClickSolve} color='primary'>Solve it!</Button>

      {results.length > 0 && duration &&
        <ResultsList results={results} duration={duration} onClickUpdateCallback={handleOnClickUpdate} onClickDeleteCallback={handleOnClickDelete} />
      }
    </Paper >
  );

}

export default App;
