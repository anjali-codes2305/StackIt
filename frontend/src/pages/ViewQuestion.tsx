import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Clock,
  User,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Answer {
  id: number;
  content: string;
  votes: number;
  timestamp: string;
  author: string;
  authorReputation: number;
  isAccepted?: boolean;
  questionId: number; // ✅ Added this to fix the error
}

interface Question {
  id: number;
  title: string;
  description: string;
  tags: string[];
  votes: number;
  answers: number;
  timestamp: string;
  author: string;
  authorReputation: number;
}

const ViewQuestion = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const questionId = Number(id);
  const user = localStorage.getItem("user") || "anonymous";
  const navigate = useNavigate();

  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [newAnswer, setNewAnswer] = useState("");
  const [userVotes, setUserVotes] = useState<{ [key: string]: "up" | "down" | null }>({});

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem("questions") || "[]");
    const currentQuestion = storedQuestions.find((q: Question) => q.id === questionId);
    if (!currentQuestion) return navigate("/");
    setQuestion(currentQuestion);

    const storedAnswers = JSON.parse(localStorage.getItem("answers") || "[]");
    const relatedAnswers = storedAnswers.filter((a: Answer) => a.questionId === questionId);
    setAnswers(relatedAnswers);
  }, [questionId, navigate]);

  const handleVote = (type: "up" | "down", targetType: "question" | "answer", targetId: string) => {
    const currentVote = userVotes[targetId];
    const newVote = currentVote === type ? null : type;

    setUserVotes((prev) => ({ ...prev, [targetId]: newVote }));

    toast({
      title: newVote ? `${type === "up" ? "Upvoted" : "Downvoted"}!` : "Vote removed",
      description: `Your vote has been ${newVote ? "recorded" : "removed"}.`,
    });
  };

  const handleSubmitAnswer = () => {
    if (!newAnswer.trim() || !question) return;

    const newAns: Answer = {
      id: Date.now(),
      content: newAnswer,
      votes: 0,
      timestamp: "Just now",
      author: user,
      authorReputation: 0,
      questionId,
    };

    const updatedAnswers = [...answers, newAns];
    setAnswers(updatedAnswers);
    localStorage.setItem("answers", JSON.stringify(updatedAnswers));

    const updatedQuestions = JSON.parse(localStorage.getItem("questions") || "[]").map((q: Question) =>
      q.id === questionId ? { ...q, answers: q.answers + 1 } : q
    );
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
    setNewAnswer("");

    toast({
      title: "Answer submitted!",
      description: "Your answer has been posted successfully.",
    });
  };

  const handleDeleteAnswer = (answerId: number) => {
    const updatedAnswers = answers.filter((a) => a.id !== answerId);
    setAnswers(updatedAnswers);
    localStorage.setItem("answers", JSON.stringify(updatedAnswers));

    const updatedQuestions = JSON.parse(localStorage.getItem("questions") || "[]").map((q: Question) =>
      q.id === questionId ? { ...q, answers: q.answers - 1 } : q
    );
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  if (!question) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <Link to="/" className="text-blue-400 hover:text-blue-300 text-sm">
          ← Back to Questions
        </Link>
      </div>

      <Card className="bg-slate-800/50 border-slate-700 rounded-2xl mb-8">
        <CardContent className="p-8">
          <div className="flex gap-6">
            <div className="flex flex-col items-center gap-2 min-w-[60px]">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote("up", "question", `q${question.id}`)}
              >
                <ArrowUp className="w-6 h-6" />
              </Button>
              <span className="font-bold text-2xl text-slate-200">
                {question.votes + (userVotes[`q${question.id}`] === "up" ? 1 : userVotes[`q${question.id}`] === "down" ? -1 : 0)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleVote("down", "question", `q${question.id}`)}
              >
                <ArrowDown className="w-6 h-6" />
              </Button>
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-100 mb-4">{question.title}</h1>
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap mb-4">
                {question.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {question.tags.map((tag) => (
                  <Badge key={tag} className="bg-blue-600/20 text-blue-300 border border-blue-500/30">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-sm text-slate-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{question.author}</span>
                <Badge variant="outline" className="text-xs border-slate-600">
                  {question.authorReputation}
                </Badge>
                <Clock className="w-4 h-4 ml-4" />
                <span>{question.timestamp}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-200 mb-6 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-blue-400" />
          {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
        </h2>

        <div className="space-y-6">
          {answers.map((answer) => (
            <Card key={answer.id} className="bg-slate-800/50 border-slate-700 rounded-2xl">
              <CardContent className="p-6">
                <div className="flex justify-between">
                  <div>
                    <p className="text-slate-300 leading-relaxed whitespace-pre-wrap mb-4">
                      {answer.content}
                    </p>
                    <div className="text-xs text-slate-400 flex gap-4">
                      <div><User className="inline w-3 h-3" /> {answer.author}</div>
                      <div><Clock className="inline w-3 h-3" /> {answer.timestamp}</div>
                    </div>
                  </div>
                  {answer.author === user && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:bg-red-500/10"
                      onClick={() => handleDeleteAnswer(answer.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Card className="bg-slate-800/50 border-slate-700 rounded-2xl">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold text-slate-200 mb-4">Your Answer</h3>

          <Textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Write your answer here..."
            rows={6}
            className="mb-4 bg-slate-700/50 border-slate-600 rounded-xl text-slate-100"
          />

          <Button
            onClick={handleSubmitAnswer}
            disabled={!newAnswer.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-6 py-2 font-semibold"
          >
            Post Answer
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewQuestion;
