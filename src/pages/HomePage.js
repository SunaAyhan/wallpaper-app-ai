import React from "react";
import DrawerAppBar from "../components/AppBar";
import FixedBottomNavigation from "../components/BottomNavBar";

function HomePage() {
    const [user, setUser] = React.useState(null);
    const [userLocal, setUserLocal] = React.useState(null);
    const [usageLimits, setUsageLimits] = React.useState(null);
  const [paymentProcessing, setPaymentProcessing] = React.useState(false);
    return <div>
        <DrawerAppBar user={user} setUser={setUser} userLocal={userLocal} setUserLocal={setUserLocal} usageLimits={usageLimits} setUsageLimits={setUsageLimits} paymentProcessing={paymentProcessing} setPaymentProcessing={setPaymentProcessing}/>
        <FixedBottomNavigation usageLimits={usageLimits} setUsageLimits={setUsageLimits} user={user} setPaymentProcessing={setPaymentProcessing}/>
    </div>
}

export default HomePage;