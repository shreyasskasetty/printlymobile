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
            value: 'PORTRAIT',
            label: 'portrait',
          },
          {
            value: 'LANDSCAPE',
            label: 'landscape',
          },
    ]
    const selectPages=[
        {
            value: true,
            label: 'All pages',
          },
          {
            value: false,
            label: 'Select page range',
          },
    ]
    const printTypes=[
        {
            value: 'BACK_TO_BACK',
            label: 'Back to Back',
          },
          {
            value: 'SINGLE_SIDED',
            label: 'Single Sided',
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
        const {values,handleChange,classes,nextStep} = this.props;
        return (
        
        <React.Fragment >

            <Paper elevation={3} className={classes.container}>
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
                        <TextField 
                        fullWidth id="outlined-basic" 
                        type="number" 
                        label="Pages/side"
                        defaultValue={values.noPagesPerSide} 
                        onChange={handleChange('noPagesPerSide')}
                        variant="outlined" />
                       </Grid>

                        <Grid item xs={8} sm={5}>
                        <TextField fullWidth 
                        id="outlined-basic"  
                        type="number" 
                        defaultValue={values.noCopies} 
                        label="Copies" 
                        onChange={handleChange('noCopies')}
                        variant="outlined" />
                        </Grid>
                       
                        <Grid item xs={10} sm={10} flex="0 1 auto">
                        <FormControl  component="fieldset">
                            <FormLabel component="legend">Ink</FormLabel>
                            <RadioGroup aria-label="Ink" name="ink"  value={values.ink} onChange={handleChange('ink')}>
                                <FormControlLabel value="COLOR" control={<Radio />} label="Color" />
                                <FormControlLabel value='BLACK_WHITE' control={<Radio />} label="Black and White" />
                            </RadioGroup>
                        </FormControl>
                        </Grid>
                        <Grid item xs={8}>
                        <TextField
                            id="outlined-select-orientation"
                            select
                            label="Select"
                            value={values.printType}
                            fullWidth
                            onChange={handleChange('printType')}
                            helperText="Please select print type"
                            variant="outlined"
                            >
                            {printTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        </Grid>
                        <Grid item xs={8}>
                        <TextField
                            id="outlined-select-pagerange"
                            select
                            label="Select"
                            value={values.allPages}
                            fullWidth
                            onChange={handleChange('allPages')}
                            helperText="Please select page range"
                            variant="outlined"
                            >
                            {selectPages.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        </Grid>
                        
                        
                    {!values.allPages && 
                        <>
                        <Grid item xs={5} sm={5}>
                        <TextField 
                        fullWidth 
                        id="outlined-basic" 
                        type="number"
                        value={values.pgStart} 
                        onChange={handleChange('pgStart')}
                        label="Start Pgno" 
                        variant="outlined" />
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
                        <TextField 
                        fullWidth 
                        id="outlined-basic" 
                        type="number" 
                        value={values.pgEnd}
                        onChange={handleChange('pgEnd')}
                        label="End Pgno" 
                        variant="outlined" />
                        </Grid>
                        </>}

                        <Grid item xs={8}>
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            value={values.pageSize}
                            fullWidth
                            onChange={handleChange('pageSize')}
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
                            id="outlined-select-orientation"
                            select
                            label="Select"
                            value={values.pageOrientation}
                            fullWidth
                            onChange={handleChange('pageOrientation')}
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
                            value={values.extraComment}
                            onChange={handleChange('extraComment')}
                            helperText="Enter extra print order details"
                            variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={5}>
                        <Button variant="contained" color="primary" onClick={nextStep} >
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
