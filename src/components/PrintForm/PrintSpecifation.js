import React, { Component } from 'react'
import { withStyles} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from '@material-ui/core/Paper';
import { 
Typography,

  Grid,
  Radio,
    RadioGroup,
    FormControl,
    FormControlLabel,
    FormLabel,
    MenuItem,
  Button,
 } from "@material-ui/core";
const styles =theme => ({
     container:{
        maxWidth: 380,
        margin: `${theme.spacing(4)}px auto`,
        padding: `${theme.spacing(6)}px  ${theme.spacing(2)}px`,

     }
  })
  const pageSizes=[
    {
        value: 'A4',
        label: 'A4',
      },
      {
        value: 'A3',
        label: 'A3',
      },
      {
        value: 'A2',
        label: 'A2',
      },
      {
        value: 'A1',
        label: 'A1',
      },
    ]
    const pageOrientation=[
        {
            value: 'portrait',
            label: 'portrait',
          },
          {
            value: 'landscape',
            label: 'landscape',
          },
    ]
class PrintSpecifation extends Component {
    constructor(props){
        super(props)
        this.state={}
    }
    continue=e=>{
        e.preventDefault();    
        this.props.nextStep();
    }
    render() {
        const {values,handleChange,classes} = this.props;
        console.log(classes)
        return (
        
        <React.Fragment >

            <Paper elevation="3" className={classes.container}>
            <Typography
                className={"MuiTypography--heading"}
                variant={"h6"}
                color="primary"
                gutterBottom
                >
                PRINT SPECIFICATION
            </Typography>
            <Grid container alignItems="center"  direction="row" spacing={2} >
                        
                        <Grid item xs={8} sm={5}>
                        <TextField fullWidth id="outlined-basic" label="Pages/side" variant="outlined" />
                       </Grid>

                        <Grid item xs={8} sm={5}>
                        <TextField fullWidth id="outlined-basic" label="Copies" variant="outlined" />
                        </Grid>
                       
                        <Grid item xs={10} sm={10} flex="0 1 auto">
                        <FormControl  component="fieldset">
                            <FormLabel component="legend">Ink</FormLabel>
                            <RadioGroup aria-label="Ink" name="ink"  onChange={handleChange}>
                                <FormControlLabel value="color" control={<Radio />} label="Color" />
                                <FormControlLabel value="blackwhite" control={<Radio />} label="Black and White" />
                            </RadioGroup>
                        </FormControl>
                        </Grid>
                        <Grid item xs={5} sm={5}>
                        <TextField fullWidth id="outlined-basic" type="number" label="Start Pgno" variant="outlined" />
                        </Grid>
                        <Grid item xs={2} sm={1} >
                        <Typography
                            className={"MuiTypography--heading"}
                            variant={"caption"}
                            gutterBottom
                            >
                            To
                            </Typography>
                        </Grid>
                        
                        <Grid item xs={5} sm={5}>
                        <TextField fullWidth id="outlined-basic" type="number" label="End Pgno" variant="outlined" />
                        </Grid>
                        <Grid item xs={8}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                           //value={}
                           fullWidth
                            onChange={handleChange}
                            defaultValue="portrait"
                            helperText="Please select page size"
                            variant="outlined"
                            >
                            {pageSizes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        </Grid>
                        <Grid item xs={8}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                           //value={}
                           fullWidth
                            onChange={handleChange}
                            defaultValue="A4"
                            helperText="Please select page orientation"
                            variant="outlined"
                            >
                            {pageOrientation.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        </Grid>
                        <Grid item xs={12}>
                        <TextField
                            id="outlined-multiline-static"
                            label="Comments"
                            multiline
                            fullWidth
                            rows={4}
                            helperText="Enter extra print order details"
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={5}>
                        <Button variant="contained" color="primary">
                            Next
                        </Button>
                        </Grid>
                        
                    </Grid>


                     
            </Paper>
           
         </React.Fragment>
                 
        )
    }
}

export default withStyles(styles)(PrintSpecifation)
