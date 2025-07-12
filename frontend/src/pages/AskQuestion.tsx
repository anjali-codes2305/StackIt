import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { X, Plus, HelpCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AskQuestion = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const addTag = () => {
    const trimmed = currentTag.trim().toLowerCase();
    if (trimmed && !tags.includes(trimmed) && tags.length < 5) {
      setTags([...tags, trimmed]);
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Title and description are required.",
        variant: "destructive",
      });
      return;
    }

    if (tags.length === 0) {
      toast({
        title: "Add at least one tag",
        description: "Tags help others find your question.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const newQuestion = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      tags,
      votes: 0,
      answers: 0,
      timestamp: "Just now",
      author: JSON.parse(localStorage.getItem("user") || "{}").username || "Anonymous"
    };

    const storedQuestions = localStorage.getItem("questions");
    const questions = storedQuestions ? JSON.parse(storedQuestions) : [];

    questions.unshift(newQuestion);

    localStorage.setItem("questions", JSON.stringify(questions));

    setTimeout(() => {
      toast({
        title: "Question posted successfully!",
        description: "Your question is now live and ready for answers.",
      });
      setIsSubmitting(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">Ask a Question</h1>
        <p className="text-slate-400">
          Get help from our community of developers. Be specific and provide context.
        </p>
      </div>

      <Card className="bg-slate-800/50 border-slate-700 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-400" />
            Question Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Question Title *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., How do I center a div using CSS?"
                className="bg-slate-700/50 border-slate-600 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-slate-100"
                maxLength={150}
              />
              <p className="text-xs text-slate-500 mt-1">
                {title.length}/150 characters
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description *
              </label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide more details about your question. Include what you've tried and what specific help you need..."
                rows={8}
                className="bg-slate-700/50 border-slate-600 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-slate-100 resize-none"
              />
              <p className="text-xs text-slate-500 mt-1">
                {description.length} characters
              </p>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Tags *
              </label>
              <div className="flex gap-2 mb-3">
                <Input
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add a tag (e.g., react, javascript)"
                  className="bg-slate-700/50 border-slate-600 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-slate-100"
                  maxLength={20}
                />
                <Button
                  type="button"
                  onClick={addTag}
                  variant="outline"
                  className="border-slate-600 hover:bg-slate-700 rounded-xl"
                  disabled={tags.length >= 5}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {/* Tag Display */}
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-blue-600/20 text-blue-300 border border-blue-500/30 rounded-lg px-3 py-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>

              <p className="text-xs text-slate-500">
                {tags.length}/5 tags • Tags help categorize your question
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl px-8 py-2 font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Posting...
                  </>
                ) : (
                  "Post Question"
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/")}
                className="border-slate-600 hover:bg-slate-700 rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="mt-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30 rounded-2xl">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-300 mb-3">💡 Tips for a Great Question</h3>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• Be specific and include relevant details</li>
            <li>• Show what you've already tried</li>
            <li>• Use proper formatting for code snippets</li>
            <li>• Choose relevant tags to help others find your question</li>
            <li>• Search for similar questions before posting</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default AskQuestion;
