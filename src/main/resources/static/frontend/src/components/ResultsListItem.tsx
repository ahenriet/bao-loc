import * as React from 'react';
import { Typography, TextField, Button, IconButton, Grid, FormControl } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Result } from "../model/Result";
import { parseResult, stringifyResult } from '../util/ResultUtil';

type ResultsListItemProps = {
    result: Result;
    onClickUpdateCallback: Function;
    onClickDeleteCallback: Function;
}

export function ResultsListItem({ result, onClickUpdateCallback, onClickDeleteCallback }: ResultsListItemProps) {
    const [displayValue, setDisplayValue] = React.useState<string>(stringifyResult(result));
    const [isEditable, setIsEditable] = React.useState<boolean>(false);

    return (
        <Grid>
            <FormControl>
                {isEditable && <TextField
                    autoFocus
                    size='small'
                    value={displayValue}
                    onChange={event => { if (/^[0-9\b]+$/.test(event.target.value)) { setDisplayValue(event.target.value) } }}
                    onBlur={event => {
                        onClickUpdateCallback(result.id, parseResult(displayValue));
                        setIsEditable(false);
                    }}
                />
                }
                {!isEditable && <Typography
                    sx={{ fontSize: '30px' }}
                    onClick={() => {
                        setIsEditable(true);
                    }}
                >
                    {displayValue}
                </Typography>
                }
            </FormControl>

            <FormControl>
                <IconButton sx={{ margin: '3px' }} onClick={() => onClickDeleteCallback(result.id)} >
                    <DeleteIcon />
                </IconButton>
            </FormControl >
        </Grid>
    )
}
