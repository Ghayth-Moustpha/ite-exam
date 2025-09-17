import React, { useState, useEffect } from "react";
import correctSound from "./sounds/correct.m4a";
import WrongAnswerSound from "./sounds/wrong.m4a";
import { Rings } from "react-loader-spinner";
import BottomNav from "./BottomNav";
import CountdownTimer from "./Timer";

function QuestionViewer() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // Step 1: Mute state

  const addBiDiMarkers = (text) => {
    // Adding line breaks and LTR markers
    return text
      .replace(/([A-Za-z0-9_.,()]+)/g, "&lrm;$1&lrm;")
      .replace(/([\u0600-\u06FF]+)/g, "&rlm;$1&rlm; ")
      .replace(/(&lrm;.*?&rlm;|&rlm;.*?&lrm;)/g, "$&<br />")
      .replace(/\n/g, "<br />"); // New line conversion
  };

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions"));
    if (storedQuestions) {
      setQuestions(storedQuestions);
      setTotalQuestions(storedQuestions.length);
    } else {
      fetch("https://nte.eliejah.com/questions.php")
        .then((response) => response.json())
        .then((data) => {
          const filteredQuestions = data.filter(
            (question) => ![12, 46, 48].includes(question.section)
          );
          const shuffledQuestions = shuffleArray(filteredQuestions);
          setQuestions(shuffledQuestions);
          setTotalQuestions(shuffledQuestions.length);
          localStorage.setItem("questions", JSON.stringify(shuffledQuestions));
        })
        .catch((error) => console.error("Error fetching questions:", error));
    }
  }, []);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    const storedStats = JSON.parse(localStorage.getItem("quizStats"));
    if (storedStats) {
      setCorrectAnswers(storedStats.correctAnswers);
      setTotalQuestions(storedStats.totalQuestions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "quizStats",
      JSON.stringify({ correctAnswers, totalQuestions })
    );
  }, [correctAnswers, totalQuestions]);

  if (!questions.length)
    return (
      <div className="flex justify-center">
        <Rings
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="rings-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );

  const currentQuestion = questions[currentIndex];
  const imageUrlPrefix = "https://nte.eliejah.com";
  const imageUrl =
    currentQuestion.supplement &&
    currentQuestion.supplement.trim() !== "no file"
      ? `${imageUrlPrefix}${currentQuestion.supplement.replace("../", "/")}`
      : "";

  const handleOptionClick = (option, optionIndex) => {
    setSelectedOption(option);
    setShowAnswer(true);

    if (String.fromCharCode(97 + optionIndex) === currentQuestion.currect) {
      setFeedbackMessage("Correct!");
      if (!isMuted) { // Step 3: Check mute status before playing sound
        const audio = new Audio(correctSound);
        audio.play();
      }
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setFeedbackMessage("Wrong, try again.");
      if (!isMuted) { // Step 3: Check mute status before playing sound
        const audio = new Audio(WrongAnswerSound);
        audio.play();
      }
    }
  };

  const handleNext = () => {
    setShowAnswer(false);
    setFeedbackMessage("");
    setSelectedOption(null);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const isArabic = (text) => /[\u0600-\u06FF]/.test(text);
  const questionText = addBiDiMarkers(currentQuestion.Title);

  const toggleMute = () => { // Step 2: Toggle mute function
    setIsMuted((prev) => !prev);
  };

  return (
    <>
      <div className="w-full ">
        <CountdownTimer />
        <button onClick={toggleMute} className="mute-button">
          {isMuted ? "Unmute" : "Mute"} {/* Mute Button */}
        </button>
      </div>
      <div
        className={`w-full  ${isArabic(currentQuestion.Title) ? "text-right" : "text-left"
          }`}
        dir={isArabic(currentQuestion.Title) ? "rtl" : "ltr"}
      >
        <div className="bg-white rounded-lg shadow-md">
          <h2 className="text-sm font-bold my-4">
            <span dangerouslySetInnerHTML={{ __html: questionText }} />
          </h2>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Question Supplement"
              className="question-image mb-4 rounded"
            />
          )}

          <div className="end-0">
            {[
              currentQuestion.option1,
              currentQuestion.option2,
              currentQuestion.option3,
              currentQuestion.option4,
              currentQuestion.option5,
            ]
              .filter(Boolean)
              .map((option, index) => {
                const optionLabel = String.fromCharCode(97 + index);
                const optionText = addBiDiMarkers(option);
                return (
                  <button
                    key={index}
                    onClick={() => handleOptionClick(option, index)}
                    className={`w-full py-2 mb-2  rounded border transition-colors 
                  ${selectedOption === option
                      ? optionLabel === currentQuestion.currect
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    <div>
                      <span
                        className={`container${isArabic(optionText) ? " text-right " : "text-left "
                          }`}
                        dir={isArabic(optionText) ? "rtl" : "ltr"}
                        dangerouslySetInnerHTML={{
                          __html: `${optionLabel}. ${optionText}`,
                        }}
                      />
                    </div>
                  </button>
                );
              })}
          </div>

          <button
            onClick={handleNext}
            className="w-full  py-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Next Question
          </button>
        </div>
      </div>
      <div>
        <BottomNav correctAnswers={correctAnswers} totalQuestions={totalQuestions} />
      </div>
    </>
  );
}

export default QuestionViewer;
