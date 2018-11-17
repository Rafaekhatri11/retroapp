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
import { close } from 'react-icons-kit/fa/close';
import Icon from 'react-icons-kit';
import starpng from './star.png';
import likespng from './likes.png'
import searchpng from './search.png';
import green from './green.png';
import green2 from './green2.png';
import {connect} from 'react-redux';
import { userlogin } from '../../store/action/action';
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
      status : ''
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
        Email: this.state.email,
        Pass: this.state.password
    }
   
    const json = JSON.stringify(data);
    axios.post('http://localhost:5000/user/login', { json }).then(res => {
        console.log( '=======',res ,res.data);
        if(res.data.token){
        localStorage.setItem('userdata', JSON.stringify(res.data));
      //   dispatch({type: myActions.userlogin , payload:data})
        this.props.history.push('/createretro');
         }

        else{
            alert(res.data.message);
        }
        
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



  createAccount(){
      if(this.state.createaccountconfirmpassword === this.state.createaccountpassword){
        const user = {
          Firstname: this.state.createaccountfirstname,
          Lastname: this.state.createaccountsecondname,
          Email: this.state.createuseremail,
          Pass: this.state.createaccountconfirmpassword,
          Status : this.state.status
      }
      const json = JSON.stringify(user);
      axios.post('http://localhost:5000/user/signup', { json }).then(res => {
          console.log(res);
          alert(res.data.message);
          if(res.data.token){
              this.setState({
                  createaccountfirstname: "",
                  createaccountsecondname: "",
                  createuseremail: "",
                  createaccountconfirmpassword: "",
                  createaccountpassword :""
              })
              localStorage.setItem('userdata', JSON.stringify(res.data));
             // this.props.history.push('/Productlist');
      }
          else{
              alert(res.data.message);
          }
      })
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
         <div >
           <div>

 <Navbar style={{height:60,background:'rgba(255,255,255)',}} collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <img src={logo} alt="Retro"  width="140" style={{height:60}} />
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
            
              <Nav style={{paddingTop:5 , justifyContent:'space-around'}} pullRight>
                <NavItem  id="join" >
                  Join/Create
                </NavItem>
                <NavItem  href="#features">
                  Features
                </NavItem>
                <NavItem  href="#getbeta">
                  Get the Beta
                </NavItem>
                <NavItem href="#getbeta">

                  Plan & Pricing
                </NavItem>
                <Navbar.Form pullRight>
               
                  <Button onClick={() => this.setState({login:false,join:false,show:true})} style={{background:'black',color:'white'}}>Log In/Sign Up</Button>
                </Navbar.Form>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
            
           </div>

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
                          <Button bsSize="large" onClick={() => this.setState({join:true})} style={{background:'#3b75fa',color:'white'}}>Join Retro</Button>
                          </div>
                          :
                            <div style={{display:'flex',}}>
                          <Button bsSize="large" onClick={() => this.setState({joinretro:true})} style={{background:'#3b75fa',color:'white'}}>
                          Join Retro</Button>
                          <Button bsSize="large" onClick={()  => this.setState({login:true})}
                           style={{background:'#f48341',color:'white',marginLeft:20}}>
                          Create Retro</Button>
                            </div>
                        
                          }
                        </form>
                  </div>
                  <div style={{width:"60%",display: 'flex',justifyContent:"flex-end"}}>

                 <img src={teampic}  alt="team" height="350" width="650" />
                  </div>
            </div>

<div style={{display:'inline-flex',width:'100%',background:'white'}}>
                  <div>

                 <img src={curve} alt="team" height="800" width="300" />
                  </div>
                  <div style={{paddingTop:20,width:'100%'}}>
                        

                        <h1 style={{textAlign:"flex-start",marginLeft:35}}>
                          Better decisions. Better products. Stronger teams.
                       
                        </h1>
                        <h4 style={{textAlign:"flex-start"}}>
                         Share your thoughts. Vote on what's important. Group your ideas. Commit to a better process and better future.
                       
                        </h4>
                        

                        <div style={{display:'inline-flex',width:'75%',marginTop:"5%"}}>
                            <div style={{width:"50%",}}>
                                
                                <img src={starpng} />
                              
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
                      <h1 style={{textAlign:'center'}}>
                        Sign Up for the Beta 
                      </h1>

                    <form style={{display:'inline-flex',width:'100%',justifyContent:'center',height:50,borderColor:'#3b75fa',borderWidth:2}}>
                          <FormGroup style={{borderColor:"#3b75fa",}}>
                          <FormControl style={{height:50}} size={40} type="text" placeholder="youremail@yourcompany.com" />
                          </FormGroup>
                          <Button bsSize="large" style={{background:'#f48341',color:'white'}}>Submit</Button>
                        </form>
                  </div>   
          
                  <div style={{paddingTop:'5%'}}>
                  <h1 style={{textAlign:'center'}} id="getbeta">
                        Plans & Pricing 
                      </h1>
                  
                  

                  <div style={{display:'inline-flex',justifyContent:"center",margin:10,paddingLeft:10,width:'100%',marginBottom:70}}>
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
          onHide={() => this.handleHide()}
          container={this}
          aria-labelledby="contained-modal-title"
         
          >
         
          <Modal.Body  style={{background:'#133a62',color:'white'}}>
                    
                                        <form onSubmit={() => this.createAccount()}>
                    <div style={{display:"inline-flex",width:'100%',justifyContent:'space-between'}}>
                            <Icon onClick={() => this.handleHide()} icon={close} size={30} style={{color:"#6cd351"}} />
                            </div>
                                
                     <div>
                              <div>
                                <p style={{color:"#6cd351"}}>
                                  Already have an account?
                                </p>
                                <h4 onClick={()=> this.setState({
                                  show: true,
                                  join: false,
                                  login: false
                                })} style={{textDecoration:'underline',textAlign:'right',color:"#6cd351"}}>
                                  Log In
                              
                              </h4>
                              </div>
                    </div>
                    <div>
                          <p>
                            To Create a retro for your team,
                          </p>
                          <h4>
                            tell us about yourself:
                          </h4>
                    </div>
                    <div style={{display:'inline-flex',width:'100%',justifyContent:'space-evenly',marginTop:20}}>
                          <p style={{paddingTop:15}}>
                            Your Name:
                          </p>
                          <FormGroup style={{borderColor:"#3b75fa",display:'inline-flex',justifyContent:'space-evenly'}}>
                          <FormControl style={{height:40}} size={10} type="text" onChange={(e) => this.setState({createaccountfirstname:e.target.value})}  type="text" placeholder="First Name" />
                          <FormControl style={{height:40,marginLeft:20}} size={12} onChange={(e) => this.setState({createaccountsecondname:e.target.value})} type="text"  placeholder="Last Name" />

                          </FormGroup>
                          

                    </div>

                     <div style={{display:'inline-flex',width:'100%',justifyContent:'space-evenly',marginTop:20}}>
                          <p style={{paddingTop:15}}>
                            Your Email:
                          </p>
                          
                          <FormGroup style={{borderColor:"#3b75fa",display:'inline-flex',justifyContent:'space-evenly'}}>
                          <FormControl style={{height:40}} size={36} type="email" value={this.state.createuseremail}  placeholder="" onChange={(e) => this.setState({createuseremail:e.target.value})} />
                        

                          </FormGroup>
                          

                    </div>
                    <div style={{display:'inline-flex',width:'100%',justifyContent:'space-evenly',marginTop:20}}>
                          <div>

                          <p style={{paddingTop:0}}>
                            Your Password:
                          </p>
                          <p style={{textDecoration:'underline',fontSize:12}}>
                            Requirements
                          </p>
                          </div>
                          <FormGroup style={{borderColor:"#3b75fa",display:'inline-flex',justifyContent:'space-evenly',paddingRight:10}}>
                          <FormControl style={{height:40}} size={12} type="password" onChange={(e) => this.setState({createaccountpassword:e.target.value})} placeholder="password" />
                          <FormControl style={{height:40,marginLeft:20}} size={12} onChange={(e) => this.setState({createaccountconfirmpassword:e.target.value})}
                           type="password" placeholder="repeat password" />

                          </FormGroup>
                          

                    </div>

                    <div style={{display:'inline-flex',width:'100%',justifyContent:'flex-start',marginTop:20,marginLeft:'8%'}}>
                          <div>

                          <p style={{paddingTop:0,paddingLeft:20}}>
                            I'm a:
                          </p>
                         
                          </div>
                          <div style={{marginLeft:'22%'}}>
                          
                          <FormGroup>
                               <Radio name="radioGroup" value="Business User" onClick={(e) => this.setState({status: e.target.value})} inline>
                                Business User
                              </Radio> <br />
                              <Radio name="radioGroup" value="Freelance Professional" onClick={(e) => this.setState({status: e.target.value})}  inline>
                                Freelance Professional
                              </Radio><br />
                              <Radio name="radioGroup" value="Lorem Ipsum Dolar Sit Amet" onClick={(e) => this.setState({status: e.target.value})}  inline>
                                Lorem Ipsum Dolar Sit Amet
                              </Radio> <br />
                              <Radio name="radioGroup" value="Lorem Ipsum Dolar Sit Amet" onClick={(e) => this.setState({status: e.target.value})}  inline>
                                Lorem Ipsum Dolar Sit Amet
                              </Radio> <br />
                          </FormGroup>
                        

                            {/* <input type="checkbox" name="vehicle1" onChange={(e) => this.setState({businessUser:e.target.value})} value={this.state.businessUser}/> Business User<br/>
                            <input type="checkbox" name="vehicle2" value={this.state.profession}/> Freelance Professional <br/>
                            <input type="checkbox" name="vehicle3" value={this.state.lorem1}/>Lorem Ipsum Dolar Sit Amet<br />
                            <input type="checkbox" name="vehicle3" value={this.state.lorem2} />Lorem Ipsum Dolar Sit Amet<br />
                         */}
                          </div>
                          

                    </div>
                    <div style={{width:'100%',display:'inline-flex',justifyContent:'center',paddingTop:20}}>

                    <Button bsSize="large" disabled={isValid2}  type="submit" style={{background:'#f48341',color:'white'}}>
                          Create Account
                    </Button>
                    </div>
                    </form>
          </Modal.Body>
         
        </Modal>
         
         
        <Modal
          show={this.state.join}
          onHide={() => this.handlejoin()}
          container={this}
          aria-labelledby="contained-modal-title"
         
        >


             
             <Modal.Body  style={{background:'#133a62',color:'white'}}>
                    
                    <div style={{display:"inline-flex",width:'100%',justifyContent:'space-between'}}>
                            <div>
                            <Icon onClick={() => this.handlejoin()} icon={close} size={30} style={{color:"#6cd351"}}/>
                            </div>
                                
                            <div>
                                <p style={{color:"#6cd351"}}>
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
                    <div>
                          <p>
                            To Join retro,
                          </p>
                          <h4>
                                Enter your information:
                          </h4>
                    </div>
                    <div style={{display:'inline-flex',width:'100%',justifyContent:'space-evenly',marginTop:20}}>
                          <p style={{paddingTop:15}}>
                            Your Name:
                          </p>
                          <FormGroup style={{borderColor:"#3b75fa",display:'inline-flex',justifyContent:'space-evenly'}}>
                          <FormControl style={{height:40}} size={12} type="text" placeholder="First Name" />
                          <FormControl style={{height:40,marginLeft:20}} size={12} type="text" placeholder="Last Name" />

                          </FormGroup>
                          

                    </div>


                    <div>
                      <p style={{paddingLeft:45}}>For an improved experience, <b>Create and account:</b></p>
                    </div>
                      
                     <div style={{display:'inline-flex',width:'100%',justifyContent:'space-evenly',marginTop:20}}>
                          <p style={{paddingTop:15}}>
                            Your Email:
                          </p>
                          <FormGroup style={{borderColor:"#3b75fa",display:'inline-flex',justifyContent:'space-evenly'}}>
                          <FormControl style={{height:40}} size={36} type="text" placeholder="" />
                        

                          </FormGroup>
                          

                    </div>
                 
                    <div style={{width:'100%',display:'inline-flex',justifyContent:'center',paddingTop:20}}>

                    <Button bsSize="large" style={{background:'#f48341',color:'white'}}>
                          Join Retro
                    </Button>
                    </div>
          </Modal.Body>
         
        
        </Modal>
         

                <Modal
          show={this.state.show}
          onHide={() => this.handlelogin()}
          container={this}
          aria-labelledby="contained-modal-title"
        >
             
             <Modal.Body  style={{background:'#133a62',color:'white'}}>
                    <form onSubmit={(evt) => this.login(evt)}>

                    <div style={{display:"inline-flex",width:'100%',justifyContent:'space-between'}}>
                            <div>
                            <Icon onClick={() => this.handlejoin()} icon={close} size={30} style={{color:"#6cd351"}}/>
                            </div>
                                
                            <div>
                                <p style={{color:"#6cd351"}}>
                                 New to Retro App?
                                </p>
                                <h4 
                                  onClick={ () => this.setState({
                                    show: false,
                                    join: false,
                                    login: true
                                  })}
                                  style={{textDecoration:'underline',textAlign:'right',color:"#6cd351"}}>
                                  Create Account
                              
                              </h4>
                              </div>
                    </div>
                    <div>
                         
                          <h4>
                               Please log in
                          </h4>
                    </div>
                    <div style={{display:'inline-flex',width:'100%',justifyContent:'space-evenly',marginTop:20}}>
                          <p style={{paddingTop:15}}>
                            Your Email:
                          </p>
                          <FormGroup style={{borderColor:"#3b75fa",display:'inline-flex',justifyContent:'space-evenly'}}>
                          <FormControl style={{height:40}} size={44} onChange={(e) => this.setState({email:e.target.value})}
                           type="email" required placeholder="" />
                        
                        
                          </FormGroup>
                          </div>


                       <div style={{display:'inline-flex',width:'100%',justifyContent:'space-evenly',marginTop:20}}>
                          <p style={{paddingTop:15}}>
                            Your Password:
                          </p>
                          <FormGroup style={{borderColor:"#3b75fa",display:'inline-flex',justifyContent:'space-evenly'}}>
                          <FormControl style={{height:40}} size={44} onChange={(e) => this.setState({password:e.target.value})}
                           type="password" placeholder="" />
                        

                          </FormGroup>
                          

                    </div>
  
                 
                    <div style={{width:'100%',display:'inline-flex',justifyContent:'center',paddingTop:20}}>

                        
                      
                    <Button disabled={isValid}  type="submit"  style={{background:'#f48341',color:'white',width:"30%",height:50}}>
                      Log In
                    </Button>
                     
                    </div>
                           </form>
                    
          </Modal.Body>
         
        
        </Modal>
         
         </div>

         
        )
    }
}


export function mapStateToProps(state) {
  console.log(state) 
    return {
 
  }
}

export function mapDispatchToProps(dispatch) {
  return {
     userlogin : (data) => {dispatch(userlogin(data))}
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Landingpage)