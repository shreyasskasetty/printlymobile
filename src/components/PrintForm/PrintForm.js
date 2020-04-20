import React, { Component } from 'react'
import PrintSpecifation from "./PrintSpecifation";
import FileUpload  from "./FileUpload";
import axios from "axios";
import { renderBackButton ,removeBackButton,removeBottomBar,renderBottomBar} from "../Actions/componentActions";
import { connect } from "react-redux";
import { createBrowserHistory } from 'history';
import { CssBaseline,Snackbar } from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';
const history=createBrowserHistory()
class PrintForm extends Component {
    constructor(props){
        super(props)
        this.state={
            step:1,
            file: null,
            downloadLink:'',
            noCopies: 1,
            printType:'SINGLE_SIDED',
            noPagesPerSide:1,
            ink:'BLACK_WHITE',
            pgStart:0,
            pgEnd:0,
            allPages:true,
            pageSize:'A4',
            pageOrientation:'PORTRAIT',
            extraComment:'',
            progress:0,
            
        }
       
        
    }

    componentDidMount(){
      this.props.renderBackButton()
      this.props.removeBottomBar()
    }
    componentWillUnmount(){
        this.props.removeBackButton()
        this.props.renderBottomBar()
    }
    nextStep=()=>{
        const {step} = this.state;
        this.setState({
            step:step+1
        });
    }
    prevStep=()=>{
        const {step} = this.state;
        this.setState({
            step:step-1
        });
    }

    handleChange=input=>e=>{
        this.setState({
            [input]:e.target.value
        })
    }
    saveFile=(files)=>{
        console.log(files[0])
        this.setState({
            file:files[0]
        })
    }

     
    fileUploadHandler=()=>{
        const {shopId,user}=this.props
        const {
            file,
            noCopies,
            printType,
            noPagesPerSide,
            ink,
            pgStart,
            pgEnd,
            allPages,
            pageSize,
            pageOrientation,
            extraComment,
        }= this.state;
        const fd = new FormData();
        console.log(shopId.id)
       try{
        fd.append('file',file,file.name)
       }catch(err){
           console.log(err)
       }
        fd.append('userId',user.uid)
        fd.append('filename',file.name)
        fd.append('username',`${user.firstName} ${user.lastName}`)
        fd.append('shopId',shopId.id)
        fd.append('noCopies',noCopies)
        fd.append('printType',printType)
        fd.append('noPagesPerSide',noPagesPerSide)
        fd.append('ink',ink)
        fd.append('pgStart',pgStart)
        fd.append('pgEnd',pgEnd)
        fd.append('allPages',allPages)
        fd.append('pageSize',pageSize)
        fd.append('pageOrientation',pageOrientation)
        fd.append('extraComment',extraComment)
        console.log(fd)
        let progress=0
        axios.post('https://us-central1-printly-3ea29.cloudfunctions.net/uploadFile',fd,{
            onUploadProgress: progressEvent=>{
               progress=Math.round(progressEvent.loaded/progressEvent.total*100)
               if(file)
               this.setState({progress:progress});
            }
        })
        .then(res=>{
            console.log(res)
            if(res)
                this.props.openSnackbarSuccess("Order Placed Successfuly")
            history.goBack()
            history.push('/')
        }).catch(err=>{
            console.log(err)
            this.props.openSnackbarError("Upload the file")
        })
    }
    render() {
          
        const {step} = this.state;

        const {
            files,
            noCopies,
            printType,
            noPagesPerSide,
            ink,
            pgStart,
            pgEnd,
            allPages,
            pageSize,
            pageOrientation,
            extraComment,
            progress,
           
        }= this.state;
        const fileUploadValues={
            files,
            progress 
        }
        const printSpecificationValues={
            noCopies,
            printType,
            noPagesPerSide,
            ink,
            pgStart,
            pgEnd,
            allPages,
            pageSize,
            pageOrientation,
            extraComment,
        }
        switch(step){
            case 1:
                console.log('successful')
                return(
                  
                    <PrintSpecifation 
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        values={printSpecificationValues}

                    /> 
                )
            case 2: 
                return(
                    <>
                    <FileUpload 
                    nextStep = {this.nextStep}
                    fileUploadHandler={this.fileUploadHandler}
                    handleChange={this.saveFile}
                    values={fileUploadValues}
                    prevStep={this.prevStep}
                    /> 
                    
                   
                    </>
                )
            default: return(
                <CssBaseline />
            )
        }
    }
}
const  mapDispatchToProps=(dispatch)=>{
    return {
        renderBackButton: ()=>dispatch(renderBackButton()),
        removeBackButton: ()=>dispatch(removeBackButton()),
        removeBottomBar: ()=>dispatch(removeBottomBar()),
        renderBottomBar: ()=>dispatch(renderBottomBar())
    }
}
export default connect(null,mapDispatchToProps)(PrintForm)
