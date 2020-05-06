import React, { Component } from 'react'
import PrintSpecifation from "./PrintSpecifation";
import Payment from "./Payment";
import FileUpload  from "./FileUpload";
import axios from "axios";
import { renderBackButton ,removeBackButton,removeBottomBar,renderBottomBar} from "../Actions/componentActions";
import {submitForm } from "../Actions/formAction"
import { connect } from "react-redux";
import { CssBaseline } from '@material-ui/core';
import { createBrowserHistory } from 'history';
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
            uploadComplete:false,
            uploaderr:false,
            circularProgress:false,
            
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
    formSubmitHandler=(paymentMode)=>{
        const {shopId,user,submitForm}=this.props
        const {
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
            downloadLink
        }= this.state;
        const formDetails={
            uid:user.uid,
            shopId:shopId.id,
            noCopies: noCopies,
            printType:printType,
            noPagesPerSide:noPagesPerSide,
            ink:ink,
            pgStart:pgStart,
            pgEnd:pgEnd,
            allPages:allPages,
            pageSize:pageSize,
            pageOrientation: pageOrientation,
            extraComment:extraComment,
            download_url:downloadLink,
            paymentMode: paymentMode,
        }
        submitForm(formDetails);

        

    }
        
    componentDidUpdate(){
        const {submitted}=this.props;
        console.log(submitted)
        if(submitted)
        {
            this.props.openSnackbarSuccess("Order Succesfully Placed")
            history.goBack()
            history.push('/')
        }
    }
     
    fileUploadHandler=(PaymentMode)=>{
        const {
            file,
        }= this.state;
        const fd = new FormData();
       try{
        fd.append('file',file,file.name)
       }catch(err){
           console.log(err)
       }
        if(file)
        {
        fd.append('filename',file.name)
        
        }
        
        console.log(fd)
        let progress=0
        this.setState({circularProgress:true})
        axios.post('https://us-central1-printly-3ea29.cloudfunctions.net/uploadFile',fd,{
            onUploadProgress: progressEvent=>{
               progress=Math.round(progressEvent.loaded/progressEvent.total*100)
               if(file)
               this.setState({progress:progress});
            }
        })
        .then(res=>{
            console.log(res)
            if(res.status===200)
                {this.props.openSnackbarSuccess("File Uploaded Successfully")
                this.setState({circularProgress:false,uploadComplete:true})
            }
            
        }).catch(err=>{
            console.log(err)
           
            this.setState({uploaderr:true,circularProgress:false});
            console.log(this.state)
            this.props.openSnackbarError("Warning! No file added to upload!")
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
            uploaderr,
            circularProgress,
           uploadComplete,
        }= this.state;
        const fileUploadValues={
            files,
            progress,
            uploaderr,
            circularProgress,
            uploadComplete,
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
            case 3:
                return(  
                    <Payment formSubmitHandler={(PaymentMode)=>{this.formSubmitHandler(PaymentMode)}} nextStep = {this.nextStep} prevStep={this.prevStep}/>
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
        renderBottomBar: ()=>dispatch(renderBottomBar()),
        submitForm: (formDetails)=>dispatch(submitForm(formDetails)),
    }
}
const mapStateToProps=(state)=>{
    console.log(state)
    return {
        submitted: state.formReducer.submitted
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(PrintForm)
