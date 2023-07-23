import React from "react";
import DrawerAppBar from "../components/AppBar";
import FixedBottomNavigation from "../components/BottomNavBar";

function HomePage({user, setUser, userLocal, setUserLocal, usageLimits, setUsageLimits, paymentProcessing, setPaymentProcessing}) {
    
    return <div>
        <DrawerAppBar user={user} setUser={setUser} userLocal={userLocal} setUserLocal={setUserLocal} usageLimits={usageLimits} setUsageLimits={setUsageLimits} paymentProcessing={paymentProcessing} setPaymentProcessing={setPaymentProcessing}/>
        <FixedBottomNavigation usageLimits={usageLimits} setUsageLimits={setUsageLimits} user={user} setPaymentProcessing={setPaymentProcessing}/>
    </div>
}

export default HomePage;