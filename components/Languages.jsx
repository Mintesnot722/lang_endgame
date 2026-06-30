const Languages = (props) => {
  return (
    <div className="text-black ">
      <p
        className={`text-nowrap w-auto rounded text-center h-6.25 gap-[4.5px]  ${props.color}`}
      >
        {props.lang}
      </p>
    </div>
  );
};

export default Languages;
