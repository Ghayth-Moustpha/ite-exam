const BottomNav = ({ correctAnswers, totalQuestions }) => {
    return (
      <div className="flex justify-between items-center p-4 bg-gray-800 text-white rounded-lg shadow-md">
        <div className="text-lg font-semibold">
          Correct Answers: <span className="text-green-400">{correctAnswers}</span>
        </div>
        <div className="text-lg font-semibold">
          Total Questions: <span className="text-blue-400">{totalQuestions}</span>
        </div>
      </div>
    );
  };
  
  export default BottomNav;
  