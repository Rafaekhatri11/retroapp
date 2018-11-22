import React, { Component } from 'react';
import {
    Navbar, Nav, NavItem,
    Button, MenuItem, NavDropdown, FormControl, Tabs, Tab,
    Table, Modal, Form, FormGroup, ControlLabel,
} from 'react-bootstrap';


class Myretro extends Component {
    render() {
        return (

            <div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: "80%", background: 'green' }}>

                        <h1 style={{ color: "#133a62", textAlign: 'center', background: 'red' }}>
                            My Retros
                    </h1>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <div style={{ display: 'flex', justifyContent: 'center', width: '80%', alignSelf: 'center' }}>
                        <div style={{ width: '25%' }}>
                            <h1 style={{ color: '#6cd451', textAlign: 'center' }}>
                                300
                                </h1>
                            <h5 style={{ color: "#1b2937", fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                                Retros Created
                                </h5>
                        </div>
                        <div style={{ width: '25%' }}>
                            <h1 style={{ color: '#6cd451', textAlign: 'center' }}>
                                263
                                </h1>
                            <h5 style={{ color: "#1b2937", fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                                Compelte Retros
                                </h5>
                        </div>

                        <div style={{ width: '25%' }}>
                            <h1 style={{ color: '#6cd451', textAlign: 'center' }}>
                                37
                                </h1>
                            <h5 style={{ color: "#1b2937", fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                                Scheduled Retros
                                </h5>
                        </div>
                        <div style={{ width: '25%' }}>
                            <h1 style={{ color: '#6cd451', textAlign: 'center' }}>
                                19
                                </h1>
                            <h5 style={{ color: "#1b2937", fontWeight: 'bold', fontSize: 16, textAlign: 'center' }}>
                                Avg. Retros per Week
                                </h5>
                        </div>
                    </div>
                </div>


                    <div>
                        <h6 style={{ textAlign: 'center' }}>UPCOMING</h6>

                    </div>
                <div style={{ width: '100%', display: 'inline-flex', justifyContent: "center" }}>
                    <div style={{ width: '80%', justifyContent: 'center' }}>

                        <Table style={{ width: '100%', justifyContent: 'center' }} responsive>
                            <thead>
                                <tr>
                                    <th>Date & Time</th>
                                    <th>Retro Admin</th>
                                    <th>Project Name</th>
                                    <th>Sprint </th>
                                    <th>Action </th>

                                </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                                <td>Table cell</td>
                            </tr>
                           
                            </tbody>
                        </Table>
                    </div>
                    </div>
                </div>
                );
            }
        }
        
export default Myretro;