import React from 'react'

/**
 * Component to represent i progressbar.
 *
 * @param {*} props -incomming props
 * @returns {HTMLElement} - The progressbar
 */
const ProgressBar = (props) => {
  const { bgcolor, completed, name } = props

  const progressContainerStyles = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    marginBottom: 5

  }
  const containerStyles = {
    height: 10,
    width: '50%',
    backgroundColor: '#e0e0de',
    borderRadius: 5,
    marginLeft: 10
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  const labelStyles = {
    paddingLeft: 5,
    color: '#D1E8E2',
    fontFamily:"Alice",
   
  }

  const nameStyles = {
    color: '#D1E8E2',
    width:'20%',
    fontFamily:"Alice",
  }

  return (
    <div style={progressContainerStyles}>
      <span style={nameStyles}>{name}</span>
      <div style={containerStyles}>
        <div style={fillerStyles}>
        </div>
      </div>
      <span style={labelStyles}>{`${completed}%`}</span>
    </div>
  )
}

export default ProgressBar
