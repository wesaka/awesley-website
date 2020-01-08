import React, {Component} from 'react';

class FooterComponent extends Component {
    render() {

        let networks = null;
        if (this.props.data) {
            networks = this.props.data.social.map((network) => {
                return <li key={network.name}><a href={network.url}><i className={network.className}></i></a></li>
            })
        }

        return (
            <footer>
                <div className="row">
                    <div className="twelve columns">
                        <ul className="social-links">
                            {networks}
                        </ul>

                        <ul className="copyright">
                            <li>&copy; 2019 Alvacir Wesley Kalatai Alberti</li>
                        </ul>

                    </div>
                    <div id="go-top">
                        <a className="smoothscroll" title="Back to Top" href="#home">
                            <i className='icon-up-open' />
                        </a>
                    </div>
                </div>
            </footer>
        );
    }
}

export default FooterComponent;
