import SetupLayout from "@/layouts/Setup"
import { ReactElement } from "react"

function Index(){
    return (
        <div className="">
            <h1>Setup</h1>
            <div>sdsd</div>
        </div>
    )
}

Index.getLayout = function getLayout(page: ReactElement) {
    return (
        <SetupLayout>
            {page}
        </SetupLayout>
    )
}


export default Index