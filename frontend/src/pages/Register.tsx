import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Github, Mail, Eye, EyeOff, Loader2, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect logged-in users to home page
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    toast({ title: "Passwords don't match", variant: "destructive" });
    return;
  }

  if (!acceptTerms) {
    toast({ title: "Please accept terms", variant: "destructive" });
    return;
  }

  setIsLoading(true);
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Registration failed");

    // Save user to localStorage
    localStorage.setItem("user", JSON.stringify(data.user));

    toast({
      title: "Welcome to StackIt!",
      description: "Your account has been created successfully.",
    });

    navigate("/");
  } catch (err: any) {
    toast({ title: "Error", description: err.message, variant: "destructive" });
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Illustration/Info */}
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <div className="w-32 h-32 mx-auto bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center">
              <User className="w-16 h-16 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-100 mb-4">
                Join StackIt Today
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Start your journey with our developer community. Ask questions,
                share knowledge, and grow together.
              </p>
            </div>
            <div className="space-y-3 text-left max-w-sm mx-auto">
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm">Ask unlimited questions</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-sm">Get expert answers</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                <span className="text-sm">Build your reputation</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm">Connect with developers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <Card className="bg-slate-800/50 border-slate-700 rounded-2xl">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold text-slate-100">
              Create your account
            </CardTitle>
            <p className="text-slate-400">
              Join thousands of developers in our community
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() =>
                  toast({
                    title: "Github signup",
                    description: "Social signup would be implemented here.",
                  })
                }
                className="border-slate-600 hover:bg-slate-700 rounded-xl"
              >
                <Github className="w-4 h-4 mr-2" />
                Github
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  toast({
                    title: "Google signup",
                    description: "Social signup would be implemented here.",
                  })
                }
                className="border-slate-600 hover:bg-slate-700 rounded-xl"
              >
                <Mail className="w-4 h-4 mr-2" />
                Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-slate-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-slate-800 px-2 text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Register Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Username
                </label>
                <Input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                  placeholder="Choose a username"
                  className="bg-slate-700/50 border-slate-600 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-slate-100"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Email address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter your email"
                  className="bg-slate-700/50 border-slate-600 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-slate-100"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    placeholder="Enter a password"
                    className="bg-slate-700/50 border-slate-600 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-slate-100 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4 text-slate-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    placeholder="Confirm your password"
                    className="bg-slate-700/50 border-slate-600 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl text-slate-100 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4 text-slate-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-slate-400 select-none"
                >
                  I agree to the terms and conditions
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl py-2.5 font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-slate-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-pink-400 hover:text-pink-300 font-medium transition-colors"
              >
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;
