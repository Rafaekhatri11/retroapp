import React, { Component } from 'react';
import {
  Navbar, Nav, NavItem,
  Button, MenuItem, NavDropdown, FormControl, Tabs, Tab,
  Table, Modal, Form, FormGroup, ControlLabel ,
} from 'react-bootstrap';
import logo from './Selection_003.png';
import personlogo from './dropdownpersion.png';
import { caretRight } from 'react-icons-kit/fa/caretRight';
import { checkCircle } from 'react-icons-kit/fa/checkCircle';
import Icon from 'react-icons-kit';
import { close } from "react-icons-kit/fa/close";
import { ic_close } from 'react-icons-kit/md/ic_close';
import {ic_add_circle} from 'react-icons-kit/md/ic_add_circle'
import './style.css';
import gql from "graphql-tag";

import { Mutation, compose, graphql, } from "react-apollo";
var jwt = require('jsonwebtoken');


const submitcreateretro = gql`
mutation(
  $useruid: ID!
  $projectname: String!
  $sprintnumber: String!
  $templatename: String!
  $retrocategory1: String!
  $retrocategory2: String!
  $retrocategory3: String!
  $retrocategory4: String!) {

    createretro(
      useruid:  $useruid
      projectname:  $projectname
      sprintnumber: $sprintnumber
      templatename: $templatename
      retrocategory1: $retrocategory1
      retrocategory2: $retrocategory2
      retrocategory3: $retrocategory3
      retrocategory4: $retrocategory4){
        id
        useruid
        projectname
        sprintnumber
        templatename
        retrocategory1
        retrocategory2
        retrocategory3
        retrocategory4
      }

    }
`

class Createretro extends Component {
  constructor() {
    super();
    this.state = {
      userinfo: {},
      sprint : "",
      edit: false,
      projectname: false,
      nameofproject: '',
      show: false,
      show1: false,
      templatename: '',
      whatdidwelearn: 'What did we learn?',
      whatwentwell: 'What went well?',
      whatcanweimprove: 'What can we improve?',
      whatpuzzleus: 'What puzzles us?',
      reset: false,
      newtemplatename: ''
    }
  }
  componentDidMount() {
    var data = localStorage.getItem('userdata');
    var userdata = JSON.parse(data);


    // jwt.verify(userdata.token, 'secret', (err, decoded) => {
    //   console.log(decoded);
    //   this.setState({ userinfo: decoded })

    // });

    //this timeout is used for check user information thorugh api is takes some time
    //  setTimeout(() => {console.log(this.state.userinfo)} ,5000);
  }

  handleHide() {
    this.setState({ show: false });
    var dropdownvalue = document.getElementById('mydropdown');
    var options = document.createElement("option");
    options.setAttribute('selected', "selected")
    var optiontext = document.createTextNode(this.state.nameofproject);
    // var att = document.createAttribute("selected");
    // att.value = "selected";
    var newdropdown = options.appendChild(optiontext);
    // newdropdown.setAttributNode(att);
    dropdownvalue.appendChild(options);


    // att.value = "selected";
    // var newdropdown =  options.appendChild(optiontext);
    // newdropdown.setAttributNode(att);
  }
  newtemplatevalue() {
    var newtemplatename = document.getElementById("savetemplate");
    var options = document.createElement("option");
    options.setAttribute('selected', "selected");
    var optiontext = document.createTextNode(this.state.newtemplatename);
    // var att = document.createAttribute("selected");
    // att.value = "selected";
    var newdropdown = options.appendChild(optiontext);
    // newdropdown.setAttributNode(att);
    newtemplatename.appendChild(options);
  
  }

  changeimage(evt){
    console.log("run or not",evt);
    if( evt === 2){

      document.getElementById("createretrobackground").id = "inviteretro"; 
    }
    else if(evt === 1 ){
      document.getElementById("inviteretro").id = "createretrobackground"; 
    }
  }

  handleHide1() {
    this.setState({ show1: false });
  }
  getprojectnam(evt) {
    if (evt.target.value === "New Project") {
      this.setState({ show: true, })
    }
    else {
      this.setState({ nameofproject: evt.target.value });
    }
  }


