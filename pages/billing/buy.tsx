import {ReactElement} from "react";
import BuyHostCard from "../../components/billing/buy/hosts/BuyHostCard";
import BuyServiceCard from "../../components/billing/buy/services/BuyServiceCard";
import BillingLayout from "../../components/billing/billingLayout";
import TabList from "../../components/tab/TabList";

const tabs = [
  {
    name: "Хосты",
   component: <BuyHostCard/>
  },
  {
    name: "Услуги",
    component: <BuyServiceCard/>
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

