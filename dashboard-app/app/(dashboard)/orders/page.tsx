import { IconShoppingCart } from "@tabler/icons-react"
import { ContextStrip } from "@/components/shell/context-strip"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function OrdersPage() {
  return (
    <>
      <ContextStrip breadcrumbs={[{ label: "Orders" }]} />
      <div className="flex flex-1 items-center justify-center p-8">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto mb-2 flex size-12 items-center justify-center bg-muted">
              <IconShoppingCart className="size-6 text-muted-foreground" />
            </div>
            <CardTitle className="tracking-widest uppercase">
              Orders — Coming soon
            </CardTitle>
            <CardDescription>
              Order management with statuses, fulfillment, and refunds will ship
              in the next release.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" disabled>
              Notify me
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
