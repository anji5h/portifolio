import React, { Component } from "react";
import emailjs from "emailjs-com";
emailjs.init("user_nwhkK2DpoHVkf19VCZ61f");
const formData = {
  name: "",
  email: "",
  subject: "Hi",
  message: "",
};
class Contact extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        ...formData,
      },
      error: false,
      success: false,
      isloading: false,
    };
  }
  handleChange = (e) => {
    let { name, value } = e.target;
    this.setState((prev) => ({ ...prev, data: { ...prev.data, [name]: value } }));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isloading: true });
    emailjs
      .send("service_l7gs339", "template_ew7xocg", this.state.data)
      .then(() => {
        this.setState({ data: { ...formData }, success: true, error: false, isloading: false });
        setTimeout(() => this.setState({ data: { ...formData }, success: false }), 4000);
      })
      .catch(() => {
        this.setState((prev) => ({
          data: { ...prev.data },
          success: false,
          error: true,
          isloading: false,
        }));
        setTimeout(
          () =>
            this.setState((prev) => ({
              data: { ...prev.data },
              error: false,
            })),
          4000
        );
      });
  };
  render() {
    if (this.props.data) {
      var name = this.props.data.name;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone = this.props.data.phone;
      var email = this.props.data.email;
      var message = this.props.data.contactmessage;
    }

    return (
      <section id="contact">
        <div className="row section-head">
          <div className="two columns header-col">
            <h1>
              <span>Get In Touch.</span>
            </h1>
          </div>

          <div className="ten columns">
            <p className="lead">{message}</p>
          </div>
        </div>

        <div className="row">
          <div className="eight columns">
            <form id="contactForm" name="contactForm" onSubmit={this.handleSubmit}>
              <fieldset>
                <div>
                  <label htmlFor="contactName">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    value={this.state.data.name}
                    required={true}
                    size="35"
                    id="contactName"
                    name="name"
                    onChange={this.handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    required={true}
                    value={this.state.data.email}
                    size="35"
                    id="contactEmail"
                    name="email"
                    onChange={this.handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="contactSubject">Subject</label>
                  <input
                    type="text"
                    value={this.state.data.subject}
                    size="35"
                    id="contactSubject"
                    name="subject"
                    onChange={this.handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="contactMessage">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    cols="50"
                    rows="12"
                    required={true}
                    id="contactMessage"
                    name="message"
                    value={this.state.data.message}
                    onChange={this.handleChange}
                  ></textarea>
                </div>

                <div>
                  <button
                    className="submit"
                    type="submit"
                    onSubmit={this.handleSubmit}
                    disabled={this.state.isloading}
                  >
                    Submit
                  </button>
                </div>
              </fieldset>
            </form>
            {this.state.error ? (
              <div id="message-warning">There was error while sending mail. Please try again.</div>
            ) : null}
            {this.state.success ? (
              <div id="message-success">
                <i className="fa fa-check"></i>Your message was sent, thank you!
                <br />
              </div>
            ) : null}
          </div>

          <aside className="four columns footer-widgets">
            <div className="widget widget_contact">
              <h4>Address and Phone</h4>
              <p className="address">
                {name}
                <br />
                {city}, {state} {zip}
                <br />
                <span>{phone}</span>
                <br />
                {email}
              </p>
            </div>
          </aside>
        </div>
      </section>
    );
  }
}

export default Contact;
