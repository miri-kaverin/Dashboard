import { IconSettings } from "@tabler/icons-react"
import { ContextStrip } from "@/components/shell/context-strip"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <>
      <ContextStrip breadcrumbs={[{ label: "Settings" }]} />
      <div className="flex flex-1 items-center justify-center p-8">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto mb-2 flex size-12 items-center justify-center bg-muted">
              <IconSettings className="size-6 text-muted-foreground" />
            </div>
            <CardTitle className="tracking-widest uppercase">
              Settings — Coming soon
            </CardTitle>
            <CardDescription>
              Store settings for team, payments, shipping, and localization are
              on the roadmap.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" disabled>
              Configure store
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
