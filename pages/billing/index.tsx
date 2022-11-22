import NoPayList from "@/billing/nopay/NoPayList";
import { ReactElement} from "react";
import BillingLayout from "@/layouts/Billing";
import BuyHostCard from "@/billing/buy/hosts/BuyHostCard";
import BuyServiceCard from "@/billing/buy/services/BuyServiceCard";
import TabList from "@/components/tab/TabList";
import HostList from "@/components/billing/hosts/HostList";

const tabs = [
    {
        name: "Хосты",
        component: <HostList/>
    },
    {
        name: "Услуги",
        component: <BuyServiceCard/>
    },
    {
        name: "Неоплаченные",
        component: <NoPayList/>
    }
]

const Billing = () =>{
    return(
        <div className="w-full mx-auto md:ml-4">
            <div>
                Мои заказы
            </div>
            <div>
                <TabList tabs={tabs}/>
            </div>
        </div>
    )
}

Billing.getLayout = function getLayout(page: ReactElement) {
    return (
      <BillingLayout>
        {page}
      </BillingLayout>
    )
}


export default Billing;