  gettemplatename(evt) {
    if (evt.target.value === "New Template") {
      this.setState({ show1: true, reset: true, templatename: evt.target.value });
    }
    else {
      this.setState({ templatename: evt.target.value });
    }

  }

  logout() {
    localStorage.clear();
    this.props.history.push('/');
  }


  render() {

    const { newtemplatename , nameofproject, templatename } = this.state;
    const valid = newtemplatename === "";
    const valid2 = nameofproject === "" || templatename  ===  "";
    console.log(this.state.templatename);
    return (

      <div id="createretrobackground">
        <div style={{ background: 'rgba(255,255,255,0.5' }}>

          <Navbar style={{ height: 60, background: 'rgba(255,255,255,0.5)', }} collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <img src={logo} alt="Retro" width="140" style={{ height: 60 }} />
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>

              <Nav style={{ paddingTop: 5, justifyContent: 'space-around' }} pullRight>

                <NavDropdown className="mydropdown" title={<div style={{ display: 'inline-flex', height: 20, bottom: 0 }}><p style={{ color: "#133a62", paddingTop: 2 }}>Hi, Bob!</p><img width="25" height="25" style={{ marginLeft: 15, background: 'none' }} src={personlogo} /></div>}  >

                  <MenuItem style={{ textAlign: 'right', background: "#133a62", color: 'white' }} >My Profile</MenuItem>
                  <MenuItem style={{ textAlign: 'right', background: "#133a62", color: 'white' }}>Enterprise Account</MenuItem>
                  <MenuItem style={{ textAlign: 'right', background: "#133a62", color: 'white' }}>My Retros</MenuItem>

                  <MenuItem style={{ textAlign: 'right', background: "#133a62", color: 'white' }}>My Templates</MenuItem>
                  <MenuItem onClick={() => this.logout()} style={{ textAlign: 'right', background: "#133a62" }}>Sign Out</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Tabs defaultActiveKey={1} onSelect={(evt)=> this.changeimage(evt)}  id="uncontrolled-tab-example">
            <Tab value="1"  eventKey={1} title={<div style={{ display: 'inline-flex' }}><Icon icon={checkCircle} size={20} /><p style={{ paddingLeft: 5 }}>Create Retro</p></div>}>
              
            <Mutation mutation={submitcreateretro}>

                {(createretro, {data}) => (

                <form onSubmit={e => {e.preventDefault();
                  this.setState({newtemplatename : this.state.templatename});
                  createretro({variables: {
                      useruid: "sdfsdf",
                      projectname: this.state.nameofproject ,
                      sprintnumber: this.state.sprint,
                      templatename : this.state.newtemplatename,
                      retrocategory1 : this.state.whatwentwell,
                      retrocategory2 : this.state.whatdidwelearn,
                      retrocategory3 : this.state.whatcanweimprove,
                      retrocategory4 : this.state.whatpuzzleus
                    }});
                    
                }}>
                  

                
              <div style={{ display: 'inline-flex', width: '100%' }}>

               
                <div style={{ width: '40%', display: 'inline-flex', justifyContent: 'center' }}>
                  <div style={{ width: '75%' ,    paddingTop: "13%" }}>
                    <div style={{ width: '100%' }}>

                      <h4 style={{ color: "#133a62", fontWeight: "bold" }}>
                        Project Information
                      </h4> 
                      <Form style={{ width: '100%' }} inline>


                        {
                          
                          this.state.nameofproject === "true" ?
                            <FormGroup controlId="formInlineEmail">

                              <FormControl size={25} onChange={(evt) => this.setState({ nameofproject: evt.target.value })}
                                style={{ marginLeft: 10 }} type="text" placeholder="Enter Project Information" />
                              {/* <Button onClick={() => this.setState({projectname:false})} bsStyle="primary" bsSize="small">Done</Button> */}
                            </FormGroup>
                            :
                            <FormControl onChange={(evt) => this.getprojectnam(evt)} bsSize="medium" id="mydropdown"
                            style={{ width: '75%',paddingTop: 3,
                              fontSize: 20,
                              paddingLeft: 20 }} componentClass="select">
                              <option name="Projectname" value="Project Name">Project Name</option>
                              <option name="Projectname" value="Dance Technologies Android App">Dance Technologies Android App</option>
                              <option name="Projectname" value="DKG">DKG</option>
                              <option name="Projectname" value="Donut Guy Website">Donut Guy Website</option>
                              <option name="Projectname" value="DIY App">DIY App</option>


                              <option name="Projectname" value="New Project" style={{ background: "#133a62", color: 'white' }}>
                               {/* <i> <Icon icon={ic_close} size={10}/></i>  */}
                                New Project
                          </option>

                            </FormControl>}

                        <FormGroup controlId="formInlineEmail">

                          <FormControl size={8} style={{ marginLeft: 10 }} type="text" onChange={(e) => this.setState({sprint:e.target.value}) } placeholder="Sprint Number" />
                        </FormGroup>

                      </Form>
                      <p style={{ display: 'flex', justifyContent: 'flex-end',paddingRight:15 }}>

                        <a>
                          optional
                         </a>
                      </p>
                    </div>
                    <div>

                      <h4 style={{ color: "#133a62", fontWeight: "bold" }}>
                        Choose a Template:
                      </h4>

                      <div>

                        <div style={{ display: 'inline-flex', width: '100%', height: 40, background: '#f6f6f6' }}>

                           {/* <Icon icon={caretRight} size={20} style={{ marginTop: 8, color: "#f3764e" }} /> */}
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


                          <FormControl bsSize="medium" id="mydropdown" style={{ width: '95%',paddingTop: 3,
                              fontSize: 20,
                              paddingLeft: 20 }} 
                              onChange={(evt) => this.gettemplatename(evt)}
                              componentClass="select" formva placeholder="Sprint Ceremonies">
                            <option name="Template" disabled>Default Templates</option>
                            <option name="Template" value="Sprint Ceremonies">Sprint Ceremonies</option>
                            <option name="Template" value="Product Launch">Product Launch</option>
                            <option name="Template" value="Failed Sprint">Failed Sprint</option>
                            <option name="Template" value="Client Check-in">Client Check-in</option>
                            <option name="Template" disabled>My Templates</option>
                            <option name="Template" value="Dance Technologies Template">Dance Technologies Template</option>
                            <option name="Template" value="Bob's Retro Template">Bob's Retro Template</option>
                            <option name="Template" value="New Template" style={{ background: "#133a62", color: 'white' }}>
                              {/* <i> <Icon icon={ic_close} size={10}/></i> */}
                              New Template
                          </option>

                          </FormControl>

                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'inline-flex', width: '100%', justifyContent: "space-between", paddingTop: 50 }}>

                      <h4 style={{ color: "#133a62", fontWeight: "bold" }}>
                        Retro Categories
                      </h4>
                      {
                        this.state.reset ?
                        <button style={{ borderRadius: 15, width: 75, height: 25, alignSelf: 'center' }}
                        onClick={() => this.setState({ show1: false, reset: false, backgroundColor: "white", color:"#6e7ac7",borderColor:"#6e7ac7"  })}>
                            Reset</button>
                          :
                          <button id="editbutton" style={{borderRadius: 15, width: 75, height: 25, alignSelf: 'center' }}
                          onClick={() => this.setState({ show1: true, reset: true })}>Edit</button>
                        }

                    </div>

                    {
                      this.state.show1 ?
                      
                      
                      <div>
                          <h6 style={{ color: '#aaabad', fontSize: 16 }}>Enter these catogories by typing over them</h6>
                          <div style={{ width: '100%', background: '#f6f6f6', paddingLeft: 15, height: 50, display: 'flex', alignItems: 'center' }}>
                            <FormControl size={20} onChange={(evt) => this.setState({ whatwentwell: evt.target.value })}
                              style={{}} type="text" value={this.state.whatwentwell} />
                          </div>
                          <div style={{ width: '100%', background: '#f6f6f6', paddingLeft: 15, height: 50, display: 'flex', alignItems: 'center', marginTop: 10 }}>

                            <FormControl size={20} onChange={(evt) => this.setState({ whatdidwelearn: evt.target.value })}
                              style={{}} type="text" value={this.state.whatdidwelearn} />
                          </div>
                          <div style={{ width: '100%', background: '#f6f6f6', paddingLeft: 15, height: 50, display: 'flex', alignItems: 'center', marginTop: 10 }}>

                            <FormControl size={20} onChange={(evt) => this.setState({ whatcanweimprove: evt.target.value })}
                              style={{}} type="text" value={this.state.whatcanweimprove} />
                          </div>
                          <div style={{ width: '100%', background: '#f6f6f6', paddingLeft: 15, height: 50, display: 'flex', alignItems: 'center', marginTop: 10 }}>

                            <FormControl size={20} onChange={(evt) => this.setState({ whatpuzzleus: evt.target.value })}
                              style={{}} type="text" value={this.state.whatpuzzleus} />
                          </div>
                        </div>
                        :
                        
                        <div>

                          <div style={{ width: '100%', background: '#f6f6f6', paddingLeft: 15, height: 50, display: 'flex', alignItems: 'center' }}>
                            <h4 >{this.state.whatwentwell}</h4>
                          </div>
                          <div style={{ width: '100%', background: '#f6f6f6', paddingLeft: 15, height: 50, display: 'flex', alignItems: 'center', marginTop: 10 }}>
                            <h4>{this.state.whatdidwelearn}</h4>
                          </div>
                          <div style={{ width: '100%', background: '#f6f6f6', paddingLeft: 15, height: 50, display: 'flex', alignItems: 'center', marginTop: 10 }}>
                            <h4>{this.state.whatcanweimprove}</h4>
                          </div>
                          <div style={{ width: '100%', background: '#f6f6f6', paddingLeft: 15, height: 50, display: 'flex', alignItems: 'center', marginTop: 10 }}>
                            <h4>{this.state.whatpuzzleus}</h4>
                          </div>

                        </div>

}
                    {
                      this.state.templatename === "New Template" ?
                      <div>

                          <h4 style={{ color: "#133a62", fontWeight: 'bold' }}>
                            Name This Template
                        </h4>

                          <div style={{ width: '100%', display: 'inline-flex', justifyContent: 'space-evenly' }}>

                            <FormControl id="savetemplate" style={{ marginLeft: 0, width: '80%', height: 50, }}
                              type="text" placeholder="" onChange={(evt) => this.setState({ newtemplatename: evt.target.value })} />
                            <Button disabled={valid}  type="submit"
                              style={{ borderRadius: 0, background: "#3b75fa", color: 'white', width: "20%", marginLeft: 10 }}>
                              Save</Button>
                          </div>

                        </div>
                        :
                        <div>


                          <div style={{ width: '100%', display: 'inline-flex', justifyContent: 'space-evenly',paddingTop:10 }}>

                        
                            <Button disabled={valid2}  type="submit"
                              style={{ borderRadius: 0, background: "#3b75fa", color: 'white', width: "20%", marginLeft: 10 }}>
                              Save</Button>
                          </div>

                        </div>
                        
                      }



                  </div>

                </div>
                <div style={{ width: '60%', display: 'inline-flex', justifyContent: 'space-evenly', paddingTop: '12%', paddingLeft: '4%', height: 540 }}>

                  <div style={{ width: "20%", background: '#f3e2d8' }}>
                    <h6 style={{ textAlign: 'center', }}>What went well</h6>
                  </div>

                  <div style={{ width: "20%", background: '#f3e2d8' }}>
                    <h6 style={{ textAlign: 'center' }}>What did we learn</h6>
                  </div>

                  <div style={{ width: "20%", background: '#f3e2d8' }}>
                    <h6 style={{ textAlign: 'center' }}>What can we improve</h6>
                  </div>

                  <div style={{ width: "20%", background: '#f3e2d8' }}>
                    <h6 style={{ textAlign: 'center' }}>What Puzzles</h6>
                  </div>
                </div>
              </div>
                <div style={{ display: 'inline-flex', justifyContent: 'center', width: "100%" }}>
                <Button bsStyle="primary"  bsSize="lg" style={{ width: '12%', marginTop: '5%', background: '#7289a1' }}>
                  Next
                 </Button>

              </div>
              </form>
              )
            }
            </Mutation>
              
