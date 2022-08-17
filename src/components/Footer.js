import React from "react";
import { MDBContainer, MDBRow, MDBFooter } from 'mdb-react-ui-kit';


export default function Footer() {
    return (
        <MDBFooter style={{ 
          backgroundColor: 'green',
          color: 'white',
          fontWeight: '500',
          fontFamily: 'Bitter',
          textAlign: 'center',
          marginTop: '60px' }}>
          <MDBContainer className='pt-4 pr-4 pl-4 pb-0'>
            <section className=''>
              <MDBRow lg='3' md='6' className='mb-4 mb-md-0'>
                  <h5 className='text-center'>Contact Us</h5>
    
                  <ul className='text-center list-unstyled mb-0'>
                    <li>
                      <p>lacaycindy@gmail.com</p>
                    </li>
                    <li>
                      <p>+63 912345678</p>
                    </li>
                  </ul>
              </MDBRow>
            </section>
          </MDBContainer>
    
          <div className='text-center p-3' style={{ backgroundColor: 'yellowgreen' }}>
            &copy; {new Date().getFullYear()} made by Cindy Lacay | for LayBare tech exam purposes only
          </div>
        </MDBFooter>
    );
}