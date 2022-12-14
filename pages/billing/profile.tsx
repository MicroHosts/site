import {ReactElement} from "react";
import MainProfile from "@/components/pages/billing/profile/main/MainProfile";
import SecureProfile from "@/components/pages/billing/profile/main/SecureProfile";
import BillingLayout from "@/layouts/Billing";
import TabList from "@/components/tab/TabList";

const tabs = [
    {
        name: "Мои данные",
        component: <MainProfile/>
    },
    {
        name: "Безопасность и доступ",
        component: <SecureProfile/>
    }
]

function Profile(){
    return(
        <div className="w-full mx-auto md:ml-4">
            <div>
                Профиль
            </div>
            <div>
                <TabList tabs={tabs}/>
            </div>
        </div>
    )
}

Profile.getLayout = function getLayout(page: ReactElement) {
    return (
        <BillingLayout>
            {page}
        </BillingLayout>
    )
}

export default Profile;
