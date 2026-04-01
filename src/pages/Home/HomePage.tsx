import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import DebitCreate from "../Debit/DebitCreate"
import CreditCreate from "../Credit/CreditCreate"

export function HomePage() {

  return (
    <Tabs defaultValue="debits">
      <TabsList variant="line" className="w-full gap-5 border-b-2">
        
        <TabsTrigger className="text-lg font-bold cursor-pointer" value="debits">
          Debits
        </TabsTrigger>

        <TabsTrigger className="text-lg font-bold cursor-pointer" value="credit">
          Credit
        </TabsTrigger>

        <TabsTrigger className="text-lg font-bold cursor-pointer" value="reports">
          Reports
        </TabsTrigger>

      </TabsList>

      {/* Add content */}
      <TabsContent value="debits">
        <DebitCreate/>
      </TabsContent>
      <TabsContent value="credit">
        <CreditCreate/>
      </TabsContent>
      <TabsContent value="reports">Reports Content</TabsContent>
    </Tabs>
  )
}