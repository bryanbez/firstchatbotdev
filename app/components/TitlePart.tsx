function TitlePart() {
  return (
    <>
      <div className="h-[65%] relative ">
        <span className="font-bold centered-component-using-absolute text-3xl">
          New Chat
        </span>
      </div>
      <div className="h-[35%] relative border-b border-gray-400">
        <span className="font-semibold centered-component-using-absolute text-gray-500 text-sm">
          (X) message/s
        </span>
      </div>
    </>
  );
}

export default TitlePart;
