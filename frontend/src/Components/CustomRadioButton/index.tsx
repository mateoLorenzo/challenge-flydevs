import "./styles.css";

interface ICustomButtonProps {
   selected: string,
   onChange: Function,
   text: string,
   value: string
}

export const CustomRadioButton = ({ selected, onChange, text, value }: ICustomButtonProps) => {
   return (
      <div
         className="modern-radio-container"
         onClick={() => onChange(value)}
      >
         <div className={`radio-outer-circle ${value !== selected && "unselected"}`}>
            <div className={`radio-inner-circle ${value !== selected && "unselected-circle"}`} />
         </div>
         <div className="helper-text">{text}</div>
      </div>
   );
}