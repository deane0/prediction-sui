import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TradingViewWidget from './trading-view'
import { OraclePrice } from './oracle-price'

export function PriceChartTabs() {
  return (
    <Tabs defaultValue="trading-view">
      <TabsList className="ml-8">
        <TabsTrigger value="trading-view">Trading View</TabsTrigger>
        <TabsTrigger value="oracle-price">Oracle Price</TabsTrigger>
      </TabsList>
      <TabsContent value="trading-view" className="h-96">
        <TradingViewWidget />
      </TabsContent>
      <TabsContent value="oracle-price" className="h-96">
        <OraclePrice />
      </TabsContent>
    </Tabs>
  )
}
