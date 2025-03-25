import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'
import image1 from "../assets/mimi.jpg"
import image2 from "../assets/wom.jpg"
import image3 from "../assets/fina.jpeg"
import image4 from "../assets/bm.jpg"
import image5 from "../assets/Budg.jpg"
import image6 from "../assets/comm.jpg"
import succ from "../assets/wo1.jpg"
import succ1 from "../assets/wo2.jpg"
import succ2 from "../assets/wo3.jpg"
import succ3 from "../assets/wo4.jpg"




function Home() {

  const featuresData = [
    {
        image: image3, // Replace with your image URL
        title: 'Financial Education',
        descriptionItems: [
            'Interactive modules on budgeting, saving, investing, and debt management',
            'Quizzes to reinforce learning',
        ],
    },
    {
        image: image4, // Replace with your image URL
        title: 'Business Management Tips & Resources',
        descriptionItems: [
            'Step-by-step startup guides',
            'Marketing strategies and legal/financial advice',
        ],
    },
    {
        image: image5, // Replace with your image URL
        title: 'Budgeting & Tracking Tools',
        descriptionItems: [
            'Create personalized budgets',
            'Track expenses and set financial goals',
        ],
    },
    {
        image: image6, // Replace with your image URL
        title: 'Mentorship & Community',
        descriptionItems: [
            'Connect with experienced women entrepreneurs',
            'Share experiences and build a supportive network',
        ],
    },
];
const successData = [
  {
      image: succ, // Replace with your image URL
      title: 'Sumaya ahiyo',
      descriptionItems: [
          'From always struggling to know what is the best for my business to growing my business to a new level, I have learned a lot from the community and the resources provided',
      ],
  },
  {
      image: succ1, // Replace with your image URL
      title: 'Mukasa muka',
      descriptionItems: [
          'Did not know how to start a business but with the help of the community and the resources provided, I have been able to start my business and grow it to a new level',
          
      ],
  },
  {
      image: succ2, // Replace with your image URL
      title: 'Chineke Diana',
      descriptionItems: [
          'I have always wanted to know how to manage my finances and with the help of the community and the resources provided, I have been able to manage my finances and grow my business to a new level',
         
      ],
  },
  {
      image: succ3, // Replace with your image URL
      title: 'Munyana Butera',
      descriptionItems: [
          'Ever since I joined the community, I have been able to grow my business to a new level and I have been able to manage my finances and grow my business to a new level',
          
      ],
  },
];
const FeatureCard = ({ image, title, descriptionItems }) => {
  return (
      <div className="feature-card">
          <div className="feature-image">
              <img src={image} alt={title} />
          </div>
          <h3>{title}</h3>
          <ul>
              {descriptionItems.map((item, index) => (
                  <li key={index}>{item}</li>
              ))}
          </ul>
      </div>
  );
};

  return (
    <div className='home'>
        <div className='upper'>
      <h3 className='pinky'>Empower Her Wealth: Smart Finance & Business for Women</h3>
      </div>
      <section className="hero">
      <div className="hero-text">
        <p>
          "Helping women build confidence, grow wealth, and lead with financial
          freedom. Access expert finance tips, business insights, and a
          supportive community designed for your success."
        </p>
        <div className="hero-buttons">
          <button className="start-learning"><Link to="/Join" style={{ textDecoration: 'none',color:"inherit"}}>Start learning</Link></button>
          <button className="join-community"><Link to="/Join" style={{ textDecoration: 'none' ,color:"inherit"}}>Join the community</Link></button>
        </div>
      </div>
      <div className="hero-image">
        <img
          src={image1} // Replace with the URL or import of your image
          alt="Women discussing finances"
        />
      </div>
    </section>
    <h1 className='hhh'>Success stories</h1>
    <h3 className='heads'>Inspiring Journey that leads to success</h3>
    <section className="features">

            <div className="feature-cards">
                {successData.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </div>
        </section>
    <h1 className='hhh'>ABOUT US</h1>
    <section className="section">
      <div className="section-text">
        <p>
          This platform is dedicated to empowering women through financial
          literacy and business education. Many women start their business
          ventures without the necessary knowledge, often leading to avoidable
          setbacks. By providing the right tools and resources, we aim to equip
          women with the confidence and expertise to succeed in the business
          world and take control of their financial futures.
        </p>
        
      </div>
      <div className="section-image">
        <img
          src={image2} // Replace with your image URL
          alt="Women holding hands"
        />
        <div className="section-footer">
          Join our community to access valuable insights and resources that will  help you thrive in your business journey.
        </div>
      </div>

      
    </section>
    <h1 className='hhh'>Key Features</h1>
    <section className="features">

            <div className="feature-cards">
                {featuresData.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                ))}
            </div>
        </section>
        <h2 className='hhhh'>Join hundreds of women on the path to financial freedom and business success.</h2>
        <button className='sign'><Link to='/Join' style={{textDecoration:"none", color:"inherit"}}>Join the Community</Link></button>
    </div>
  )
}

export default Home
