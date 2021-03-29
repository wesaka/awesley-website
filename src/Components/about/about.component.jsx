import React, {Component} from 'react';
import { ReactComponent as BrazilFlag } from '../../assets/brazil.svg';
import { downloadFile } from "../../download-helper/download-helper";

class AboutComponent extends Component {
    render() {

        let name, bio, city, state, country, phone, email, resumedownload;
        if (this.props.data) {
            ({name, bio, city, state, country, phone, email, resumedownload} = this.props.data);
        }

        return (
            <section id="about">
                <div className="row">
                    <div className="three columns">
                        <img className="profile-pic" src="/images/profilepic.jpg" alt="Alvacir Wesley Profile Pic"/>
                    </div>
                    <div className="nine columns main-col">
                        <h2>About Me</h2>

                        <p>{bio}</p>
                        <div className="row">
                            <div className="columns contact-details">
                                <h2>Contact Details</h2>
                                <p className="address">
                                    <span>{name}</span><br/>
                                    <span>{city}, {state}, {country} <span><BrazilFlag className='flag'/></span>
                   </span><br/>
                                    <span>{phone}</span><br/>
                                    <span>{email}</span>
                                </p>
                            </div>
                            <div className="columns download">
                                <p>
                                    <div onClick={() => downloadFile(`${process.env.PUBLIC_URL}/${resumedownload}`)} className="button"><i className="fa fa-download"></i>Download
                                        Resume</div>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        );
    }
}

export default AboutComponent;
