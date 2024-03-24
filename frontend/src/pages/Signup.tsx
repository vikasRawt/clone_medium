import { Auth } from "../components/Auth";
import { Qoute } from "../components/Qoute";

 export function Signup() {
  return (
    <div className="lg:grid grid-cols-2">
<div><Auth/></div>
<div className="invisible lg:visible"><Qoute/></div>
    </div>
  );
}

