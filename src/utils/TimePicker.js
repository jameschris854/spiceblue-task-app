import React from 'react';

var TimePicker = ({...props}) => {

console.log({...props});

		var options = [];
    for(let i=0 ;i<24;i++ ) {
	
    
    
    let timeValue1 = `${i>12?i%12:i===0?'12':i}:00${i>11?'pm':'am'}`

    let timeValue2 = `${i>12?i%12:i===0?'12':i}:30${i>11?'pm':'am'}`
    

      options.push(<option key={timeValue1} value={timeValue1}>{timeValue1}</option>)
      options.push(<option key={timeValue2} value={timeValue2}>{timeValue2}</option>)

	}
    return(
      <select {...props}>
        {options}
      </select>
    )
};

export default TimePicker;