            </Tab>
         
           
          
            {/* <Tab eventKey={2} title="Invite team">
              <div className="createtap2Main">
              
              <div className="createtap2right">
              <h2 className="createtap2rh1">Invite Your Team</h2>
              <h3 className="createtap2rh3">Room Code</h3>
              <p>
              <input type="text" className="createtap2ri" />
                    <span className="createtap2top">
                      <span className="verticalline">|</span>
                      <span className="tip">Tip</span>
                    </span>
                    <span className="codecutomize">
                      Cutomize your room code!
                    </span>
                  </p>
                  <h3 className="createtap2rh3">Share Link</h3>
                  <p>
                    <input className="createtap2rinput" type="email" />
                    <input
                      className="createtap2button"
                      type="button"
                      value="Copy Link"
                    />
                  </p>
                  <div className="schedule">
                    <h3 className="createtap2rh3">Schedule Date & Time </h3>
                    <p className="clearp">Clear</p>
                  </div>
                  <h4 className="createtap2rh4">
                    Leave this blank if you are starting a retro immediately
                  </h4>
                  <p>
                    <div className="tap2dropdown">
                      <select className="tabselect">
                        <option className="tap2option" />
                        <option className="tap2option">9:00 AM</option>
                        <option className="tap2option">9:30 AM</option>
                        <option className="tap2option">10:00 AM</option>
                        <option className="tap2option">10:30 AM</option>
                      </select>
                      <span className="tap2to">to</span>
                      <select className="tabselect">
                        <option />
                        <option className="tap2option">9:00 AM</option>
                        <option className="tap2option">9:30 AM</option>
                        <option className="tap2option">10:00 AM</option>
                        <option className="tap2option">10:30 AM</option>
                      </select>
                      <input type="text" className="tap2date" />
                    </div>
                  </p>
                  {/ open after click /}
                  <div className="afterclickshow">
                    <p>
                      <input type="checkbox" />
                      <span className="tap2repeat">Repeat every</span>
                    </p>
                    <select className="tabselect">
                      <option />
                      <option className="tap2option">9:00 AM</option>
                      <option className="tap2option">9:30 AM</option>
                      <option className="tap2option">10:00 AM</option>
                      <option className="tap2option">10:30 AM</option>
                    </select>
                    on Monday
                  </div>
                  <div className="tab2endon">
                    <p className="tab2ends">Ends on</p>
                    <input type="text" className="tap2date" />
                  </div>
                </div>

               
                <div className="createtap2left">
                  <h3 className="createtap2h3">Send Invite</h3>
                  <p>
                    <input className="createtap2input" type="email" />
                    <input
                      className="createtap2button"
                      type="button"
                      value="Send Invite"
                    />
                  </p>

                  <div className="createtapwho">
                    <h3 className="createtap2h3">Who's Invited</h3>
                    <table className="tab2table">
                      <tr>
                        <td className="tab2tabletd">Email</td>
                        <td className="tab2tabletd">Admin</td>
                        <td />
                      </tr>
                      <tr>
                        <td className="tab2tabletd2">Bob@lawblog.com</td>
                        <td className="tab2tabletd2">
                          <span className="createtabAspan">A</span>
                        </td>
                        <td className="tab2tabletd2">
                          <Icon
                            icon={close}
                            size={20}
                            style={{ marginTop: 8, color: "#3369db" }}
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>

              <button className="creattap2btn">Done</button>  
            </Tab> */}
           <Tab onClick={(evt)=> this.changeimage(evt)} eventKey={2} title="Invite team" value="2" >
              <div className="createtap2Main">
                {/* {/ right side /} */}
                <div className="createtap2right">
                  <h2 className="createtap2rh1">Invite Your Team</h2>
                  <h3 className="createtap2rh3">Room Code</h3>
                  <p>
                    <input type="text" className="createtap2ri" placeholder="RHE3KHS" />
                    <span className="createtap2top">
                      <span className="verticalline">|</span>
                      <span className="tip">Tip</span>
                    </span>
                    <span className="codecutomize">
                      Cutomize your room code!
                    </span>
                  </p>
                  <h3 className="createtap2rh3">Share Link</h3>
                  <p>
                    <input className="createtap2rinput" type="email" placeholder="http://www.retroapp.com" />
                    <input
                      className="createtap2button"
                      type="button"
                      value="Copy Link"
                    />
                  </p>
                  <div className="schedule">
                    <h3 className="createtap2rh3">Schedule Date & Time </h3>
                    <p className="clearp">Clear</p>
                  </div>
                  <h4 className="createtap2rh4">
                    Leave this blank if you are starting a retro immediately
                  </h4>
                  <p>
                    <div className="tap2dropdown">
                      <select className="tabselect">
                        <option className="tap2option" />
                        <option className="tap2option">9:00 AM</option>
                        <option className="tap2option">9:30 AM</option>
                        <option className="tap2option">10:00 AM</option>
                        <option className="tap2option">10:30 AM</option>
                      </select>
                      <span className="tap2to">to</span>
                      <select className="tabselect">
                        <option />
                        <option className="tap2option">9:00 AM</option>
                        <option className="tap2option">9:30 AM</option>
                        <option className="tap2option">10:00 AM</option>
                        <option className="tap2option">10:30 AM</option>
                      </select>
                      <input type="text" className="tap2date" />
                    </div>
                  </p>
                  {/* {/ open after click /} */}
                  <div className="afterclickshow">
                    <p>
                      <input type="checkbox" />
                      <span className="tap2repeat">Repeat every</span>
                    </p>
                    <select className="tabselect">
                      <option />
                      <option className="tap2option">9:00 AM</option>
                      <option className="tap2option">9:30 AM</option>
                      <option className="tap2option">10:00 AM</option>
                      <option className="tap2option">10:30 AM</option>
                    </select>
                    on Monday
                  </div>
                  <div className="tab2endon">
                    <p className="tab2ends">Ends on</p>
                    <input type="text" className="tap2date" />
                  </div>
                </div>

