import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import QuestionCard from "@/components/QuestionCard";
import FilterDropdown from "@/components/FilterDropdown";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  const [selectedTag, setSelectedTag] = useState("all");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    } else {
      const defaultQuestions = [
        {
          id: 1,
          title: "How to implement authentication in React with TypeScript?",
          description:
            "I'm building a React app with TypeScript and need to implement user authentication. What's the best approach?",
          tags: ["react", "typescript", "authentication"],
          votes: 15,
          answers: 3,
          timestamp: "2 hours ago",
          author: "devStudent123",
        },
        {
          id: 2,
          title: "Best practices for API integration in modern web apps",
          description:
            "Looking for recommendations on how to structure API calls and handle errors effectively.",
          tags: ["api", "javascript", "best-practices"],
          votes: 23,
          answers: 7,
          timestamp: "4 hours ago",
          author: "webDev_pro",
        },
        {
          id: 3,
          title: "CSS Grid vs Flexbox - When to use which?",
          description:
            "I'm confused about when to use CSS Grid versus Flexbox for layouts. Can someone explain the differences?",
          tags: ["css", "layout", "frontend"],
          votes: 31,
          answers: 12,
          timestamp: "6 hours ago",
          author: "cssNewbie",
        },
        {
          id: 4,
          title: "Database design for a social media platform",
          description:
            "What's the best approach to design a database schema for a social media application with posts, comments, and user relationships?",
          tags: ["database", "sql", "design"],
          votes: 18,
          answers: 5,
          timestamp: "1 day ago",
          author: "backendMaster",
        },
      ];

      localStorage.setItem("questions", JSON.stringify(defaultQuestions));
      setQuestions(defaultQuestions);
    }
  }, []);

  const filteredQuestions =
    selectedTag === "all"
      ? questions
      : questions.filter((q) => q.tags.includes(selectedTag));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Ask. Learn. Grow.
        </h1>
        <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
          Join our community of developers sharing knowledge and solving problems together
        </p>

        <Link to="/ask">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-2xl px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Ask Your First Question
          </Button>
        </Link>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-200">Recent Questions</h2>
          <Badge variant="secondary" className="bg-slate-800 text-slate-300">
            {filteredQuestions.length} questions
          </Badge>
        </div>

        <FilterDropdown selectedTag={selectedTag} onTagChange={setSelectedTag} />
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question.id} question={question} />
        ))}
      </div>

      {/* Empty State */}
      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-slate-400 mb-4">
            <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-xl">No questions found for the selected tag.</p>
            <p className="text-sm mt-2">
              Try selecting a different tag or ask a new question!
            </p>
          </div>
          <Link to="/ask">
            <Button className="mt-4 bg-blue-600 hover:bg-blue-700 rounded-xl">
              Ask a Question
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
