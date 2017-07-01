import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

export const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input className="form-control" {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

export const renderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
  <div>
    <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? input.value : null} />
    {touched && error && <span>{error}</span>}
  </div>
);
