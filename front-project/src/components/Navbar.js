const navStyle = {
    backgroundColor: '#333',
    'overflow': 'hidden',
}

const linkStyle = {
    float: 'left',
    color: '#f2f2f2',
    textAlign: 'center',
    padding: '14px 16px',
    textDecoration: 'none',
    fontSize: '17px'
}

const Navbar = () => (
  <div style={navStyle}>
    <a href="http://localhost:3000/" style={linkStyle}>Home</a>
    <a href="http://localhost:3000/table" style={linkStyle}>Table</a>
    <a href="http://localhost:3000/weather_form" style={linkStyle}>Form</a>
  </div> 
)

export default Navbar;
