import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/Modal.css";

const UserProfile: React.FC = () => {
  const [profileError, setProfileError] = useState("");
  const dispatch = useDispatch();

  const { data, errors } = useSelector((state: any) => state.users.user);

  const displayErrorMessage = (message: string) => {
    setProfileError(message);
    setTimeout(() => {
      setProfileError("");
    }, 3000);
  };

  useEffect(() => {
    dispatch({ type: "GET_USER_BY_ID" });
  }, [dispatch]);

  useEffect(() => {
    displayErrorMessage(errors);
  }, [errors]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <>
      <div className="profile">
        <div className="client-left-side">
          {data &&
            data.clients.map((client: any) => {
              return (
                <div className="client" key={client.id}>
                  <h1>Profile Details</h1>
                  <div className="client-details">
                    <label>Full Name:</label>
                    <div className="client-name">{client.fullName}</div>
                  </div>
                  <div className="client-avatar">
                    <label className="avatar-label">Avatar:</label>
                    <img
                      src={client.avatar}
                      alt="avatar"
                      width="150"
                      height="150"
                      className="img"
                    />
                  </div>
                </div>
              );
            })}
        </div>
        <div className="image-slider">
          {data && data.photos.length > 0 && (
            <Slider {...settings}>
              {data.photos.map((photo: any, index: number) => {
                return (
                  <>
                  <h1>Profile Photos</h1>
                  <div key={photo.id} className="single-photo">
                    <img
                      src={photo.url}
                      alt="avatar"
                      width="400"
                      height="400"
                    />
                  </div>
                  </>
                  
                );
              })}
            </Slider>
          )}
        </div>
      </div>
      {errors && <p className="error">{profileError}</p>}
    </>
  );
};

export default UserProfile;
