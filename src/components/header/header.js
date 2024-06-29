import React from 'react'
import PropTypes from 'prop-types'


function generateRandomColor() {
    var r = Math.floor(Math.random() * 156) + 100; // Random between 100-255 (higher values for lighter colors)
    var g = Math.floor(Math.random() * 156) + 100; // Random between 100-255 (higher values for lighter colors)
    var b = Math.floor(Math.random() * 156) + 100; // Random between 100-255 (higher values for lighter colors)
    
    var color = `rgb(${r},${g},${b})`;
    
    return color;
}

// const activeUsers=['rohan1', 'smi2t', 'bha3vik','r4ohan', '5smit', '6bhavik','7rohan', '8smit', '9bhavik','10rohan', '11smit', '12bhavik']
const Header = ({ activeUsers, userName}) => {

    const visibleActiveUsers= activeUsers.length>8;



    const handleLogout=()=>{
        window.sessionStorage.clear()
        window.location.reload()
    }

  return (
    <div className='header-root'>
        
        <div className='active-user-list'>
            {activeUsers.slice(0,7).map(item=>{
                return <div className='active-user' title={item} style={{
                    backgroundColor:generateRandomColor()
                }}>
                    {item.charAt(0)}
                </div>
            })

        }

        {visibleActiveUsers && <div title={
            activeUsers.slice(7,activeUsers.length).map(item=>item)
        } className='active-user'>+{activeUsers.length-7}</div>}
        </div>

        <div className='user-name'>
           {userName}
        </div>

        <button className='logout-root' onClick={handleLogout}>
            logout
        </button>
    </div>
  )
}

Header.propTypes = {}

export default Header