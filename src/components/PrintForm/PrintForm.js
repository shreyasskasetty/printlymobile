import React, { Component } from 'react'
import PrintSpecifation from "./PrintSpecifation";
import { FileUpload } from "./FileUpload";
class PrintForm extends Component {
    constructor(props){
        super(props)
        this.state={
            step:2,
            filename:'',
            downloadLink:'',
            noCopies: 0,
            singleSided: false,
            backToBack:false,
            noPagesPerSide:0,
            color:{isSet:false,},
            blackWhite:{isSet:true},
            pgStart:0,
            pgEnd:0,
            allPages:false,
            pageSize:'',
            pageOrientation:'',
            extraComment:''
        }
    }
    componentDidMount(){
       const {setVisibility} =this.props
       setVisibility(0)
    }
    componentWillUnmount(){
        const {setVisibility} =this.props
        setVisibility(1)
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
    render() {
        const {step} = this.state;
        const {
            filename,
            downloadLink,
            noCopies,
            singleSided,
            backToBack,
            noPagesPerSide,
            color,
            blackWhite,
            pgStart,
            pgEnd,
            allPages,
            pageSize,
            pageOrientation,
            extraComment,
        }= this.state;

        const fileUploadValues={
            filename,
            downloadLink, 
        }
        const printSpecificationValues={
            noCopies,
            singleSided,
            backToBack,
            noPagesPerSide,
            color,
            blackWhite,
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
                    <FileUpload 
                    nextStep = {this.nextStep}
                    handleChange={this.handleChange}
                    values={fileUploadValues}/>   
                )
            case 2: 
                return(
                    <PrintSpecifation 
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    values={printSpecificationValues}
                    prevStep={this.prevStep}
                    />
                )
        }
    }
}

export default PrintForm
