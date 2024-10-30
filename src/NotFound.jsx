import React from 'react';
import "./Styles/Notfound.css";
const NotFound = () => {
  return (
    <div className="not-found">
    <h1 className="not-found__title">404</h1>
    <p className="not-found__message">Oops! The page you're looking for could not be found.</p>
    <div className="not-found__advertising">
      <p className="not-found__ad-text">Looking for a skilled Software engineer?</p>
      <p className="not-found__ad-contact">Contact Engineer Ghayth Moustapha at <a href="mailto:ghayth.moustpha@gmail.com">ghayth.moustpha@gmail.com</a></p>
      <div>
        <h1> Find me  on </h1>

</div>
<div class="social-links">
  <a href="https://www.facebook.com/Ghayth.Moustpha">Facebook</a>
  <a href="https://github.com/Ghayth-Moustpha/">GitHub</a>
  <a href="https://www.linkedin.com/in/ghayth-moustpha-51432a133/">LinkedIn</a>
</div>
    </div>
  </div>
  );
};

export default NotFound;