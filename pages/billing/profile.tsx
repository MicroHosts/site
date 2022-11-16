import {ReactElement} from "react";
import MainProfile from "../../components/billing/profile/main/MainProfile";
import SecureProfile from "../../components/billing/profile/main/SecureProfile";
import BillingLayout from "../../components/billing/billingLayout";
import TabList from "../../components/tab/TabList";

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
    // @ts-ignore
    return (
        <BillingLayout>
            {page}
        </BillingLayout>
    )
}

export default Profile;
