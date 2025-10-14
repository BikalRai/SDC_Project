import { Link } from "react-router-dom";
import { Button } from "../components/Button";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[hsl(var(--auth-gradient-start))] to-[hsl(var(--auth-gradient-end))]">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-5xl font-bold text-black mb-4">Welcome</h1>
        <p className="text-xl text-black/90 mb-8">
          Get started with your account
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/register">
            <Button size="lg" className="h-14 px-8" variant="outline">
              Create Account
            </Button>
          </Link>
          {/* <Link to="/login">
            <Button size="lg" variant="outline" className="h-14 px-8 bg-black/10 text-black border-black/20 hover:bg-black/20">
              Login
            </Button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Index;
