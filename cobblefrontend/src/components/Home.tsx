import React from "react";
import LogoImage from "../assets/logo.png";

const Home = () => {
  return (
    <div className="home">
      <div className="">
        <div className="top-home">
          <div>
            <img src={LogoImage} alt="Example" className="log" />
          </div>
          <div>
            <h1 className="text-header">Why cobbleweb</h1>
            <p className="text-body">
              Our proven technical expertise, data-driven development process
              and deep user journey insights deliver high-performance, scalable
              marketplaces that will delight your customers and grow your
              business
            </p>
          </div>
        </div>
        <div className="top-home">
          <div className="image-tab">
            <h1>Our marketplace development services</h1>
            <div className="service">
              <div>
                <h1>Web development</h1>
                <p>
                  We use the latest technology and powerful features to build
                  digital platforms that are geared for rapid growth.
                </p>
              </div>
              <div>
                <h1>UI/UX design</h1>
                <p>
                  We employ in-depth user research and heuristic testing to
                  design intuitive experiences that captivate your marketplace
                  audience
                </p>
              </div>
            </div>
          </div>
          <div className="text">
            <p>
              Why custom marketplace development? Generic templates, offered by
              online marketplace builders, may not support your business goals
              or meet your users' needs, which can sink your marketplace. Here
              are four good reasons for a custom solution: Better user
              customisation Custom marketplace software allows you to create
              functionalities, features and user flows that best serve your
              users. Identify business opportunities A custom development
              process makes it easier to identify growth opportunities based on
              user behaviour.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
