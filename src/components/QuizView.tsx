
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

interface QuizData {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizViewProps {
  quizData: QuizData;
  onComplete: () => void;
}

export const QuizView = ({ quizData, onComplete }: QuizViewProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    const correct = selectedAnswer === quizData.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const handleTryAgain = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge variant="secondary" className="mb-4">
          Quiz Question
        </Badge>
        <h2 className="text-2xl font-bold mb-2">{quizData.question}</h2>
        <p className="text-gray-600">Choose the best answer from the options below:</p>
      </div>

      <div className="space-y-3">
        {quizData.options.map((option, index) => {
          let cardClass = "cursor-pointer transition-colors border-2 ";
          
          if (showResult) {
            if (index === quizData.correctAnswer) {
              cardClass += "border-green-500 bg-green-50";
            } else if (index === selectedAnswer && !isCorrect) {
              cardClass += "border-red-500 bg-red-50";
            } else {
              cardClass += "border-gray-200";
            }
          } else if (selectedAnswer === index) {
            cardClass += "border-primary bg-primary/5";
          } else {
            cardClass += "border-gray-200 hover:border-gray-300";
          }

          return (
            <Card 
              key={index}
              className={cardClass}
              onClick={() => !showResult && setSelectedAnswer(index)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    showResult && index === quizData.correctAnswer
                      ? 'border-green-500 bg-green-500 text-white'
                      : showResult && index === selectedAnswer && !isCorrect
                        ? 'border-red-500 bg-red-500 text-white'
                        : selectedAnswer === index
                          ? 'border-primary bg-primary text-white'
                          : 'border-gray-300'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-sm font-medium">{option}</span>
                  
                  {showResult && index === quizData.correctAnswer && (
                    <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                  )}
                  
                  {showResult && index === selectedAnswer && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-500 ml-auto" />
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showResult && (
        <Card className={`${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                {isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
              </div>
              <div>
                <h3 className={`font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h3>
                <div className="flex items-start space-x-2">
                  <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-gray-700">{quizData.explanation}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex justify-center space-x-4">
        {!showResult ? (
          <Button 
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="px-8"
          >
            Submit Answer
          </Button>
        ) : !isCorrect ? (
          <Button onClick={handleTryAgain} variant="outline" className="px-8">
            Try Again
          </Button>
        ) : (
          <div className="text-center">
            <p className="text-green-600 font-medium">Great job! Moving to next module...</p>
          </div>
        )}
      </div>
    </div>
  );
};
