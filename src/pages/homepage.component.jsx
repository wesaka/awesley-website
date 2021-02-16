import React, {Component} from "react";
import ReactGA from "react-ga";
import $ from "jquery";
import HeaderComponent from "../Components/header/header.component";
import AboutComponent from "../Components/about/about.component";
import ResumeComponent from "../Components/resume/resume.component";
import PortfolioComponent from "../Components/portfolio/portfolio.component";
import TestimonialsComponent from "../Components/testimonials/testimonials.component";
import ContactComponent from "../Components/contact/contact.component";
import FooterComponent from "../Components/footer/footer.component";

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            foo: 'bar',
            resumeData: {}
        };

        ReactGA.initialize('UA-110570651-1');
        ReactGA.pageview(window.location.pathname);

    }

    getResumeData() {
        $.ajax({
            url: '/resumeData.json',
            dataType: 'json',
            cache: false,
            success: (data) => {
                this.setState({resumeData: data});
            },
            error: (xhr, status, err) => {
                console.log(err);
                alert(err);
            }
        });
    }

    componentDidMount() {
        this.getResumeData();
    }

    render() {
        return (
            <div className="App">
                <HeaderComponent data={this.state.resumeData.main}/>
                <AboutComponent data={this.state.resumeData.main}/>
                <ResumeComponent data={this.state.resumeData.resume}/>
                <PortfolioComponent data={this.state.resumeData.portfolio}/>
                <TestimonialsComponent data={this.state.resumeData.testimonials}/>
                <ContactComponent data={this.state.resumeData.main}/>
                <FooterComponent data={this.state.resumeData.main}/>
            </div>
        );
    }
}

export default HomePage;