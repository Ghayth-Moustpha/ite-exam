const BottomNav = ({ correctAnswers, totalQuestions }) => {
    return (
      <div className="mt-2 px-1 flex justify-between items-center py-4 bg-gray-800 text-white rounded-lg shadow-md">
        <div className="text-sm font-semibold">
          Correct Answers: <span className="text-green-400">{correctAnswers}</span>
        </div>
        <div className="text-sm font-semibold">
          Total Questions: <span className="text-blue-400">{totalQuestions}</span>
        </div>
      </div>
    );
  };
  
  export default BottomNav;
  