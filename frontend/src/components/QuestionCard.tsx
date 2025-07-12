import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, MessageSquare, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Question {
  id: number;
  title: string;
  description: string;
  tags: string[];
  votes: number;
  answers: number;
  timestamp: string;
  author: string;
}

interface QuestionCardProps {
  question: Question;
}

const QuestionCard = ({ question }: QuestionCardProps) => {
  const [voteCount, setVoteCount] = useState(question.votes);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("user");
    if (!userId) return;

    const storedVotes = JSON.parse(localStorage.getItem(`votes_${userId}`) || "{}");
    if (storedVotes[`q${question.id}`]) {
      setHasVoted(true);
    }
  }, [question.id]);

  const handleUpvote = () => {
    const userId = localStorage.getItem("user");
    if (!userId) return;

    const voteKey = `votes_${userId}`;
    const storedVotes = JSON.parse(localStorage.getItem(voteKey) || "{}");

    if (storedVotes[`q${question.id}`]) return; // Already voted

    // Update vote locally
    const updatedVotes = {
      ...storedVotes,
      [`q${question.id}`]: "up",
    };

    localStorage.setItem(voteKey, JSON.stringify(updatedVotes));
    setVoteCount(prev => prev + 1);
    setHasVoted(true);

    // Also update global questions list if needed
    const questions = JSON.parse(localStorage.getItem("questions") || "[]");
    const updatedQuestions = questions.map((q: Question) =>
      q.id === question.id ? { ...q, votes: q.votes + 1 } : q
    );
    localStorage.setItem("questions", JSON.stringify(updatedQuestions));
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:scale-[1.02] rounded-2xl group">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Vote & Answer Stats */}
          <div className="flex flex-col items-center gap-3 min-w-[80px]">
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleUpvote}
                className={`p-2 rounded-xl transition-colors ${
                  hasVoted ? "text-green-400" : "hover:text-green-400 hover:bg-slate-700"
                }`}
                disabled={hasVoted}
              >
                <ArrowUp className="w-5 h-5" />
              </Button>
              <span className="font-bold text-lg text-slate-200">{voteCount}</span>
              <span className="text-xs text-slate-400">votes</span>
            </div>

            <div className="flex flex-col items-center">
              <MessageSquare className="w-5 h-5 text-slate-400 mb-1" />
              <span className="font-semibold text-blue-400">{question.answers}</span>
              <span className="text-xs text-slate-500">answers</span>
            </div>
          </div>

          {/* Question Content */}
          <div className="flex-1 min-w-0">
            <Link to={`/question/${question.id}`}>
              <h3 className="text-xl font-semibold text-slate-100 hover:text-blue-400 transition-colors mb-3 group-hover:text-blue-300">
                {question.title}
              </h3>
            </Link>

            <p className="text-slate-300 mb-4 line-clamp-2 text-sm leading-relaxed">
              {question.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {question.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="bg-slate-700/50 text-slate-300 hover:bg-blue-600/20 hover:text-blue-300 transition-colors rounded-lg px-3 py-1 text-xs"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span className="hover:text-slate-300 transition-colors">{question.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{question.timestamp}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
