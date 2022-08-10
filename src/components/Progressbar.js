import React from 'react'

const ProgressBar = (props) => {
    const { bgcolor, completed, name } = props;
  
    const containerStyles = {
      height: 20,
      width: '70%',
      backgroundColor: '#e0e0de',
      borderRadius: 50,
      margin: 20
    }
  
    const fillerStyles = {
      height: '100%',
      width: `${completed}%`,
      backgroundColor: bgcolor,
      borderRadius: 'inherit',
      textAlign: 'right'
    }
  
    const labelStyles = {
      padding: 5,
      color: 'white',
      fontWeight: 'bold'
    }

    const nameStyles = {
      color: '#D1E8E2',
      marginLeft: 5
    }
  
    return (
      <div>
      <p style={nameStyles}>{name}</p>
      <div style={containerStyles}>
        <div style={fillerStyles}>
          <span style={labelStyles}>{`${completed}%`}</span>
        </div>
      </div>
      </div>
    );
  };
  
  export default ProgressBar;
  