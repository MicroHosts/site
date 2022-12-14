import {ReactElement} from "react";
import BillingLayout from "@/layouts/Billing";
import TabList from "@/components/tab/TabList";
import BuyHostList from "@/components/pages/billing/buy/hosts/BuyHostList";
import BuyServiceList from "@/components/pages/billing/buy/services/BuyServiceList";

const tabs = [
  {
    name: "Хосты",
    component: <BuyHostList/>
  },
  {
    name: "Услуги",
    component: <BuyServiceList/>
  },
]

function BuyBilling() {
  return(
            <div className="w-full mx-auto md:ml-4">
              <div>
                Доступные услуги
              </div>
              <div>
                <TabList tabs={tabs}/>
              </div>
            </div>
  )
}

BuyBilling.getLayout = function getLayout(page: ReactElement) {
  return (
      <BillingLayout>
        {page}
      </BillingLayout>
  )
}

export default BuyBilling

