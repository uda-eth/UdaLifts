import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import PaymentPage from "./pages/Payment";
import PaymentSuccessPage from "./pages/PaymentSuccess";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/services" component={Services} />
          <Route path="/payment" component={PaymentPage} />
          <Route path="/payment/success" component={PaymentSuccessPage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;