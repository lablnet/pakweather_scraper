import "selectize";
import $ from 'jquery';
import 'selectize/dist/css/selectize.css';
import React, {useEffect, useRef} from 'react';


function Select(props) {
    const selectInput = useRef(null);
  
    useEffect(() => {
      const {current: selectInputRef} = selectInput;
      const $select = $(selectInputRef);
  
      $select.selectize({
        create: false,
  sortField: "text",
  highlight: true,
  hideSelected: true,
  closeAfterSelect: true,
  placeholder: 'Select City',

      });
      $select.on('change', props.onChange);
    }, [selectInput, props.onChange]);
  
    return (
      <select ref={selectInput} value={props.value} className={props.className} placeholder='Search City'>
        {props.children}
      </select>
    );
  }
  
  export default Select;
  