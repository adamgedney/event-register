
import {
  APP_CLIENT_ID,
  USER_POOL_ID,
  IDENTITY_POOL_ID,
  ENDPOINT_USERS,
  ENDPOINT_MS_USERS,
  ENDPOINT_GROUPS,
  ENDPOINT_APPS,
  IOT_HOST,
  IOT_AUTH_ROL
} from './utils/config';

const debugMode = false;;

export default ()=>({
    logo:'/images/olyhub_logo_v1_text_blackx200.png',
    brandingColor: '#103463',
    gateScreenBackgroundColor: '#fff',// If false it reverts to default grey, if transparent it exists as a modal
    gateScreenBackgroundImage: '/images/landing_bg.jpg',// If false, reverts to color
    centralizerAppsIconColor: '#efefef',
    hideAppCentralizer : true,
    profileSettingsLink : '/account',
    title:'',
    displayOnAuthPage : true,// If true, the gate will pop up over page as a modal otherwise it will redirect to /auth page
    APP_CLIENT_ID,
    USER_POOL_ID,
    IDENTITY_POOL_ID,
    ENDPOINT_USERS,   
    ENDPOINT_GROUPS,
    ENDPOINT_APPS,
    debugMode,//boolean | turns internal console logs on and off

    //NOTE : False or undefined for any message or title defers to API response message or default message in English
    messages:{
        onPasswordsMatchFail : 'Passwords don\'t match.',
        onCreateAccountFail : false,
        onResetPasswordRequestFail : false,
        onLoginFail : false,
        onSetNewPasswordFail : false,
        onSetNewPasswordSuccess : 'Your password was changed. Please login. You will be redirected in a second.',
        onVerifyAcctFail : false,
        onVerifyAcctSuccess : 'Your account was verified. Please login. You will be redirected in a second.'
    },
    titles : {
        common : {
            login: 'login',
            forgotPassword : 'forgot password?',
            createAccount : 'create account',
            required : "required",
            newVerificationCode : "Get a new verification code"
        },
        forgotPassword:{
            h1: "Forgot Your Password?",
            h3: "Enter your email address and we'll email you a code you can use to reset your password.",
            labelEmail : "Email",
            placeholderEmail : "Email Address",
            submit : "Submit"
        },
        createAccount:{
            h1: "Create An Account",
            labelEmail : "Email",
            placeholderEmail : "Email Address",
            labelFirstName : "First Name",
            placeholderFirstName : "First Name",
            labelLastName : "Last Name",
            placeholderLastName : "Last Name",
            labelPassword : "Password",
            placeholderPassword : "Password",
            labelPasswordAgain : "Password Again",
            placeholderPasswordAgain : "Password Again",
            submit : "Submit"
        },
        login:{
            h1: "Login", 
            labelEmail : "Email",
            placeholderEmail : "Email Address",
            labelPassword : "Password",
            placeholderPassword : "Password",
            submit : "Submit"
        },
        resetPassword:{
            h1: "Reset Your Password",
            h3: "We just emailed you a verification code. Copy it and enter it here.",
            labelCode : "Verification Code",
            placeholderCode : "Verification Code",
            labelEmail : "Email",
            placeholderEmail : "Email Address",
            labelNewPassword : "New Password",
            placeholderNewPassword : "New Password",
            labelNewPasswordAgain : "New Password Again",
            placeholderNewPasswordAgain : "New Password Again",
            submit : "Submit"
        },
        verifyAccount:{
            h1: "Verify Your Account",
            h3: "We just emailed you a verification code. Copy it and enter it here.",
            labelCode : "Verification Code",
            placeholderCode : "Verification Code",
            labelEmail : "Email",
            placeholderEmail : "Email Address",
            submit : "Submit"
        },
    }
});