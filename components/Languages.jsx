const Languages = (props) => {
  return (
    <span className={`rounded-[3px]  p-[4.5px]  ${props.color}`}>
      {props.lang}
    </span>
  );
};

export default Languages;
