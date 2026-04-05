import { Button } from "@/components/ui/button"
import { Link } from "react-router"

const ReportPage = () => {
    return (
        <div>
            <h1 className="text-lg font-bold mb-3">Report Page</h1>
            <div className="flex  gap-5">


                <Link to="/debit">
                    <Button>Debit Report</Button>
                </Link>
                <Link to="/credit">
                    <Button>Credit Report</Button>
                </Link>
                 
            </div>   <h1 className="text-lg font-bold mb-2 mt-4">Analytics</h1>
            <div className="flex  gap-5">


             <Link to="/analytics-debit">
                    <Button>Analytics Debit</Button>
                </Link>

                <Link to="/analytics-credit">
                    <Button>Analytics Credit</Button>
                </Link>
                 
            </div>

        </div>
    )
}

export default ReportPage