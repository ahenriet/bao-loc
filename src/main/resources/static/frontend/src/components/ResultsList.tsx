import * as React from 'react';
import { Typography, Grid, FormControl } from "@mui/material";
import { Result } from "../model/Result";
import { ResultsListItem } from './ResultsListItem';
import { stringifyResult } from '../util/ResultUtil';

type ResultsListProps = {
    results: Result[];
    duration: number;
    onClickUpdateCallback: Function;
    onClickDeleteCallback: Function;
}

export function ResultsList({ results, duration, onClickUpdateCallback, onClickDeleteCallback }: ResultsListProps) {
    const [filterDigit, setFilterDigit] = React.useState<string>();
    var filteredResults = [...results];

    if (filterDigit && filterDigit.length > 1) { // for 0 and 1 digit numbers, all the list will be displayed
        filteredResults = ([...results].filter(it => {
            return stringifyResult(it).includes(filterDigit);
        }))
    }

    return (
        <>
            <Typography variant='h6' sx={{ marginTop: '12px' }}>The algorithm solved it in <b>{duration} ms</b> and found {results.length} solutions.</Typography>
            <Typography variant='h6'>You can try to modify a solution by clicking on it.</Typography>
            <Typography variant='h6'>If your solution works, it will be saved, otherwise the previous value will be rolled back.</Typography>
            <Typography variant='h6'>You can also delete a solution by hitting the trash icon.</Typography>
            <Grid >
                <FormControl>
                    <Typography variant='h6' sx={{ marginBottom: '12px' }}>Finally, you can filter on a number: </Typography>
                </FormControl>

                <FormControl>
                    <input
                        // size='small'
                        value={filterDigit}
                        onChange={event => {
                            if (/^[0-9]*$/.test(event.target.value)) {
                                setFilterDigit(event.target.value)
                            }
                        }} />
                </FormControl>
            </Grid>

            {filteredResults.map((result) => {
                return (
                    <ResultsListItem key={result.id} result={result} onClickUpdateCallback={onClickUpdateCallback} onClickDeleteCallback={onClickDeleteCallback} />
                )
            })}
        </>
    );
}
