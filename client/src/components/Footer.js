import React from 'react';
import { CDBFooter, CDBFooterLink, CDBBtn, CDBIcon, CDBContainer, CDBBox } from 'cdbreact';

export const Footer = () => {
  return (
    <CDBFooter className="shadow">
      <CDBBox
        display="flex"
        justifyContent="between"
        alignItems="center"
        className="mx-auto py-4 flex-wrap"
        style={{ position: "fixed", right: "0", bottom: "0" }}
      >
        <CDBBox display="flex" alignItems="center">
          
            <img
              alt="logo"
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
              width="30px"
            />
            <span className="ml-2 mb-0 font-weight-bold">Powered by The Movie DB</span>
          
          <small className="ml-2">&copy; Austin Gilmore, 2022. All rights reserved.</small>
        </CDBBox>
        
      </CDBBox>
    </CDBFooter>
  );
};

export default Footer;