                {/* {/ left side /} */}
                <div className="createtap2left">
                  <h3 className="createtap2h3">Send Invite</h3>
                  <p>
                    <input className="createtap2input" type="email" />
                    <input
                      className="createtap2button"
                      type="button"
                      value="Send Invite"
                    />
                  </p>

                  <div className="createtapwho">
                    <h3 className="createtap2h3">Who's Invited</h3>
                    <table className="tab2table">
                      <tr>
                        <td className="tab2tabletd">Email</td>
                        <td className="tab2tabletd">Admin</td>
                        <td />
                      </tr>
                      <tr>
                        <td className="tab2tabletd2">Bob@lawblog.com</td>
                        <td className="tab2tabletd2">
                          <span className="createtabAspan">A</span>
                        </td>
                        <td className="tab2tabletd2">
                          <Icon
                            icon={close}
                            size={20}
                            style={{ marginTop: 8, color: "#3369db" }}
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>

              <button className="creattap2btn">Done</button>
            </Tab>
          
          </Tabs>

        </div>
        <Modal
          show={this.state.show}
          onHide={() => this.handleHide()}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
              Enter Project Name
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormControl size={20} onChange={(evt) => this.setState({ nameofproject: evt.target.value })}
              style={{}} type="text" />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.handleHide()}>Done</Button>
          </Modal.Footer>
        </Modal>


        {/* <Modal
          show={this.state.show1}
          onHide={() => this.handleHide1()}
          container={this}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">
                Enter Template Name              
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <FormControl size={20} onChange={(evt) => this.setState({templatename: evt.target.value})} 
                            style={{}} type="text"  />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.handleHide()}>Done</Button>
          </Modal.Footer>
        </Modal> */}
      </div>
    );
  }
}

export default compose(
  graphql(submitcreateretro, { name: "createretro" })
)(Createretro)

// export default Createretro