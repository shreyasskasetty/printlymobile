import React, { Component } from 'react'
import { Link } from "react-router-dom";

import { 
    Paper,
    Button,
    Grid,
    Divider,
    LinearProgress
} from '@material-ui/core'
import { 
    withStyles,
    lighten
 } from "@material-ui/core/styles";
 import {DropzoneArea} from 'material-ui-dropzone'
 const styles=theme=>({
     root:{
         maxWidth: 600,
         margin: `${theme.spacing(6)}px auto`,
         padding:`${theme.spacing(3)}px`,
     },
     divider:{
        margin: "auto"
     },

 })

 const BorderLinearProgress = withStyles({
    root: {
      height: 10,
      backgroundColor: lighten('#ff6c5c', 0.5),
    },
    bar: {
      borderRadius: 20,
      backgroundColor: '#ff6c5c',
    },
  })(LinearProgress);
class FileUpload extends Component {
    render() {
        const {values,fileUploadHandler,handleChange,nextStep,prevStep,classes}=this.props
        return (
            <React.Fragment>
                <Paper className={classes.root}>
                <Grid
                  container
                  spacing={1}
                  direction="row"
                >
                
                <Grid item xs={12} sm={12}>
                <DropzoneArea
                    filesLimit={1}
                     onChange={handleChange}
                     showPreviews={true}
                     maxFileSize={5000000}
                     acceptedFiles={['image/jpeg', 'image/png','application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document']}
                 />
                </Grid>
                <Grid item xs={12} sm={12}>
                <BorderLinearProgress
                    variant="determinate"
                    color="secondary"
                    value={values.progress}
                />
                </Grid>
                <Grid xs={3} sm={3} item>
                <Button variant="contained" color="primary" onClick={prevStep}>
                  Back
                </Button>
                </Grid>
                {/* <Grid xs={5} sm={5} item>
                    <Button variant="contained" color="primary">
                      Next
                    </Button>
                </Grid> */}
                <Grid xs={5} sm={3} item>
                    <Button variant="contained" color="primary" onClick={fileUploadHandler}>
                      Order Print
                    </Button>
                </Grid>
                </Grid>
                </Paper>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(FileUpload)
