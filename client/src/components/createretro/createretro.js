import React, { Component } from 'react';
import { Navbar, Nav, NavItem, 
  Button, MenuItem, NavDropdown, FormControl, Tabs,Tab,
  Table, Modal, Form, FormGroup, ControlLabel } from 'react-bootstrap';
import logo from './Selection_003.png';
import personlogo from './dropdownpersion.png';
import { caretRight } from 'react-icons-kit/fa/caretRight';
import {checkCircle} from 'react-icons-kit/fa/checkCircle';
import Icon from 'react-icons-kit';
import {ic_close} from 'react-icons-kit/md/ic_close';
import './style.css';
var jwt = require('jsonwebtoken');
class Createretro extends Component {
  constructor(){
    super();
    this.state = {
        userinfo : {}
    }
  }
   componentDidMount(){
    var data = localStorage.getItem('userdata');
    var userdata = JSON.parse(data);
     
    
    jwt.verify(userdata.token, 'secret', (err, decoded) => {
            console.log(decoded);
            this.setState({ userinfo: decoded })
            
          });
          
          //this timeout is used for check user information thorugh api is takes some time
        //  setTimeout(() => {console.log(this.state.userinfo)} ,5000);
        }
  logout(){
    localStorage.clear();
    this.props.history.push('/');


  }
  render() {
    return (
      <div>
        <Navbar style={{ height: 60, background: 'rgba(255,255,255)', }} collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <img src={logo} alt="Retro" width="140" style={{ height: 60 }} />
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>

            <Nav style={{ paddingTop: 5, justifyContent: 'space-around' }} pullRight>

              <NavDropdown className="mydropdown" title={<div style={{ display: 'inline-flex', height: 20,bottom:0 }}><p style={{ color: "#133a62",paddingTop:2 }}>Hi, Bob!</p><img width="25" height="25" style={{marginLeft:15,background:'none'}} src={personlogo} /></div>}  >

                <MenuItem style={{textAlign:'right',background:"#133a62",color:'white'}} >My Profile</MenuItem>
                <MenuItem style={{textAlign:'right',background:"#133a62",color:'white'}}>Enterprise Account</MenuItem>
                <MenuItem style={{textAlign:'right',background:"#133a62",color:'white'}}>My Retros</MenuItem>

                <MenuItem style={{textAlign:'right',background:"#133a62",color:'white'}}>My Templates</MenuItem>
                <MenuItem onClick={() => this.logout()} style={{textAlign:'right',color:'#f3e2d8',background:"#133a62"}}>Sign Out</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div style={{display:'inline-flex',width:'100%',justifyContent:'center'}}>
                  <div style={{display:"inline-flex",borderBottomColor:'#2f71aa',width:'10%'}}>
                        <Icon icon={checkCircle} size={20} style={{color:'#2f71aa',paddingTop:5}} />
                        <h6 style={{color:'#2f71aa'}}>Create Retro</h6>
                      
                  </div>
                  <div style={{width:'10%'}}>
                      <h6 style={{color:'grey'}}>Invite team</h6>
                  </div>
        </div>
        <div style={{ display: 'inline-flex', width: '100%' }}>
          <div style={{ width: '40%',display:'inline-flex',justifyContent:'center' }}>
            <div style={{width:'80%'}}>
              <div>

                <h4 style={{ color: "#133a62" }}>
                  Project Information
                      </h4>
                <Form style={{ width: '100%' }} inline>
                  {/* <FormGroup controlId="formInlineName">

                    <FormControl size={32} type="text"  placeholder="Project Name" />
                  </FormGroup> */}
                  
                    <FormControl bsSize="medium"  style={{width:'70%'}} componentClass="select">
                    <option>Project Name</option>
                      <option>Dance Technologies Android App</option>
                      <option>DKG</option>
                      <option>Donut Guy Website</option>
                      <option>DIY App</option>
                     

                      <option style={{background:"#133a62",color:'white'}}>
                      {/* <i> <Icon icon={ic_close} size={10}/></i> */}
                      New Project
                      </option>
                      
                    </FormControl>
                  
                  <FormGroup controlId="formInlineEmail">

                    <FormControl size={7} style={{ marginLeft: 10 }} type="email" placeholder="Sprint Number" />
                  </FormGroup>

                </Form>
                <p style={{ display: 'flex', justifyContent: 'flex-end' }}>

                  <a>
                    optional
                    </a>
                </p>
              </div>
              <div>

                <h4 style={{ color: "#133a62" }}>
                  Choose a Template:
                      </h4>

                <div>

                  <div style={{ display: 'inline-flex', width: '100%', height: 40 ,background:'#f6f6f6'}}>

                    <Icon icon={caretRight} size={20} style={{ marginTop: 8, color: "#f3764e" }} />
                    {/* <FormGroup
                      controlId="formBasicText"
                    >

                      <FormControl
                        type="text"
                        size={48}
                        placeholder="Sprint Ceremonies"
                        onChange={this.handleChange}
                      />

                    </FormGroup> */}


                    <FormControl bsSize="medium"  style={{width:'95%'}} componentClass="select" placeholder="Sprint Ceremonies">
                    <option disabled>Default Templates</option>
                    <option>Sprint Ceremonies</option>
                      <option >Product Launch</option>
                      <option>Failed Sprint</option>
                      <option>Client Check-in</option>
                      <option disabled>My Templates</option>
                      <option>Dance Technologies Template</option>
                      <option>Bob's Retro Template</option>
                      <option style={{background:"#133a62",color:'white'}}>
                      {/* <i> <Icon icon={ic_close} size={10}/></i> */}
                      New Template
                      </option>
                      
                    </FormControl>
                    
                  </div>
                </div>
              </div>

              <div style={{ display: 'inline-flex', width: '100%', justifyContent: "space-between" ,paddingTop:50}}>

                <h4 style={{ color: "#133a62" }}>
                  Retro Categories
                </h4>
                <Button bsSize="xsmall" style={{ borderRadius: 15, width: 75, height: 25, alignSelf: 'center' }} bsStyle="primary">Edit</Button>

              </div>


                    

                    <div style={{width:'100%',background:'#f6f6f6',paddingLeft:15,height:50,display:'flex',alignItems:'center'}}>
                    <h4 >What went well?</h4>
                    </div>
                    <div style={{width:'100%',background:'#f6f6f6',paddingLeft:15,height:50,display:'flex',alignItems:'center',marginTop:10}}>
                      <h4>What did we learn?</h4>
                      </div>
                    <div style={{width:'100%',background:'#f6f6f6',paddingLeft:15,height:50,display:'flex',alignItems:'center',marginTop:10}}>
                      <h4>What can we improve?</h4>
                      </div>
                    <div style={{width:'100%',background:'#f6f6f6',paddingLeft:15,height:50,display:'flex',alignItems:'center',marginTop:10}}>
                      <h4>What puzzles us?</h4>
                      </div>
                  
          </div>

            </div>
            <div style={{width:'60%',display:'inline-flex', justifyContent: 'space-evenly',paddingTop: '10%'}}>
                  <div style={{width:"20%",background:'#f3e2d8'}}>
                    <h6 style={{textAlign:'center',}}>What went well</h6>
                  </div>

                  <div  style={{width:"20%",background:'#f3e2d8'}}>
                    <h6 style={{textAlign:'center'}}>What did we learn</h6>
                  </div>

                  <div  style={{width:"20%",background:'#f3e2d8'}}>
                    <h6 style={{textAlign:'center'}}>What can we improve</h6>
                  </div>

                  <div style={{width:"20%",background:'#f3e2d8'}}>
                    <h6 style={{textAlign:'center'}}>What Puzzles</h6>
                  </div>
            </div>
           </div>
                <div style={{display:'inline-flex',justifyContent:'center',width:"100%"}}>
                <Button bsStyle="primary" bsSize="lg" style={{width:'20%',marginTop:'5%'}}>
                    Next
                  </Button>
 
                </div>
      </div>
    );
  }
}


export default Createretro;