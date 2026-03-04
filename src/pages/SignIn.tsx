import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/hotel/Navbar";
import { Phone, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const SignIn = () => {
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("email");
  const [step, setStep] = useState<"input" | "otp">("input");
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [countryCode, setCountryCode] = useState("+1");

  const countries = [
    { code: "+1", flag: "🇺🇸", name: "United States" },
    { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
    { code: "+91", flag: "🇮🇳", name: "India" },
  ];

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSendOtp = () => {
    if (loginMethod === "email" && !email) {
      toast.error("Please enter your email");
      return;
    }
    if (loginMethod === "phone" && !phoneNumber) {
      toast.error("Please enter your phone number");
      return;
    }

    // Demo logic
    setStep("otp");
    toast.success(`OTP sent to ${loginMethod === "email" ? email : phoneNumber}`);
    // Demo OTP alert
    setTimeout(() => toast.info("Demo OTP: 1234"), 1000);
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      // Create account / Login success
      const name = email ? email.split("@")[0] : "Traveler";
      login(email || phoneNumber, name); // Using email/phone as ID for now, and deriving a name
      toast.success("Welcome back!");
      navigate("/my-account");
    } else {
      toast.error("Invalid OTP. Try 1234");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="flex items-center justify-center min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Sign In Card */}
          <div className="bg-card dark:bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground dark:text-foreground mb-2">
                {step === "input" ? (isSignUp ? "Create Account" : "Welcome Back") : "Verify OTP"}
              </h1>
              <p className="text-muted-foreground dark:text-muted-foreground text-sm md:text-base">
                {step === "input"
                  ? (isSignUp ? "Join us to unlock exclusive deals" : "Sign in to continue your journey")
                  : `Enter the code sent to your ${loginMethod}`}
              </p>
            </div>

            {step === "input" ? (
              <>
                {/* Login Method Toggle */}
                <div className="flex gap-2 mb-6 p-1 bg-muted/50 dark:bg-muted/50 rounded-xl">
                  <button
                    onClick={() => setLoginMethod("email")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      loginMethod === "email"
                        ? "bg-background dark:bg-background text-foreground dark:text-foreground shadow-sm"
                        : "text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground"
                    )}
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                  <button
                    onClick={() => setLoginMethod("phone")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      loginMethod === "phone"
                        ? "bg-background dark:bg-background text-foreground dark:text-foreground shadow-sm"
                        : "text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground"
                    )}
                  >
                    <Phone className="w-4 h-4" />
                    Phone
                  </button>
                </div>

                {/* Inputs */}
                {loginMethod === "email" ? (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="h-12 pl-12"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <div className="flex gap-2">
                      <Select value={countryCode} onValueChange={setCountryCode}>
                        <SelectTrigger className="w-24">
                          <SelectValue>{countryCode}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map(c => <SelectItem key={c.code} value={c.code}>{c.flag} {c.code}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <div className="relative flex-1">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="123 456 7890"
                          className="h-12 pl-12"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <Button onClick={handleSendOtp} className="w-full h-12 text-lg rounded-xl">
                  Continue <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </>
            ) : (
              <div className="space-y-6">
                <div className="bg-muted/30 p-4 rounded-xl text-center">
                  <p className="text-sm text-muted-foreground">Demo OTP: <strong className="text-primary text-lg">1234</strong></p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">One-Time Password</label>
                  <Input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 4-digit code"
                    className="h-12 text-center text-xl tracking-widest"
                    maxLength={4}
                  />
                </div>
                <Button onClick={handleVerifyOtp} className="w-full h-12 text-lg rounded-xl">
                  Verify & Sign In <CheckCircle2 className="ml-2 w-4 h-4" />
                </Button>
                <button onClick={() => setStep("input")} className="w-full text-sm text-muted-foreground hover:text-foreground">
                  Change {loginMethod}
                </button>
              </div>
            )}

            {/* Divider */}
            {step === "input" && (
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    or continue with
                  </span>
                </div>
              </div>
            )}

            {/* Google Login Button */}
            {step === "input" && (
              <>
                <Button
                  variant="outline"
                  className="w-full h-12 border-2 rounded-xl"
                  onClick={() => toast.success("Google Login Simulated")}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  Google
                </Button>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                      onClick={() => setIsSignUp(!isSignUp)}
                      className="text-primary font-semibold hover:underline"
                    >
                      {isSignUp ? "Sign In" : "Create Account"}
                    </button>
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Guest Link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
