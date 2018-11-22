import React, { Component } from 'react';
import './style.css';
import {Navbar,Nav , NavItem,Button,FormGroup,FormControl,Table,Modal,Checkbox,Radio
  ,Panel,ListGroup,ListGroupItem} from 'react-bootstrap';
  import {Link} from 'react-router-dom';
  import axios from 'axios';
import logo from './Selection_003.png';
import teampic from './teampic.png';
import curve from './curve.png';
import footerpic from './footer.png';
import {ic_close} from 'react-icons-kit/md/ic_close';
import Icon from 'react-icons-kit';
import starpng from './star.png';
import likespng from './likes.png'
import searchpng from './search.png';
import green from './green.png';
import green2 from './green2.png';
import {caretRight} from 'react-icons-kit/fa/caretRight';
import {connect} from 'react-redux';
import { userlogin } from '../../store/action/action';
import gql from "graphql-tag";
import { Query, compose, graphql,Mutation,ApolloConsumer } from "react-apollo";



const loginUser = gql`
    query($email: String!,$password: String!){
      signIn(email:$email , password : $password){
        id
        email
        password
      }
    }
`

const signUpuser = gql`
mutation($lastname :String!,$firstname:String!,$email: String!,$password : String!, $userStatus: String!){

  signUp(
    lastname: $lastname
    firstname: $firstname
    email: $email
    password: $password
    userStatus: $userStatus
  ){
    lastname
    firstname
    email
    password
    userStatus
  }
}
`;

var check = [];

class Landingpage extends Component {

  constructor(){
    super();
    this.state ={
      joinretro : false,
      show: false,
      join: false,
      login: false,
      email: '',
      password:'',
      createuseremail :'',
      createaccountfirstname:'',
      createaccountsecondname: '',
      createaccountpassword: '',
      createaccountconfirmpassword: '',
      businessUser : '',
      profession: '',
      lorem1 : '',
      lorem2 : '',
      skills : [],
      status : '',
      checkstatus : false
    }
  }

  handleChangeBox = name => event => {
    if (event.target.checked === true) {
      check.push(event.target.value)
      this.setState({ skills: check })


    } else {
      check.map((value, index) => {
        return (
          value === event.target.value ?
            [check.splice(index, 1), this.setState({ skills: check }), console.log('ok ', this.state.skills)] : ''
        )
      })
    }
  };

  login(evt){
    evt.preventDefault();
    if(this.state.email === "" || this.state.password  === "" ){
      alert("Please Enter Login or Password");
    }
    else{
     // alert('Successfull');
      const data = {
        // Email: this.state.email,
        // Pass: this.state.password,
        email: this.state.email,
        password: this.state.password
    }
   
    const json = data;
    // https://retro-app-server-13.herokuapp.com/user/login
    axios.post('http://localhost:4000/user/login',  json ).then(res => {
       console.log( '=======',res ,res.data);
        // if(res.data.token){
        // localStorage.setItem('userdata', JSON.stringify(res.data));
      //   dispatch({type: myActions.userlogin , payload:data})
        this.props.history.push('/createretro');
        //  }

        // else{
        //     alert(res.data.message);
        // }
        
    })
        .catch(err => {
            console.log(err)
        })

       
    
  }
}



  handlejoin(){
    this.setState({login:false, join: false,show:false})
  }
  handleHide() {
    this.setState({login:false, show: false ,show:false});
  }

  handlelogin(){
    this.setState({login:false, show: false ,show:false})
  }


  getValidationState() {
    const length = this.state.createuseremail.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
    return null;
  }



