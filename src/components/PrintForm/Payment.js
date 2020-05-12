import React, { Component } from 'react'
import GPayButton from 'react-google-pay-button'

import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/StarBorder';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from "axios"
import { 
    withStyles
 } from "@material-ui/core/styles";


const styles = (theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2),
    }
  });
const paymentMethods = [
    {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['AMEX', 'DISCOVER', 'INTERAC', 'JCB', 'MASTERCARD', 'VISA']
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          'gateway': 'stripe',
          'stripe:version': '2019-03-14',
          'stripe:publishableKey': '<YOUR_PUBLIC_STRIPE_KEY>'
        }
      }
    },
    {
      type: 'PAYPAL',
      parameters: {
        'purchase_context': {
          'purchase_units': [{
            'payee': {
              'merchant_id': '<YOUR PAYPAL_ACCOUNT_ID>'
            }
          }]
        }
      },
      tokenizationSpecification: {
        type: 'DIRECT'
      }
    }
  ]
  const tiers = [
    {
      title: 'Free',
      price: '0',
      description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
      buttonText: 'Sign up for free',
      buttonVariant: 'outlined',
    },]
export class Payment extends Component {
    handleGateway= () =>{
       
       const body ={}
       body['name'] = "shreyas"
       body['email']="shreyas@gmail.com"
       body['mobile']="7338044932"
       body['amount']="100"
      
        console.log(body)
        axios.post("https://us-central1-printly-3ea29.cloudfunctions.net/paychequeue",body)
        .then(res=>{
            document.write(res.data)
            
        }).catch(err=>{
            console.log(err)
        })
    }
    handleCashPayment=()=>{
       const {formSubmitHandler}=this.props;
       formSubmitHandler('COD')
    }
    loadPaymentDataHandler = paymentData => {
        const paymentToken = paymentData.paymentMethodData.tokenizationData.token
      }
    onUserCancelled = param =>{
        console.log(param)
    }
    handleAuthorization= param =>{
        console.log(param);
    }
        
    render() {

        const {classes} = this.props;

        
        return (
           <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)'
        }}
     >
               <CssBaseline />
                <Container  maxWidth="md" component="main">
                    <Grid container spacing={5} direction="row" >
                    {tiers.map((tier) => (
                        <Grid item key={tier.title} xs={12} sm={12} md={12}>
                        <Card>
                            <CardHeader
                            title={tier.title}
                            subheader={tier.subheader}
                            titleTypographyProps={{ align: 'center' }}
                            subheaderTypographyProps={{ align: 'center' }}
                            action={tier.title === 'Pro' ? <StarIcon /> : null}
                            className={classes.cardHeader}
                            />
                            <CardContent>
                            <div className={classes.cardPricing}>
                                <Typography component="h2" variant="h3" color="textPrimary">
                                ${tier.price}
                                </Typography>
                                <Typography variant="h6" color="textSecondary">
                                /mo
                                </Typography>
                            </div>
                            <ul>
                                {tier.description.map((line) => (
                                <Typography component="li" variant="subtitle1" align="center" key={line}>
                                    {line}
                                </Typography>
                                ))}
                            </ul>
                            </CardContent>
                            <CardActions>
                                <div style={{margin:"auto"}}>
                                <GPayButton
                                    style={{buttonColor:"white"}}
                                    totalPriceStatus={'FINAL'}
                                    totalPrice={'14.45'}
                                    currencyCode={'GBP'}
                                    countryCode={'GB'}
                                    allowedPaymentMethods={paymentMethods}
                                    development={true}
                                    merchantInfo={{
                                    merchantName: 'PrintlyForYou',
                                    // A Google merchant identifier issued after your website is approved by Google ✅
                                    merchantId: 'BCR2DN6T7O275XA6'
                                    }}
                                    onLoadPaymentData={this.loadPaymentDataHandler}
                                    onUserCancelled={this.onUserCancelled}
                                    onPaymentAuthorized={this.handleAuthorization}
                                />
                                
                                </div>
                            
                            </CardActions>
                            <CardActions>
                            <div style={{margin:"auto"}}>
                           
                                <Button  fullWidth variant="contained" color="primary" onClick={this.handleGateway}>
                                    Pay using Paytm
                                </Button>
                            
                             </div >
                            </CardActions>
                            <CardActions>
                            <div style={{margin:"auto"}}>
                           
                                <Button  fullWidth variant="contained" color="primary" onClick={this.handleCashPayment}>
                                    Order with cash payment
                                </Button>
                            
                             </div >
                            </CardActions>
                        </Card>
                        </Grid>
                    ))}
                    </Grid>
                </Container>
           </div>
          
        )
    }
}

export default withStyles(styles)(Payment);
