import { useState } from "react";
import {
    ChevronLeft,
    ChevronRight,
    List,
    X,
    Check,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "./ui/dialog";

interface Question {
    id: number;
    question: string;
    answer: string;
}

interface MCQPracticeProps {
    onBack: () => void;
}

// Generate random math questions
const generateQuestions = (count: number = 5): Question[] => {
    const questions: Question[] = [];

    for (let i = 0; i < count; i++) {
        const num1 = Math.floor(Math.random() * 900) + 100; // 3-digit numbers
        const num2 = Math.floor(Math.random() * 900) + 100;
        const operation = Math.random() > 0.5 ? "+" : "-";

        const question = `${num1} ${operation} ${num2}`;
        const answer =
            operation === "+"
                ? (num1 + num2).toString()
                : (num1 - num2).toString();

        questions.push({
            id: i + 1,
            question,
            answer,
        });
    }

    return questions;
};

export function MCQPractice() {
    const [questions] = useState<Question[]>(
        generateQuestions(5),
    );
    const [currentQuestionIndex, setCurrentQuestionIndex] =
        useState(0);
    const [answers, setAnswers] = useState<
        Record<number, string>
    >({});
    const [showNavigationDialog, setShowNavigationDialog] =
        useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(0);

    const currentQuestion = questions[currentQuestionIndex];

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleAnswerChange = (value: string) => {
        setAnswers({
            ...answers,
            [currentQuestion.id]: value,
        });
    };

    const handleQuestionNavigate = (index: number) => {
        setCurrentQuestionIndex(index);
        setShowNavigationDialog(false);
    };

    const handleSubmit = () => {
        let correctCount = 0;
        questions.forEach((q) => {
            if (answers[q.id] === q.answer) {
                correctCount++;
            }
        });
        setScore(correctCount);
        setSubmitted(true);
        setShowNavigationDialog(false);
    };

    const isAnswered = (questionId: number) => {
        return (
            answers[questionId] !== undefined &&
            answers[questionId] !== ""
        );
    };

    const isCorrect = (questionId: number) => {
        const question = questions.find((q) => q.id === questionId);
        return question && answers[questionId] === question.answer;
    };

    const allQuestionsAnswered = questions.every((q) =>
        isAnswered(q.id),
    );

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/10">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mb-6 shadow-lg">
                                <Check className="w-10 h-10 text-white" />
                            </div>
                            <h2 className="text-3xl text-white mb-2">
                                Practice Complete!
                            </h2>
                            <p className="text-gray-400">
                                Here are your results
                            </p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                                <div className="text-center">
                                    <p className="text-gray-400 mb-2">
                                        Your Score
                                    </p>
                                    <p className="text-5xl text-white mb-1">
                                        {score}/{questions.length}
                                    </p>
                                    <p className="text-xl text-gray-300">
                                        {Math.round(
                                            (score / questions.length) * 100,
                                        )}
                                        %
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {questions.map((q, index) => (
                                    <div
                                        key={q.id}
                                        className={`bg-white/5 rounded-xl p-4 border ${isCorrect(q.id)
                                            ? "border-green-500/30 bg-green-500/5"
                                            : "border-red-500/30 bg-red-500/5"
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-gray-400 text-sm">
                                                    Question {index + 1}
                                                </p>
                                                <p className="text-white">
                                                    {q.question}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-gray-400 text-sm">
                                                    Your answer
                                                </p>
                                                <p
                                                    className={`${isCorrect(q.id) ? "text-green-400" : "text-red-400"}`}
                                                >
                                                    {answers[q.id] || "Not answered"}
                                                </p>
                                                {!isCorrect(q.id) && (
                                                    <p className="text-gray-400 text-sm mt-1">
                                                        Correct: {q.answer}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 transition-all shadow-lg"
                        >
                            Back to Dashboard
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-gray-900/80 backdrop-blur-xl border-b border-white/10">
                <div className="px-4 py-4">
                    <div className="flex items-center justify-between max-w-3xl mx-auto">
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                            <span>Exit</span>
                        </button>

                        <div className="flex items-center gap-2">
                            <span className="text-gray-400">Question</span>
                            <span className="text-white">
                                {currentQuestionIndex + 1} / {questions.length}
                            </span>
                        </div>

                        <button
                            onClick={() => setShowNavigationDialog(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-white transition-all"
                        >
                            <List className="w-5 h-5" />
                            <span>View All</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            {!showNavigationDialog ? (<div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
                <div className="w-full max-w-2xl">
                    <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10">
                        {/* Question */}
                        <div className="mb-8">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl">
                                    <span className="text-white text-xl">
                                        {currentQuestionIndex + 1}
                                    </span>
                                </div>
                                <h3 className="text-gray-400">
                                    Question {currentQuestionIndex + 1} of{" "}
                                    {questions.length}
                                </h3>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                                <p className="text-4xl sm:text-5xl text-white text-center tracking-wider">
                                    {currentQuestion.question}
                                </p>
                            </div>
                        </div>

                        {/* Answer Input */}
                        <div className="mb-8">
                            <label className="block text-gray-400 mb-3">
                                Your Answer
                            </label>
                            <input
                                type="number"
                                value={answers[currentQuestion.id] || ""}
                                onChange={(e) =>
                                    handleAnswerChange(e.target.value)
                                }
                                placeholder="Enter your answer"
                                className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white text-2xl text-center focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all placeholder:text-gray-500"
                                autoFocus
                            />
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex items-center justify-between gap-4">
                            <button
                                onClick={handlePrevious}
                                disabled={currentQuestionIndex === 0}
                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all ${currentQuestionIndex === 0
                                    ? "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
                                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                    }`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                                <span>Previous</span>
                            </button>

                            <div className="flex gap-2">
                                {questions.map((_, index) => (
                                    <div
                                        key={index}
                                        className={`w-2 h-2 rounded-full transition-all ${index === currentQuestionIndex
                                            ? "bg-purple-500 w-8"
                                            : isAnswered(questions[index].id)
                                                ? "bg-green-500"
                                                : "bg-gray-600"
                                            }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={
                                    currentQuestionIndex === questions.length - 1
                                }
                                className={`flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all ${currentQuestionIndex === questions.length - 1
                                    ? "bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
                                    : "bg-white/5 border-white/10 text-white hover:bg-white/10"
                                    }`}
                            >
                                <span>Next</span>
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>) :

                (<div
                >
                    <div className="bg-gray-900 border-white/10 text-white max-w-md">
                        <div>
                            <div className="text-2xl text-white">
                                All Questions
                            </div>
                            <div className="text-gray-400">
                                Navigate between questions and track your progress
                            </div>
                        </div>

                        <div className="grid grid-cols-5 gap-3 my-6">
                            {questions.map((q, index) => (
                                <button
                                    key={q.id}
                                    onClick={() => handleQuestionNavigate(index)}
                                    className={`aspect-square rounded-full flex items-center justify-center text-lg transition-all border-2 ${index === currentQuestionIndex
                                        ? "bg-purple-500 border-purple-400 text-white scale-110"
                                        : isAnswered(q.id)
                                            ? "bg-green-500 border-green-400 text-white hover:scale-105"
                                            : "bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:scale-105"
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>

                        <div className="flex items-center justify-between text-sm mb-4">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                <span className="text-gray-300">
                                    Answered (
                                    {
                                        Object.keys(answers).filter(
                                            (key) => answers[parseInt(key)] !== "",
                                        ).length
                                    }
                                    )
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-gray-700"></div>
                                <span className="text-gray-300">
                                    Unanswered (
                                    {questions.length -
                                        Object.keys(answers).filter(
                                            (key) => answers[parseInt(key)] !== "",
                                        ).length}
                                    )
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={!allQuestionsAnswered}
                            className={`w-full py-4 rounded-2xl transition-all ${allQuestionsAnswered
                                ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 shadow-lg"
                                : "bg-gray-700 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            {allQuestionsAnswered
                                ? "Submit All Answers"
                                : `Answer all questions to submit (${Object.keys(answers).filter((key) => answers[parseInt(key)] !== "").length}/${questions.length})`}
                        </button>

                        <button
                            onClick={() => setShowNavigationDialog(false)}
                            className="w-full py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
                        >
                            Continue Practice
                        </button>
                    </div>
                </div>)}
        </div>
    );
}