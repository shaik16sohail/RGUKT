import React from 'react'
// import '../../App.css';
import { useState } from 'react';
export default function Section(){
    const [expandedIndex, setExpandedIndex] = useState(null);

    const toggleSection = (index) => {
      setExpandedIndex(expandedIndex === index ? null : index); // Toggle the clicked section
    };
  
    const sections = [
        {
          title: "Men's Hostel",
          details: [
            {
              role: "Director, Men's Hostel",
              name: "Dr. Mohanasundaram R",
              email: "director.mh@vit.ac.in",
              phone: "0416 – 220 2520",
            },
            {
              role: "Chief Warden, Men's Hostel",
              name: "Dr. Sathiavelu A",
              email: "cw.mh@vit.ac.in",
              phone: "0416 – 220 2521",
            },
          ],
        },
        {
            title: "Men's Hostel",
            details: [
              {
                role: "Director, Men's Hostel",
                name: "Dr. Mohanasundaram R",
                email: "director.mh@vit.ac.in",
                phone: "0416 – 220 2520",
              },
              {
                role: "Chief Warden, Men's Hostel",
                name: "Dr. Sathiavelu A",
                email: "cw.mh@vit.ac.in",
                phone: "0416 – 220 2521",
              },
            ],
          },
          {
            title: "Men's Hostel",
            details: [
              {
                role: "Director, Men's Hostel",
                name: "Dr. Mohanasundaram R",
                email: "director.mh@vit.ac.in",
                phone: "0416 – 220 2520",
              },
              {
                role: "Chief Warden, Men's Hostel",
                name: "Dr. Sathiavelu A",
                email: "cw.mh@vit.ac.in",
                phone: "0416 – 220 2521",
              },
            ],
          },
        {
          title: "Ladies Hostel",
          details: [
            {
              role: "Director, Ladies Hostel",
              name: "Dr. Anitha R",
              email: "director.lh@vit.ac.in",
              phone: "0416 – 220 2530",
            },
            {
              role: "Chief Warden, Ladies Hostel",
              name: "Dr. Sunitha K",
              email: "cw.lh@vit.ac.in",
              phone: "0416 – 220 2531",
            },
          ],
        },
      ];
    
    
    return (
        <div className='section'>
            {sections.map((section, index) => (
        // <div className="section-sub" key={index} onClick={() => toggleSection(index)}>
        //   {/* <div className="section-header" > */}
        //     <i className="plus fa-solid fa-plus"></i>
        //     <p>{section}</p>
        //   {/* </div> */}
        //   {expandedIndex === index && (
        //     <div className="section-content">
        //       <p>Details for {section} go here...</p>
        //     </div>
        //   )}
        // </div>
        <React.Fragment key={index}>
        {/* Section Header */}
        <div className="section-sub" onClick={() => toggleSection(index)}>
        <i
              className={`plus fa-solid ${
                expandedIndex === index ? "fa-minus" : "fa-plus"
              }`}
            ></i>
          <p>{section.title}</p>
        </div>
  
        {/* Expanded Content Below the Section-Sub */}
        {expandedIndex === index && (
            <div className="section-content">
                <table>
                    <tbody>
              {section.details.map((detail, idx) => (
                <tr>
                    <td>{detail.role}</td>
                    <td>
                    <strong>{detail.name}</strong>
                     <br />
                    Email-id: <a href={`mailto:${detail.email}`}>{detail.email}</a>
                     <br />
                     Phone No: {detail.phone}

                        
                    </td>
                </tr>
                // <div className="content-row" key={idx}>
                //   <div className="role">{detail.role}</div>
                //   <div className="info">
                //     <strong>{detail.name}</strong>
                //     <br />
                //     Email-id: <a href={`mailto:${detail.email}`}>{detail.email}</a>
                //     <br />
                //     Phone No: {detail.phone}
                //   </div>
                // </div>
              ))}
              </tbody>
              </table>
            </div>
          )}
      </React.Fragment>
      ))}
          
            {/* <div className='section-sub'> */}
            {/* <i class="plus fa-solid fa-plus"></i> */}
                {/* <h1>hello</h1> */}
                {/* <p>some thign here and there</p>
            </div>
            <div className='section-sub'>
            <i class="plus fa-solid fa-plus"></i>
            <p>some thign here and there</p>
            </div>
            <div className='section-sub'>
            <i class="plus fa-solid fa-plus"></i>
            <p>some thign here and there</p>
            </div>
            <div className='section-sub'>
            <i class="plus fa-solid fa-plus"></i>
            <p>some thign here and there</p>
            </div> */}
        </div>

    );
}