  createAccount(evt){
    evt.preventDefault();
      if(this.state.createaccountconfirmpassword === this.state.createaccountpassword){
        const user = {
          // Firstname: this.state.createaccountfirstname,
          // Lastname: this.state.createaccountsecondname,
          // Emaiemal: this.state.createuseremail,
          // Pass: this.state.createaccountconfirmpassword,
          // Status : this.state.status
          email: this.state.createuseremail,
          password: this.state.createaccountconfirmpassword,
      }
      const json = user;
      // https://retro-app-server-13.herokuapp.com/user/signup
      axios.post('http://localhost:4000/user/signup',  json ).then(res => {
          console.log(res);
          // alert(res.data.message);
          if(res.data.token){
              this.setState({
                  createaccountfirstname: "",
                  createaccountsecondname: "",
                  createuseremail: "",
                  createaccountconfirmpassword: "",
                  createaccountpassword :""
              })
              localStorage.setItem('userdata', JSON.stringify(res.data));
             this.props.history.push('/createretro');
      }
          else{
              alert(res.data.message);
          }
        }
      ).catch(err => alert(err))
  }

      
      else{
        alert('Password Did not Matched');
      }
  }


    render(){
      const {email, password ,createaccountconfirmpassword,createaccountfirstname,createuseremail,createaccountpassword,status} = this.state;
      const isValid  = email===''|| password=== '';
     const isValid2 = status==='' || createaccountconfirmpassword === '' || createaccountfirstname === '' || createuseremail === '' || createaccountconfirmpassword === '' || createaccountpassword ==='';
           
      return(
         <div>
           <div>

          <Navbar fixedTop style={{height:70,background:'rgba(255,255,255,0.9)',}} collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <img src={logo} alt="Retro"  width="140" style={{height:60}} />
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <div>

              <Nav style={{paddingTop:5 , justifyContent:'space-around',display:'flex',width:'55%'}} pullRight>
                <NavItem id="join" >
                  Join/Create
                </NavItem>
                <NavItem  href="#features">
                  Features
                </NavItem>
                <NavItem  href="#getbeta">
                  Get the Beta
                </NavItem>
                <NavItem href="#getbeta">

                  Plans & Pricing
                </NavItem>
                <Navbar.Form pullRight>
               
                  <Button onClick={() => this.setState({login:false,join:false,show:true})} 
                  style={{background:'black',color:'#cdcfd0',fontWeight:'lighter',fontSize:12,fontFamily:'Times New Roman", Times, serif',height:40,width:120,}}>
                  <b>Log In</b> / Sign Up
                  </Button>
                </Navbar.Form>
              </Nav>
                  </div>
            </Navbar.Collapse>
          </Navbar>
            
          

            <div style={{display:'inline-flex',width:'100%',justifyContent:"space-between",background:'white'}}>
                  <div style={{width:'40%',alignSelf:'center'}}>
                        <h1 style={{paddingLeft:'20%'}}>
                          Remote Teams.
                        </h1>
                        <h1 style={{paddingLeft:'20%'}}>
                        Shared Space.
                        </h1>
                        <form style={{display:'inline-flex',paddingLeft:'20%',alignSelf:'center',height:50,borderColor:'#3b75fa',borderWidth:2}}>
                        { 
                          this.state.joinretro ?  
                          <div style={{display:'flex'}}>

                          <FormGroup style={{borderColor:"#3b75fa",}}>
                          <FormControl style={{height:50}} size={40} type="text" placeholder="Enter Room Code" />
                          </FormGroup>
                          <Button  onClick={() => this.setState({join:true})} style={{background:'#3b75fa',color:'white',width:150,fontSize:16}}>
                          Join Retro</Button>
                          </div>
                          :
                            <div style={{display:'flex',}}>
                          <Button  onClick={() => this.setState({joinretro:true})} style={{background:'#3b75fa',color:'white',width:150,fontSize:16}}>
                          Join Retro</Button>
                          <Button bsSize="large" onClick={()  => this.setState({login:true})}
                           style={{background:'#f48341',color:'white',marginLeft:20,width:150,fontSize:16}}>
                          Create Retro</Button>
                            </div>
                        
                          }
                        </form>
                  </div>
                  <div style={{width:"60%",display: 'flex',justifyContent:"flex-end"}}>

                 <img src={teampic}  alt="team" height="350" style={{width:'86%'}}/>
                  </div>
            </div>

<div style={{display:'inline-flex',width:'100%',background:'white'}}>
                  <div>

                 <img src={curve} alt="team" height="800" width="300" />
                  </div>
                  <div style={{paddingTop:20,width:'100%'}}>
                        

                        <h1 style={{textAlign:"flex-start",marginLeft:"10%"}}>
                          Better decisions. Better products. Stronger teams.
                       
                        </h1>
                        <h4 style={{textAlign:"flex-start",marginLeft:"5%"}}>
                         Share your thoughts. Vote on what's important. Group your ideas. Commit to a better process and better future.
                       
                        </h4>
                        

                        <div style={{display:'inline-flex',width:'75%',marginTop:"5%"}}>
                            <div id="starpng" style={{width:"50%",height:270}}>
{/*                                 
                                <img src={starpng} /> */}
                                <p style={{    width: "40%",
                                    color: "rgb(142, 145, 147)",
                                    paddingTop: 10,
                                    fontSize: 14,
                                    marginLeft: "25%",
                                    height: 110  }}>
                                  The team really rocked out and delivered huge fixes with the API and the UI!
                                </p>
                                <p style={{    width: "37%",
                                    color: "rgb(142, 145, 147)",
                                    paddingTop: 0,
                                    fontSize: 16,
                                    marginLeft: "8%",
                                    height: 110 }}>
                                  Awesome teamwork and communication between dev and QA
                                </p>
                           </div>
                            <div style={{width:"50%"}}>
                              <h4 style={{color:'#f48341'}}>
                                Discuss team thoughts in a real-time,

                              </h4>
                              <h4 style={{color:'#f48341'}}>
                                configurable environment
                              </h4>

                              <p>
                                Use a real-time,configurable,feedback tool for your
                                team to discuss and share their thoughts. Teams can 
                                scale to 50+ team members concurrently, for either internal
                                or remote, to support efficient and transparent shared understanding.
                              </p>
                           </div>
                           
                        </div>


                         <div style={{display:'inline-flex',width:'100%',marginTop:"6%"}}>
                            <div style={{width:"50%",}}>
                              <h4 style={{color:'lightgreen',paddingLeft:25,paddingTop:30}}>
                                
                                Review your team's feedback


                              </h4>
                            
                              <p style={{maxWidth:'75%',paddingLeft:25,}}>
                                Group,Sort and Vote on Thoughts to prioritize
                                your and your team's feedback and support a
                                 better understanding of the "How Well" a team 
                                 is working together.
                              </p>
                            </div>
                            <div style={{width:"50%" }}>
                            <img  src={likespng}/>
                           </div>
                           <div >
                              <img src={green} />
                           </div>
                           
                        </div>  

                      
                      <div id="features" style={{display:'inline-flex',width:'100%',marginTop:-4,alignItems:'center'}}>
                            <div style={{width:"50%" ,}}>
                            <img src={searchpng} />
                           </div>
                            <div style={{width:"50%",}}>
                              <h4 style={{color:'#f48341',paddingLeft:25,paddingTop:15}}>
                                
                                Organize by Projects & Schedules

                              </h4>
                            
                              <p style={{maxWidth:'75%',paddingLeft:25,}}>
                               Organize your Retro's to specific projects 
                               to better assess your team's understanding.Schedule
                               Retros to create a consistent, recurring feedback loop.
                              </p>
                            </div>
                            <div >
                              <img src={green2} />
                           </div>
                           
                        </div>  



                      
                  </div>
                
            </div>
         
            <div id="blue">


            <div style={{paddingTop:'5%',}}>
                      <h1 style={{textAlign:'center',color:'white',fontSize:26}}>
                        Sign Up for the Beta 
                      </h1>

                    <form style={{display:'inline-flex',width:'100%',justifyContent:'center',height:45,borderColor:'#3b75fa',borderWidth:2}}>
                          <FormGroup style={{borderColor:"#3b75fa",}}>
                          <FormControl style={{height:45,background:'white',border:'none'}} size={40} type="text" placeholder="youremail@yourcompany.com" />
                          </FormGroup>
                          <Button style={{background:'#f48341',color:'white',width:'9%'}}>Submit</Button>
                        </form>
                  </div>   
          
                  <div style={{paddingTop:'5%'}}>
                  <h1 style={{textAlign:'center',color:'white'}} id="getbeta">
                        Plans & Pricing 
                      </h1>
                  
                  

                  <div style={{display:'inline-flex',marginTop:"5%",justifyContent:"center",paddingLeft:10,width:'100%',marginBottom:"10%"}}>
                        <div style={{width:'15%',borderColor:'black',background:'white',marginRight:25}}>

                    
                                <Table responsive>
                                <thead style={{background:'#6ed351'}}>
                                  <tr>
                                    <th>
                                    <h2 style={{textAlign:'center',color:'white'}}>
                                Freelancer
                                
                              </h2>
                              <p style={{textAlign:'center',color:'white'}}>Free</p>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody style={{background:'white'}}>
                                  <tr>
                                    <td style={{color:'grey',}}>Join any retro</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',}}>Recieve a retro summary</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',}}>Create a retro</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',}}>Up to 10 projects</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',}}>Limit of 7 users in a retro</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',}}>UP to 5 retros</td>
                                  </tr>

                                </tbody>
                              </Table>
                              <Table bordered={false}  responsive>
                              
                                <tbody  style={{background:'white'}} bordered={false}>
                                  <tr >
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}><s>Schedule retros</s></td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}><s>Invite/Uninvite Users</s></td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}><s>Manage projects</s></td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}><s>Templates</s></td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}><s>Decision Log</s></td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}><s>Reporting(v2)</s></td>
                                  </tr>
                                  <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}><s>Action items</s></td>
                                  </tr>
                                  <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}><s>Retro Notes(Project & Persional Notes</s></td>
                                  </tr>
                                </tbody>
                              </Table>
                        </div>
                        <div style={{width:'15%',borderColor:'black',background:'white',marginRight:25}}>
                        <Table  style={{background:'white'}} responsive>
                                <thead style={{background:'#6ed351'}}>
                                  <tr>
                                    <th>
                                    <h2 style={{textAlign:'center',color:'white'}}>
                                Startup
                              </h2>
                              <p style={{textAlign:'center',color:'white'}}>  $49/mo</p>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td style={{color:'grey',}}>Join any retro</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',}}>Recieve a retro summary</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',}}>Create a retro</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',}}>Up to 10 projects</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',}}>Limit of 7 users in a retro</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',}}>Unlimited retros</td>
                                  </tr>

                                </tbody>
                              </Table>
                              <Table  style={{background:'white'}} bordered={false}  responsive>
                              
                                <tbody >
                                  <tr >
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}>Schedule retros</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}>Invite/Uninvite Users</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}>Manage projects</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}>Templates</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}>Decision Log</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}>Reporting(v2)</td>
                                  </tr>
                                  <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}>Action items</td>
                                  </tr>
                                  <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}>Retro Notes(Project & Persional Notes</td>
                                  </tr>
                                </tbody>
                              </Table>
                        </div>
                        <div style={{width:'15%',background:'white'}}>
                        <Table  style={{background:'white'}} responsive>
                                <thead style={{background:'#6ed351'}}>
                                  <tr>
                                    <th>
                                    <h2 style={{textAlign:'center',color:'white'}}>
                                Enterprise
                              </h2>
                              <p style={{textAlign:'center',color:'white'}}> Contact for Pricing</p>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td style={{color:'grey',}}>Join any retro</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',}}>Recieve a retro summary</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',}}>Create a retro</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',}}>Unlimited Projects</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',}}>Unlimited users in a retro</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',}}>Unlimited retros</td>
                                  </tr>
                                  <tr>
                                    <td style={{color:'grey',}}>Everything in Startup</td>
                                  </tr>

                                </tbody>
                              </Table>
                              <Table  style={{background:'white'}} bordered={false}  responsive>
                              
                                <tbody  bordered={false}>
                                  <tr >
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}>Security(SSL)</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}>Data Isolated</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}>Manage Users</td>
                                    </tr>
                                    <tr>
                                    <td style={{color:'grey',borderColor:'white',fontSize:12}}>User List / User Detiails</td>
                                    </tr>
                                  
                                </tbody>
                              </Table>
                            </div>
                        </div>
                    </div>
                  <footer style={{background: 'black',display:'inline-flex',width:'100%',justifyContent:'space-evenly'}}>
                          <div style={{width:'30%',height:100}}> 
                            <ul style={{display:'inline-flex',marginLeft:'5%',width:'100%',justifyContent:'space-evenly',padding:40,listStyleType:'none'}}>
                              <li style={{fontSize:16,color:"#879099"}}>Contact Us</li>
                              <li style={{fontSize:16,color:"#879099" }}>Term & Condition</li>
                              <li style={{fontSize:16,color:"#879099"}}>Privacy policy</li>
                            </ul>
                          </div>
                          <div style={{alignItems:'center',display:'inline-flex'}}>
                                    

                            <img src={footerpic} alt="footer pic" style={{paddingTop:15,paddingLeft:10}} width="70" height="70"/>
                               
                          <div>

                            <h3 style={{color:"#879099"}}>
                            Build by Dom & Tom
                            </h3>
                            <h4 style={{color:"#879099"}}>
                            Agile teams running retros every sprint.
                            </h4>
                          </div>

                                  
                          </div>
                        <div>
                          
                        </div>
                         <div style={{alignItems:'center'}}>
                            <h3 style={{color:"#879099"}}>
                              @Dom & Tom 2018

                            </h3>
                            <h4 style={{color:"#879099",textDecoration:'underline',textAlign:'right'}}>
                              Visit Our Website
                            </h4>
                       </div>
                  </footer> 
            </div>
            <div >
             </div>
        <Modal
          show={this.state.login}
          onHide={(evt) => this.handleHide(evt)}
          container={this}
          aria-labelledby="contained-modal-title"
         
          >
         
          <Modal.Body  style={{color:'white'}}>

                     <Mutation mutation={signUpuser}>
                     {(signUp,{data}) => (
                       

                       
                       <form id="createretro"
                        // onSubmit={(evt) => this.createAccount(evt)}
                        onSubmit={e => {
                          e.preventDefault();
                          if(this.state.createaccountpassword === this.state.createaccountconfirmpassword){
                           
                            signUp({variables:{
                              lastname : this.state.createaccountsecondname,
                              firstname : this.state.createaccountfirstname,
                              email : this.state.createuseremail,
                              password : this.state.createaccountconfirmpassword,
                              userStatus : this.state.status.toString()
                            }});
                          }
                          else {
                            alert("Password did not match");
                          }
                          }}
                       >
                     <div style={{display:'inline-flex',width:'98%',justifyContent:'space-between'}}>
                    <div style={{display:"inline-flex",width:'30%',justifyContent:'space-between',paddingLeft:20,paddingTop:10}}>
                            <Icon onClick={() => this.handleHide()} icon={ic_close} size={30} style={{color:"#6cd351"}} />
                            </div>
                                
                              <div style={{paddingTop:10,}}>
                                <p style={{color:"#6cd351",fontSize:20,height:14}}>
                                  Already have an account?
                                </p>
                                <h4 onClick={()=> this.setState({
                                  show: true,
                                  join: false,
                                  login: false
                                })} style={{textDecoration:'underline',textAlign:'right',color:"#6cd351",paddingRight:5}}>
                                  Log In
                              
                              </h4>
                              </div>
                    </div>
                    <div style={{paddingLeft:50}}>
                          <p style={{fontWeight:'lighter',fontSize:22}}>
                            To Create a retro for your team,
                          </p>
                          <h4 style={{fontWeight:'bold',fontSize:21}}>
                            tell us about yourself:
                          </h4>
                    </div>
                    <div style={{display:'inline-flex',width:'100%',justifyContent:'space-evenly',marginTop:20}}>
                          <p style={{paddingTop:15,fontSize:18,paddingRight:10}}>
                            Your Name:
                          </p>
                          <FormGroup style={{borderColor:"#3b75fa",display:'inline-flex',justifyContent:'space-evenly'}}>
                          <FormControl style={{height:40}} size={20} type="text" onChange={(e) => this.setState({createaccountfirstname:e.target.value})}  type="text" placeholder="First Name" />
                          <FormControl style={{height:40,marginLeft:20}} size={22} onChange={(e) => this.setState({createaccountsecondname:e.target.value})} type="text"  placeholder="Last Name" />

                          </FormGroup>
                          

                    </div>

                     <div style={{display:'inline-flex',width:'100%',justifyContent:'space-evenly',marginTop:8}}>
                          <p style={{paddingTop:12,fontSize:18,paddingRight:10}}>
                            Your Email:
                          </p>
                          
                          <FormGroup style={{borderColor:"#3b75fa",display:'inline-flex',justifyContent:'space-evenly'}}>
                          <FormControl style={{height:40}} size={52} type="email" value={this.state.createuseremail}  placeholder="" onChange={(e) => this.setState({createuseremail:e.target.value})} />
                        
                          
                          </FormGroup>
                          

                    </div>
                    <div style={{display:'inline-flex',width:'100%',justifyContent:'space-evenly',marginTop:8}}>
                          <div style={{paddingLeft:14}}>

                          <p style={{paddingTop:0,fontSize:18,}}>
                            Your Password:
                          </p>
                          <p style={{textDecoration:'underline',fontSize:12}}>
                            Requirements
                          </p>
                          </div>
                          <FormGroup style={{borderColor:"#3b75fa",display:'inline-flex',justifyContent:'space-evenly',paddingRight:10}}>
                          <FormControl style={{height:40}} size={20} type="password" onChange={(e) => this.setState({createaccountpassword:e.target.value})} placeholder="password" />
                          <FormControl style={{height:40,marginLeft:20}} size={22} onChange={(e) => this.setState({createaccountconfirmpassword:e.target.value})}
                           type="password" placeholder="repeat password" />

                          </FormGroup>
                          

                    </div>

                    <div style={{display:'inline-flex',width:'100%',justifyContent:'flex-start',marginTop:5,marginLeft:'8%'}}>
                          <div>

                          <p style={{paddingTop:5,paddingLeft:10,fontSize:18}}>
                            I'm a:
                          </p>
                         
                          </div>
                          <div style={{marginLeft:'18%'}}>
                         
                          <form name="formName">
<p style={{display:"inline-flex"}}><input type="checkbox"  checked={this.state.checkstatus === 1 ? true :false} onClick={() => this.setState({checkstatus:1,status:"Business User"})} />Business User</p><br />
<p style={{display:"inline-flex"}}><input type="checkbox"  checked={this.state.checkstatus === 2 ? true :false} onClick={() => this.setState({checkstatus:2,status :"Freelance Professional"})} />Freelance Professional</p><br />
<p style={{display:"inline-flex"}}><input type="checkbox"  checked={this.state.checkstatus === 3 ? true :false} onClick={() => this.setState({checkstatus:3 ,status: "Lorem Ipsum Dolar Sit Amet"})} />Lorem Ipsum Dolar Sit Amet</p><br />
<p style={{display:"inline-flex"}}><input type="checkbox"  checked={this.state.checkstatus === 4 ? true :false} onClick={() => this.setState({checkstatus:4 ,status:"Lorem Ipsum Dolar Sit Amet"})} />Lorem Ipsum Dolar Sit Amet</p><br />
</form>
                          {/* <FormGroup>
                               <Radio style={{fontSize:13}} name="radioGroup" value="Business User" onClick={(e) => this.setState({status: e.target.value})} inline>
                               Business User
                               </Radio> <br />
                               <Radio style={{fontSize:13}} name="radioGroup" value="Freelance Professional" onClick={(e) => this.setState({status: e.target.value})}  inline>
                               Freelance Professional
                               </Radio><br />
                               <Radio  style={{fontSize:13}} name="radioGroup" value="Lorem Ipsum Dolar Sit Amet" onClick={(e) => this.setState({status: e.target.value})}  inline>
                               Lorem Ipsum Dolar Sit Amet
                               </Radio> <br />
                               <Radio style={{fontSize:13}} name="radioGroup" value="Lorem Ipsum Dolar Sit Amet" onClick={(e) => this.setState({status: e.target.value})}  inline>
                               Lorem Ipsum Dolar Sit Amet
                               </Radio> <br />
                              </FormGroup> */}
                        

                            {/* <input type="checkbox" name="vehicle1" onChange={(e) => this.setState({businessUser:e.target.value})} value={this.state.businessUser}/> Business User<br/>
                            <input type="checkbox" name="vehicle2" value={this.state.profession}/> Freelance Professional <br/>
                            <input type="checkbox" name="vehicle3" value={this.state.lorem1}/>Lorem Ipsum Dolar Sit Amet<br />
                            <input type="checkbox" name="vehicle3" value={this.state.lorem2} />Lorem Ipsum Dolar Sit Amet<br />
                          */}
                          </div>
                          

                    </div>
                    <div style={{width:'100%',display:'inline-flex',justifyContent:'center',paddingTop:20}}>

                    <Button  disabled={isValid2}  type="submit" style={{background:'#f48341',color:'white',width:"30%",height:50}}>
                          Create Account
                    </Button>
                    </div>
                    </form>
                  )}
                    </Mutation>
          </Modal.Body>
          
          </Modal>
         
          
          <Modal
          show={this.state.join}
          onHide={() => this.handlejoin()}
          container={this}
          aria-labelledby="contained-modal-title"
          
        >


             
             <Modal.Body  style={{color:'white',fontFamily: "Calibri",height:460}}>
             

          
                    <form  id="joinretro">
                    <div style={{display:"inline-flex",width:'100%',justifyContent:'space-between'}}>

                            <div style={{paddingTop:10 , paddingLeft:10}}>
                            <Icon onClick={() => this.handlejoin()} icon={ic_close} size={30} style={{color:"#6cd351"}}/>
                            </div>
                                
                            <div style={{marginTop: 17,marginRight: 20}}>
                                <p style={{color:"#6cd351",fontSize:20}}>
                                  Already have an account?
                                </p>
                                <h4 onClick={()=> this.setState({
                                  show: true,
                                  join: false,
                                  login: false
                                })} 
                                style={{textDecoration:'underline',textAlign:'right',color:"#6cd351"}}>
                                  Log In
                              
                              </h4>
                              </div>
                    </div>
                    <div style={{paddingLeft:50}}>
                          <p>
                            To Join retro,
                          </p>
                          <h4>
                                Enter your information:
                          </h4>
                    </div>
                    <div style={{display:'inline-flex',width:'100%',justifyContent:'space-evenly',marginTop:20,marginRight:20}}>
                          <p style={{paddingTop:15}}>
                            Your Name:
                          </p>
                          <FormGroup style={{borderColor:"#3b75fa",display:'inline-flex',justifyContent:'space-evenly'}}>
                          <FormControl style={{height:40}} size={18} type="text" placeholder="First Name" />
                          <FormControl style={{height:40,marginLeft:20}} size={18} type="text" placeholder="Last Name" />

                          </FormGroup>
                          

                    </div>


                    <div style={{display:'inline-flex',width:'100%',paddingLeft:60}} >
                    <Icon icon={caretRight} size={20} style={{color:"white"}}/>
                      <p>For an improved experience, <b>Create and account:</b></p>
                    </div>
                      
                     <div style={{display:'inline-flex',width:'100%',justifyContent:'space-evenly',marginTop:20}}>
                          <p style={{paddingTop:15}}>
                            Your Email:
                          </p>
                          <FormGroup style={{borderColor:"#3b75fa",display:'inline-flex',justifyContent:'space-evenly'}}>
                          <FormControl style={{height:40}} size={46} type="text" placeholder="" />
                        

                          </FormGroup>
                          

                    </div>
                       
                               
                    <div style={{width:'100%',display:'inline-flex',justifyContent:'center',paddingTop:20}}>

                    <Button  style={{background:'#f48341',color:'white',width:"30%",height:50,fontSize:16,marginLeft:5}}>
                          Join Retro
                    </Button>
                    </div>
                    </form>
                
          </Modal.Body>
         
        
        </Modal>
         

         <Modal
              
              bsSize="xs"  
          show={this.state.show}
          onHide={() => this.handlelogin()}
          container={this}
          aria-labelledby="contained-modal-title"
        >
         
             
             <Modal.Body  style={{color:'white',}}>
             <ApolloConsumer>
        {client => (

          
          <form onSubmit={async (e) => {
            e.preventDefault();
            const { data } = await client.query({
              query: loginUser,
              variables: { email: this.state.email, password : this.state.password }
            });
            if(data.signIn){
              console.log(data);
              localStorage.setItem('userdata', JSON.stringify(data.signIn));
              this.props.history.push('/createretro')
            }
            else{
              alert("This email address is not exist");
            }
          }
        }   id="loginbackground" >

                    <div style={{display:"inline-flex",width:'90%',justifyContent:'space-between'}}>
                            <div style={{paddingTop:10 , paddingLeft:10}}>
                            <Icon onClick={() => this.handlejoin()} icon={ic_close} size={30} style={{color:"#6cd351"}}/>
                            </div>
                                
                            <div style={{paddingTop:10}}>
                                <p style={{color:"#6cd351",fontSize:18,height:12}}>
                                 New to Retro App?
                                </p>
                                <h5
                                  onClick={ () => this.setState({
                                    show: false,
                                    join: false,
                                    login: true
                                  })}
                                  style={{textDecoration:'underline',textAlign:'right',color:"#6cd351",fontWeight:"bold",fontSize:18}}>
                                  Create Account
                              
                              </h5>
                              </div>
                    </div>
                    <div>
                         
                          <h4 style={{paddingLeft:60,fontSize:25}}>
                               Please log in:
                          </h4>
                    </div>
                    <div style={{display:'inline-flex',width:'100%',justifyContent:'space-evenly',marginTop:50}}>
                          <p style={{paddingTop:6,width:"17%",fontSize:20}}>
                            Your Email:
                          </p>
                          <FormGroup style={{borderColor:"#3b75fa",display:'inline-flex',justifyContent:'space-evenly'}}>
                          <FormControl style={{height:40}} size={44} onChange={(e) => this.setState({email:e.target.value})}
                           type="email" required placeholder="" />
                        
                        
                          </FormGroup>
                          </div>


                       <div style={{display:'inline-flex',width:'100%',justifyContent:'space-evenly',marginTop:5}}>
                          <div style={{paddingLeft:14,width:"23%"}}>

                          <p style={{width:"100%",fontSize:20,height:15}}>
                            Your Password:
                          </p>
                          <p style={{textDecoration:"underline",fontSize:12}}>
                            
                            Requirements
                              
                          </p>
                          </div>
                          
                          <FormGroup style={{borderColor:"#3b75fa",display:'inline-flex',justifyContent:'space-evenly',paddingRight:16}}>
                          <FormControl style={{height:40}} size={44} onChange={(e) => this.setState({password:e.target.value})}
                           type="password" placeholder="" />
                        

                          </FormGroup>
                          

                    </div>
  
                 
                    <div style={{width:'100%',display:'inline-flex',justifyContent:'center',paddingTop:20,paddingLeft:70}}>

                        
                      
                    <Button disabled={isValid}  type="submit"  style={{background:'#f48341',color:'white',width:"30%",height:50}}>
                      Log In
                    </Button>
                     
                    </div>
                           </form>
                  )}
                    </ApolloConsumer>
                    
                    </Modal.Body>
         
        
        </Modal>
        </div>
         </div>

         
        )
    }
}


// export function mapStateToProps(state) {
//   console.log(state) 
//     return {
 
//   }
// }

// export function mapDispatchToProps(dispatch) {
//   return {
//      userlogin : (data) => {dispatch(userlogin(data))}
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Landingpage)

export default compose(
  graphql(signUpuser, { name: "mysignup" })
)(Landingpage)
// export default Landingpage;