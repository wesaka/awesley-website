import React, {Component} from 'react';
import { ReactComponent as BrazilFlag } from '../../assets/brazil.svg'
import {getTelegramChatId, getTelegramKey} from "../../firebase/firebase.utils";

class ContactComponent extends Component {
    constructor() {
        super();
        this.state = {
            showingContactForm: true,
            showingImageLoader: false,
            showingMessageWarning: false,
            showingMessageSuccess: false,
            alertName: false,
            alertEmail: false,
            alertMessage: false
        };

        console.log(this.state);
    }

    render() {
        const validateEmail = (email) => {
            // eslint-disable-next-line no-control-regex
            const re = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
            return re.test(String(email).toLowerCase());
        };

        const sendMessage = async () => {
            this.setState({
                alertName: !this.contactName.value,
                alertEmail: !this.contactEmail.value,
                alertMessage: !this.contactMessage.value});

            this.setState({
                alertEmail: !validateEmail(this.contactEmail.value)
            });

            if (!this.contactName.value || !this.contactEmail.value || !this.contactMessage.value || !validateEmail(this.contactEmail.value))
                return;



            this.setState({showingImageLoader: true});

            const { TelegramClient } = require('messaging-api-telegram');
            const client = TelegramClient.connect(await getTelegramKey());
            const sentMessage = await client.sendMessage( await getTelegramChatId(), `Name: ${this.contactName.value}\nEmail: ${this.contactEmail.value}\nSubject: ${this.contactSubject.value}\nMessage: ${this.contactMessage.value}`);

            if (sentMessage) {
                this.setState({
                    showingImageLoader: false,
                    showingMessageWarning: false,
                    showingContactForm: false,
                    showingMessageSuccess: true});
            } else {
                this.setState({
                    showingImageLoader: false,
                    showingMessageWarning: true,
                    showingContactForm: false,
                    showingMessageSuccess: false})
            }
        };

        let name, city, state, country, phone, email, contactmessage;
        if (this.props.data) {
            ({name, city, state, country, phone, email, contactmessage} = this.props.data);
        }

        return (
            <section id="contact">
                <div className="row section-head">
                    <div className="two columns header-col">
                        <h1><span>Get In Touch.</span></h1>
                    </div>
                    <div className="ten columns">
                        <p className="lead">{contactmessage}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="eight columns">
                        <div id="contactForm" className={this.state.showingContactForm ? 'shown' : 'hidden'}>
                            <fieldset>
                                <div>
                                    <label htmlFor="contactName">Name <span className="required">*</span></label>
                                    <input type="text" defaultValue="" size="35" id="contactName" name="contactName"
                                           onChange={this.handleChange} ref={(input) => this.contactName = input}
                                           className={this.state.alertName ? 'showAlert' : 'hideAlert'}/>
                                </div>

                                <div>
                                    <label htmlFor="contactEmail">Email <span className="required">*</span></label>
                                    <input type="email" defaultValue="" size="35" id="contactEmail" name="contactEmail"
                                           onChange={this.handleChange} ref={(input) => this.contactEmail = input}
                                           className={this.state.alertEmail ? 'showAlert' : 'hideAlert'}/>
                                </div>

                                <div>
                                    <label htmlFor="contactSubject">Subject</label>
                                    <input className='hideAlert' type="text" defaultValue="" size="35" id="contactSubject"
                                           name="contactSubject" onChange={this.handleChange} ref={(input) => this.contactSubject = input}/>
                                </div>

                                <div>
                                    <label htmlFor="contactMessage">Message <span className="required">*</span></label>
                                    <textarea cols="50" rows="15" id="contactMessage" name="contactMessage" ref={(input) => this.contactMessage = input}
                                              className={this.state.alertMessage ? 'showAlert' : 'hideAlert'}/>
                                </div>

                                <div>
                                    <button className="submit" onClick={sendMessage}>Submit</button>
                                    <span id="image-loader" className={this.state.showingImageLoader ? 'shown' : 'hidden'} >
                        <img alt="" src="images/loader.gif"/>
                     </span>
                                </div>
                            </fieldset>
                        </div>

                        <div id="message-warning" className={this.state.showingMessageWarning ? 'shown' : 'hidden'}> Error boy</div>
                        <div id="message-success" className={this.state.showingMessageSuccess ? 'shown' : 'hidden'}>
                            <i className="fa fa-check"></i>Your message was sent, thank you!<br/>
                        </div>
                    </div>


                    <aside className="four columns footer-widgets">
                        <div className="widget widget_contact">

                            <h4>Address and Phone</h4>
                            <p className="address">
                                {name}<br/>
                                {city}, {state}, <br/>
                                {country}<span><BrazilFlag className='flag'/></span><br/>
                                {email}<br/>
                                <span>{phone}</span>
                            </p>
                        </div>

                        {/* TODO add a twitter feed*/}
                        {/*<div className="widget widget_tweets">*/}
                        {/*    <h4 className="widget-title">Latest Tweets</h4>*/}
                        {/*    <ul id="twitter">*/}
                        {/*        <li>*/}
                        {/*<span>*/}
                        {/*This is Photoshop's version  of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.*/}
                        {/*Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum*/}
                        {/*<a href="#">http://t.co/CGIrdxIlI3</a>*/}
                        {/*</span>*/}
                        {/*            <b><a href="#">2 Days Ago</a></b>*/}
                        {/*        </li>*/}
                        {/*        <li>*/}
                        {/*<span>*/}
                        {/*Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,*/}
                        {/*eaque ipsa quae ab illo inventore veritatis et quasi*/}
                        {/*<a href="#">http://t.co/CGIrdxIlI3</a>*/}
                        {/*</span>*/}
                        {/*            <b><a href="#">3 Days Ago</a></b>*/}
                        {/*        </li>*/}
                        {/*    </ul>*/}
                        {/*</div>*/}

                    </aside>
                </div>
            </section>
        );
    }
}

export default ContactComponent;
